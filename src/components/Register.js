import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./RegisterStyle.css"

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    
    const CreateUser = async(e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:5000/user', {
            name: name,
            email: email,
            password: password,
            confPassword: confPassword
          });
          navigate('/');
        } catch (error) {
          if (error.response){
            setMsg(error.response.data.msg);
          }
        }
      }

  return (
    <div className="container-fluid mt-2 pt-5 pb-5" id="register">
        <div className="form-signin w-50 m-auto bg-light p-5 rounded shadow">
            <form onSubmit={ CreateUser }>
               <p className="text-center">{msg}</p>
            <h1 className="text-center"><i className="bi bi-cash-coin mb-4 me-2"></i> Atlas Expenses Tracker</h1>
            <h4 className="h3 mb-3 fw-normal text-center">Sign Up</h4>

            <div className="form-floating mb-3 mt-3">
                <input type="text" className="form-control" id="floatingInput" value={name} 
                onChange={(e) => setName(e.target.value)} placeholder="name"/>
                <label for="floatingInput">Name</label>
            </div>

            <div className="form-floating mb-3 mt-3">
                <input type="email" className="form-control" id="floatingInput1" value={email} 
                onChange={(e) => setEmail(e.target.value)} placeholder="email@gmail.com"/>
                <label for="floatingInput">Email</label>
            </div>

            <div className="form-floating mb-3 mt-3">
                <input type="password" className="form-control" id="floatingPassword" value={password} 
                onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <label for="floatingPassword">Password</label>
            </div>

            <div className="form-floating mb-3 mt-3">
                <input type="password" className="form-control" id="floatingPassword1" value={confPassword} 
                onChange={(e) => setConfPassword(e.target.value)} placeholder="Confirm Password"/>
                <label for="floatingPassword">Confirm Password</label>
            </div>

            <button type="submit" className="btn btn-primary mt-3 mb-3 text-center">Sign Up</button>
            <p>Already have an account? Click <a href="/">Log In</a></p>
            </form>
        </div>
    </div>
  )
}

export default Register;