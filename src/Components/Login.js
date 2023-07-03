import React,{useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {

  //Declarations
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckBox] = useState(false);
  const [error, setError] = useState(false);
  const [apiError, setApiError] = useState(null);
  const Navigate = useNavigate("");
  //Declarations

  //Functions
  const getData = async (e) => {
    e.preventDefault();
    console.log(
      email,
      password,
      checkbox,
    );
    if (
      !email ||
      !password ||
      !checkbox
    ) {
      setError(true);
    }else{
      try {
        const data = {
          email,
          password
        };
        let result = await fetch("http://localhost:8080/auth/login", {
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
          localStorage.setItem('bus-reservation-system-user',resultJson.username);
          localStorage.setItem('bus-reservation-system-token', resultJson.token);
          localStorage.setItem('bus-reservation-system-role', resultJson.role);
          if(resultJson.role === "ROLE_ADMIN")Navigate("/admin");
          else if(resultJson.role === "ROLE_USER")Navigate("/user");
  
        } else if(result.status===404) {
          setApiError(
            "Invalid Credentials"
          );
        }else{
          setApiError(
            "Something went wrong from our end!! Please try again after sometime"
          );
        }
      } catch (error) {
        setApiError("Something went wrong from our end!! Please try again after sometime");
      }
    }
  };

  useEffect(()=>{
    if(localStorage.getItem("bus-reservation-system-token")){
      if(localStorage.getItem("bus-reservation-system-role") === "ROLE_ADMIN")Navigate("/admin");
        else if(localStorage.getItem("bus-reservation-system-role") === "ROLE_USER")Navigate("/user");
    }
    // eslint-disable-next-line
  },[])
  //Functions

  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card text-white mb-5 mt-4" style={{ opacity:'0.9', backgroundColor:'#175a7a' }}>
          {apiError ? (
              <div className="alert alert-danger" role="alert">
                <h5>{apiError}</h5>
              </div>
            ) : (
              <div className="container"></div>
            )}
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
                  {error && !email ? (
                    <span className="d-flex text-warning">
                      Please Enter Valid Email
                    </span>
                  ) : null}
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
                  {error && !password ? (
                    <span className="d-flex text-warning">
                      Please Enter Valid Password
                    </span>
                  ) : null}
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
                  <label
                    className="form-check-label d-flex"
                    htmlFor="check-box"
                  >
                    Agree to Terms & Conditions
                  </label>
                  {error && !checkbox ? (
                    <span className="d-flex text-warning">
                      Please agree to terms and conditions
                    </span>
                  ) : null}
                </div>
                {/* Check-Box  */}

                <button
                  type="submit"
                  className="mt-4 btn btn-primary btn-lg font-weight-bold"
                >
                  login
                </button>
              </form>

              <Link className="d-flex mt-4 text-warning font-weight-bold" to={"/forgot"}>
                forgot password?
              </Link>
              <Link className="d-flex mt-2 text-warning font-weight-bold" to={"/signup"}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
