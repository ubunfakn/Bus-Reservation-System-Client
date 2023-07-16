import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

export default function SignUp() {
  //Declarations
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [checkbox, setCheckBox] = useState(false);
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
        name,
        email,
        password,
        mobile,
        address,
        state,
        country,
      };
      fetch("http://localhost:8080/auth/save", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resolve) => {
          resolve
            .json()
            .then((resultJson) => {
              if (resolve.status === 200) {
                Navigate("/login");
              } else {
                toast.error(resultJson.message, toastOptions);
              }
            })
            .catch((error) => {
              toast.error(error + " Please try again later...", toastOptions);
            });
        })
        .catch((error) => {
          toast.error(error + " Please try again later...", toastOptions);
        });
    }
  };

  const handleValidation = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      mobile === "" ||
      address === "" ||
      state === "" ||
      country === "" ||
      checkbox === false
    ) {
      toast.error("Fields cannot be empty", toastOptions);
      return false;
    } else if (!validator.isEmail(email)) {
      toast.error("Please enter correct email", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password must contain at least eight characters",
        toastOptions
      );
      return false;
    } else if (!validator.isNumeric(mobile)) {
      toast.error(
        "Mobile number should only consist of numbers.",
        toastOptions
      );
      return false;
    } else {
      return true;
    }
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
  });

  return (
    <div>
      <div className="col-md-4 offset-md-1">
        <div className="card mb-4 mt-4 text-white">
          <div className="card-title mt-3">
            <i className="fa fa-user-plus fa-4x mb-1"></i>
            <h1>Sign-up</h1>
          </div>
          <div className="card-body">
            <form onSubmit={getData}>
              <div className="row">
                {/* Name Field  */}
                <div className="col">
                  <label className="d-flex" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Full name"
                  />
                </div>
                {/* Name Field  */}

                {/* Email Field  */}
                <div className="col">
                  <label className="d-flex" htmlFor="email">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                {/* Email Field  */}
              </div>

              <div className="row">
                {/* Password Field  */}
                <div className="col">
                  <label className="d-flex" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="password"
                    placeholder="Enter Strong Password"
                  />
                </div>
                {/* Password Field  */}

                {/* Mobile Field  */}
                <div className="col">
                  <label className="d-flex" htmlFor="mobile">
                    Mobile
                  </label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="form-control"
                    id="mobile"
                    placeholder="Enter Mobile No."
                  />
                </div>
              </div>

              <div className="row">
                {/* Address  */}
                <div className="col">
                  <label className="d-flex" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="address"
                    placeholder="Enter Complete Address"
                  />
                </div>
                {/* Address  */}

                {/* State  */}
                <div className="col">
                  <label className="d-flex" htmlFor="state">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="form-control"
                    id="state"
                    placeholder="Enter State"
                  />
                </div>
                {/* State  */}
              </div>

              {/* Country  */}
              <div className="form-group">
                <label className="d-flex" htmlFor="country">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="form-control"
                  id="country"
                  placeholder="Enter Country"
                />
              </div>
              {/* Country  */}

              {/* Check-Box  */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input d-flex"
                  id="check-box"
                  onChange={() => setCheckBox(!checkbox)}
                />
                <label className="form-check-label d-flex" htmlFor="check-box">
                  Agree to Terms & Conditions
                </label>
              </div>
              {/* Check-Box  */}

              <button type="submit" className="btn btn-lg mt-3 btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
