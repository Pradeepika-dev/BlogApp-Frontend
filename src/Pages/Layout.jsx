import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {

    const { user, setUser, token, setToken } = useContext(AppContext);

    async function handleLogout(e) {
        e.preventDefault();
        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`            }
        })
        if(res.ok) {
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
        }
        
    }
    return (
        <>
            <header>
                <nav>
                    <Link to="/" className="nav-link">Home</Link>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <p className="text-slate-500 text-xs">Welcome, {user.name}</p>
                            <Link to="/create" className="nav-link">Create Post</Link>
                            <form onSubmit={handleLogout}>
                                <button className="nav-link">Logout</button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/register" className="nav-link">Register</Link>
                            <Link to="/login" className="nav-link">Login</Link>
                        </div>
                    )
                    }
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )

}