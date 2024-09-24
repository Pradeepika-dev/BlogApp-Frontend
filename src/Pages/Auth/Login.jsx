import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {

    const navigate = useNavigate();

    const {token, setToken} = useContext(AppContext);

     const [formData, setFormData] = useState({
        email: "",
        password: ""
     });  
     
     // TODO: check errors
     const [errors, setErrors] = useState({
       
     });

     async function handleLogin(e){
        e.preventDefault();
        // TODO: send data to server
        const res = await fetch ('/api/login', {
            method: "post",
            body: JSON.stringify(formData),
        })

        const data = await res.json();
        
        // TODO: check if there are errors
        if(data.errors){
            setErrors(data.errors);
        } else {            
          // TODO: save token to local storage
          localStorage.setItem("token", data.results.token);
          setToken(data.results.token);
          // TODO: redirect to home page
          navigate("/");
        }        
     };

    return (
      <>
          <h1 className="text-3xl font-bold underline title">Login to Account</h1>
          <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-5" action="">
            <div>
              <input type="text" name="email" placeholder="Email" value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})}/>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div>
              <input type="password" name="password" placeholder="Password" value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})}/>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            
            <div>
              <button type="submit" className="primary-btn">Login</button>
            </div>
          </form>
      </>
    )
    
  }