import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

export default function Login() {
  //Declarations
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckBox] = useState();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const Navigate = useNavigate("");
  //Declarations

  //Functions
  const getData = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const data = {
        email,
        password,
      };
      fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((resolve) => {
        if (resolve.status === 200) {
          resolve.json().then((resultJson) => {
            localStorage.setItem(
              "bus-reservation-system-user",
              resultJson.username
            );
            localStorage.setItem(
              "bus-reservation-system-token",
              resultJson.token
            );
            localStorage.setItem(
              "bus-reservation-system-role",
              resultJson.role
            );
            if (resultJson.role === "ROLE_ADMIN") Navigate("/admin");
            else if (resultJson.role === "ROLE_USER") Navigate("/user");
          }).catch((error)=>{
            toast.error(error + " Please try again later...", toastOptions);
          });
        } else{
          toast.error("Invalid Credentials!!", toastOptions);
        }
      }).catch((error)=>{
        toast.error(error + " Please try again later...", toastOptions);
      });
    }
  };

  const handleValidation = () => {
    if (password === "" || email === "" || checkbox === undefined) {
      toast.error("Fields cannot be empty", toastOptions);
      return false;
    } else if (!validator.isEmail(email)) {
      toast.error("Please enter correct email", toastOptions);
      return false;
    } else if (validator.isEmpty(password)) {
      toast.error("Password cannot be empty", toastOptions);
      return false;
    } else return true;
  };

  useEffect(() => {
    if (localStorage.getItem("bus-reservation-system-token")) {
      if (localStorage.getItem("bus-reservation-system-role") === "ROLE_ADMIN")
        Navigate("/admin");
      else if (
        localStorage.getItem("bus-reservation-system-role") === "ROLE_USER"
      )
        Navigate("/user");
    }
    // eslint-disable-next-line
  }, []);
  //Functions

  return (
    <div>
      <div className="col-md-4 offset-md-1">
        <div className="card mb-5">
          <div className="card-title mt-3">
            <i className="fa fa-user-circle fa-4x"></i>
            <h1>Login</h1>
          </div>
          <div className="card-body mt-2">
            <form onSubmit={getData}>
              {/* Email Field  */}
              <div className="form-group">
                <label className="d-flex" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              {/* Email Field  */}

              {/* Password Field  */}
              <div className="form-group">
                <label className="d-flex" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                />
              </div>
              {/* Password Field  */}

              {/* Check-Box  */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input d-flex"
                  id="check-box"
                  onChange={(e) => setCheckBox(!checkbox)}
                />
                <label className="form-check-label d-flex" htmlFor="check-box">
                  Agree to Terms & Conditions
                </label>
              </div>
              {/* Check-Box  */}

              <button
                type="submit"
                className="mt-4 btn btn-primary btn-lg font-weight-bold"
              >
                login
              </button>
            </form>

            <Link
              className="d-flex mt-4 text-warning font-weight-bold"
              to={"/forgot"}
            >
              forgot password?
            </Link>
            <Link
              className="d-flex mt-2 text-warning font-weight-bold"
              to={"/signup"}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
