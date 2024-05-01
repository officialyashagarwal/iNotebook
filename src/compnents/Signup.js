import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" , epassword : ""});


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(credentials.password !== credentials.epassword){
            return alert("Password and Confirm Password must be equal to each other");
        }
        const url = 'http://localhost:5000/api/auth/createuser';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password})
        })
        const json = await response.json();
        console.log(json);
        if(json.success){
            // Save the auth token and redirect.
            localStorage.setItem('token',json.jwtToken);
            props.showAlert("success", "Signed in Successfully");
            navigate('/')
        }
        else{
            props.showAlert("danger", "Invalid Credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='mt-3'>
             <h2 className='mb-2'>Signup to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name='name' value={credentials.name} aria-describedby="emailHelp" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name='email' value={credentials.email} aria-describedby="emailHelp" minLength={5} required />
                    <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password} name='password' minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="epassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="epassword" onChange={onChange} value={credentials.epassword} name='epassword' minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
