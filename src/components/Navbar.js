import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {LogOut, reset} from "../features/authSlice";

const Navbar = () => {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
 

  const Logout = () =>{
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  }




  return (
   
    <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
    
      <a className="navbar-brand" href="#"><i className="bi bi-cash-coin mb-4 me-2"></i>Atlas Expenses Tracker</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/dashboard">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">ASBf calculator <span className="badge bg-warning rounded-pill align-top">Soon</span></a>
            
          </li>
        </ul>
        
      </div>
      <div className="d-flex flex-row-reverse">
            <button className="btn btn-outline-danger" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal">Log Out</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel"><i className="bi bi-emoji-frown bi-outline-warning me-2"></i>Log out</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      Log out? We will miss you
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Nah, Just kidding</button>
        <button onClick={Logout} type="submit" data-bs-dismiss="modal" className="btn btn-primary">Yes, log out</button>
      </div>
    </div>
  </div>
</div>

            <p className="me-3 mt-3">Current date is {date}</p>
            <p className="me-3 mt-3">Hey <strong>{user && user.name}!</strong></p>
        </div>
    </div>
  </nav>

  
  
  )
}

export default Navbar