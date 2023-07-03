import React, { useEffect, useState } from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import './Style/style.css';

export default function Navigationbar() {

  const [show, setShow] = useState(true);
  const Navigate = useNavigate("");

  const logout = ()=>{
    localStorage.removeItem('bus-reservation-system-token');
    localStorage.removeItem('bus-reservation-system-user');
    localStorage.removeItem('bus-reservation-system-role');
    setShow(true);
    Navigate("/login");
  }

  // eslint-disable-next-line
  useEffect(()=>{
    if(localStorage.getItem("bus-reservation-system-token")){
      setShow(false);
    }else{
      setShow(true);
    }
  })
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'black'}}>
      <NavLink className="navbar-brand" to={""}>
      <h4><i className="fa fa-bus-alt fa-2x"></i>CHALO<em> Yatri</em><br /></h4>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-5">
          <li className="nav-item ml-3">
            <NavLink className="nav-link" to={"/"}>
              Reservation
            </NavLink>
          </li>
          <li className="nav-item ml-3">
            <NavLink className="nav-link" to={"/view"}>
              View Ticket
            </NavLink>
          </li>
          <li className="nav-item ml-3">
            <NavLink className="nav-link" to={"/cancel"}>
              Cancellation
            </NavLink>
          </li>
          <li className="nav-item ml-3">
            {show===true?<NavLink className="nav-link" to={"/signup"}>
              SignUp
            </NavLink>:<NavLink className="nav-link" to={"/profile"}>
              Ankit Kumar Nashine
            </NavLink>}
          </li>
          <li className="nav-item ml-3">
            {show===true?<NavLink className="nav-link" to={"/login"}>
              Login
            </NavLink>:<NavLink onClick={logout} className="nav-link" to={"/login"}>
              logout
            </NavLink>}
          </li>
        </ul>
      </div>
    </nav>
  );
}
