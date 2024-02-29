import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const RegisterUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
  
    const Register = async(e) =>{
        e.preventDefault();
        try{
          await axios.post('http://localhost:5000/user',{
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
    <form onSubmit={Register}>
        <p class="text-center">{msg}</p>
        <div class="row g-3">
            <div class="col">
            <input type="text" class="form-control" placeholder="Name" aria-label="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="email" class="form-control" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div class="col">
            <input type="password" class="form-control" placeholder="Password" aria-label="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" class="form-control" placeholder="Confirm Password" aria-label="Confirm Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
            </div>
            </div>

        <button type="submit">Sign Up</button>
        <p>Don't have an account? Click <a href="/">Register</a></p>
    </form>
  )
}

export default RegisterUser