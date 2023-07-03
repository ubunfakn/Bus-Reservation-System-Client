import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState(null);
  const Navigate = useNavigate("");
  //Declarations

  //Functions
  const getData = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !mobile ||
      !state ||
      !country ||
      !checkbox
    ) {
      setError(true);
    } else {
      const data = {
        name,
        email,
        password,
        mobile,
        address,
        state,
        country,
      };
      let result = await fetch("http://localhost:8080/auth/save", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (result.status === 200) {
        let resultJson = await result.json();
        console.log(resultJson);
        localStorage.setItem("bus-reservation-system-user", resultJson);
        localStorage.setItem("bus-reservation-system-token", resultJson.token);
        if (resultJson.role === "ROLE_ADMIN") Navigate("/admin");
        else if (resultJson.role === "ROLE_USER") Navigate("/user");
      } else {
        setApiError(
          "Something went wrong from our end!! Please try again after sometime"
        );
      }
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
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          "url(" + require("./utils/van-and-bus-mockup.jpg") + ")",
        height: "150vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="col-md-4 offset-md-4">
        <div
          className="card mb-4 mt-4 text-white"
          style={{ opacity: "0.9", backgroundColor: "#175a7a" }}
        >
          {apiError ? (
            <div className="alert alert-danger" role="alert">
              <h5>{apiError}</h5>
            </div>
          ) : (
            <div className="container"></div>
          )}
          <div className="card-title mt-3">
            <i className="fa fa-user-plus fa-4x mb-1"></i>
            <h1>Sign-up</h1>
          </div>
          <div className="card-body">
            <form onSubmit={getData}>
              {/* Name Field  */}
              <div className="form-group">
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
                {error && !name ? (
                  <span className="d-flex text-warning">
                    Please Enter Valid Name
                  </span>
                ) : null}
              </div>
              {/* Name Field  */}

              {/* Email Field  */}
              <div className="form-group">
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
                  placeholder="Enter Strong Password"
                />
                {error && !password ? (
                  <span className="d-flex text-warning">
                    Please Enter Valid Password
                  </span>
                ) : null}
              </div>
              {/* Password Field  */}

              {/* Mobile No. */}
              <div className="form-group">
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
                {error && !mobile ? (
                  <span className="d-flex text-warning">
                    Please Enter Valid Mobile No.
                  </span>
                ) : null}
              </div>
              {/* Mobile No. */}

              {/* Address  */}
              <div className="form-group">
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
                {error && !address ? (
                  <span className="d-flex text-warning">
                    Please Enter Valid Address
                  </span>
                ) : null}
              </div>
              {/* Address  */}

              {/* State  */}
              <div className="form-group">
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
                {error && !state ? (
                  <span className="d-flex text-warning">
                    Please Enter Valid State
                  </span>
                ) : null}
              </div>
              {/* State  */}

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
                {error && !country ? (
                  <span className="d-flex text-warning">
                    Please Enter Valid Country
                  </span>
                ) : null}
              </div>
              {/* Country  */}

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
                {error && !checkbox ? (
                  <span className="d-flex text-warning">
                    Please agree to terms and conditions
                  </span>
                ) : null}
              </div>
              {/* Check-Box  */}

              <button type="submit" className="btn btn-lg mt-3 btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
