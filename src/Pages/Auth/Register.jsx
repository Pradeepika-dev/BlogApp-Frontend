import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Swal from "sweetalert2";

export default function Register() {

    const navigate = useNavigate();

    const {token, setToken} = useContext(AppContext);

     const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
     });  
     
     // TODO: check errors
     const [errors, setErrors] = useState({
       
     });

     async function handleRegister(e){
        e.preventDefault();
        // console.log(formData);

        // TODO: send data to server
        const res = await fetch ('/api/register', {
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
          
          Swal.fire({
            title: "Success",
            text: "User has been registered successfully.",
            icon: "success"
          });
          navigate("/");
        }        
     };

    return (
      <>
          <h1 className="text-3xl font-bold underline title">Register a Account</h1>
          {token}
          <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-5" action="">
            <div>
              <input type="text" name="name" placeholder="Name" value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}/>
              <p className="error">{errors.name}</p>
            </div>

            <div>
              <input type="text" name="email" placeholder="Email" value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})}/>
              <p className="error">{errors.email}</p>
            </div>

            <div>
              <input type="password" name="password" placeholder="Password" value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})}/>
              <p className="error">{errors.password}</p>
            </div>
            
            <div>
              <button type="submit" className="primary-btn">Register</button>
            </div>
          </form>
      </>
    )
    
  }