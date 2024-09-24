import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    // To get authorized user
    async function getUser() {
        const res = await fetch('/api/user', {
            headers: {
                'Authorization' : `Bearer ${token}`
            }            
        })
        const data = await res.json();
        if(res.ok) {
            setUser(data);
        }
    }
    //When the token is set, get the user
    useEffect(() => {
        if (token) {
             getUser();
        }
    }, [token])

    return (
        <AppContext.Provider value={{token, setToken, user, setUser}}>
            {children}
        </AppContext.Provider>
    )
}