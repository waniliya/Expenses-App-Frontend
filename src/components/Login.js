import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {LoginUser, reset, getMe} from "../features/authSlice";
import './LoginStyle.css';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth);
  
  useEffect(()=>{
    if(user || isSuccess){
      navigate("/dashboard");
      dispatch(getMe());
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) =>{
    e.preventDefault();
    dispatch(LoginUser({email,password}));
  }
  return (
    <div className="login">
    
    <div className="container-fluid mt-2 pt-5 pb-5">
      
        <div className="form-signin w-50 m-auto bg-light p-5 rounded shadow" id="form">
            <form onSubmit={Auth}>
              { isError && <p className="text-center">{message}</p>}
            <h1 className="text-center"><i className="bi bi-cash-coin mb-4 me-2"></i> Atlas Expenses Tracker</h1>
            <h4 className="h3 mb-3 fw-normal text-center">Log In</h4>
            <p className="text-center mt-2 mb-2"><i>"Never spend your money before you have it." -Thomas Jefferson</i></p>

            <div className="form-floating mb-3 mt-3">
                <input type="email" className="form-control" id="floatingInput" value={email} 
                onChange={(e) => setEmail(e.target.value)} placeholder="email@gmail.com"/>
                <label for="floatingInput">Email</label>
            </div>

            <div className="form-floating mb-3 mt-3">
                <input type="Password" className="form-control" id="floatingPassword" value={password} 
                onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <label for="floatingPassword">Password</label>
            </div>

            <button type="submit" className="btn btn-primary mt-3 mb-3 text-center">{isLoading ? 'Loading...' : 'Log In'}</button>
            <p>Don't have an account? Click <a href="/register">Register</a></p>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Login