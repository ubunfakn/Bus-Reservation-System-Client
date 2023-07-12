import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navigationbar() {
  const [show, setShow] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const Navigate = useNavigate("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const logout = () => {
    localStorage.removeItem("bus-reservation-system-token");
    localStorage.removeItem("bus-reservation-system-user");
    localStorage.removeItem("bus-reservation-system-role");
    setShow(true);
    Navigate("/login");
  };

  const fetchUser = () => {
    const email = localStorage.getItem("bus-reservation-system-user");
    console.log(email)
    fetch(`http://localhost:8080/auth/api/getuser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "bus-reservation-system-token"
        )}`,
      },
      body: email,
    })
      .then(async (resolve) => {
        resolve
          .json()
          .then((result) => {
            if (resolve.status === 200) {
              setName(result.name);
            } else {
              toast.error(result.message, toastOptions);
            }
          })
          .catch((error) => {
            toast.error(error, toastOptions);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, toastOptions);
      });
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (localStorage.getItem("bus-reservation-system-token")) {
      fetchUser();
      setShow(false);
    } else {
      setShow(true);
    }

    if (localStorage.getItem("bus-reservation-system-role") === "ROLE_ADMIN") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  });
  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-pills">
      <NavLink className="navbar-brand ml-5" to={""}>
        <h1 className="ml-5">
          <i className="fa fa-bus-alt fa-2x"></i>CHALO<em> Yatri</em>
          <br />
        </h1>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto" style={{ fontSize: "22px" }}>
          <li className="nav-item ml-3">
            {isAdmin === false ? (
              <NavLink className="nav-link" to={"/"}>
                Reservation
              </NavLink>
            ) : (
              <NavLink className="nav-link" to={"/admin"}>
                Home
              </NavLink>
            )}
          </li>
          <li className="nav-item ml-3">
            {isAdmin === false ? (
              <NavLink className="nav-link" to={"/view"}>
                View Ticket
              </NavLink>
            ) : (
              <NavLink className="nav-link" to={"/addbus"}>
                Add-Bus
              </NavLink>
            )}
          </li>
          <li className="nav-item ml-3">
            {isAdmin === false ? (
              <NavLink className="nav-link" to={"/cancel"}>
                Cancellation
              </NavLink>
            ) : (
              <NavLink className="nav-link" to={"/addroute"}>
                Add-Route
              </NavLink>
            )}
          </li>
          <li className="nav-item ml-3">
            {show === true ? (
              <NavLink className="nav-link" to={"/signup"}>
                SignUp
              </NavLink>
            ) : (
              <NavLink className="nav-link" to={"/profile"}>
                {name}
              </NavLink>
            )}
          </li>
          <li className="nav-item ml-3">
            {show === true ? (
              <NavLink className="nav-link" to={"/login"}>
                Login
              </NavLink>
            ) : (
              <NavLink onClick={logout} className="nav-link" to={"/login"}>
                logout
              </NavLink>
            )}
          </li>
        </ul>
      </div>
      <ToastContainer />
    </nav>
  );
}
