import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Login = (props) => {
    const [credentials, setCredentials] = useState({email : "", password : ""});


    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const url = 'http://localhost:5000/api/auth/login';
        const response = await fetch(url, {
            method : "POST",
            headers : {
            'Content-Type' : "application/json"},
            body : JSON.stringify({email : credentials.email,password : credentials.password})
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            // Save the auth token and redirect.
            // localStorage.setItem('token',json.jwtToken);
            localStorage.setItem('token',json.jwtToken);
            props.showAlert("success", "Logged in Successfully");
            navigate('/')
        }
        else{
          props.showAlert("danger", "Invalid Credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name] : e.target.value})
    }
  return (
    <div className='mt-3'>
      <h2 className='mb-2'>Login to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={onChange} name='email' value={credentials.email} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password} name='password'/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
