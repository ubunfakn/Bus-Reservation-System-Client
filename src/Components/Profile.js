import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";

export default function Profile() {
  const [readOnly, setReadOnly] = useState(true);
  const [userId, setUserId] = useState();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState(
    localStorage.getItem("bus-reservation-system-user")
  );
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const Navigate = useNavigate("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const fetchUser = () => {
    fetch(`http://localhost:8080/api/getUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "bus-reservation-system-token"
        )}`,
      },
      body: JSON.stringify(email),
    })
      .then((resolve) => {
        resolve
          .json()
          .then((result) => {
            if (result.status === 200) {
              setUserId(result.id);
              setName(result.name);
              setMobile(result.mobile);
              setEmail(result.email);
              setRole(result.role);
              setAddress(result.address);
              setState(result.state);
              setCountry(result.country);
            } else {
              toast.error(result.message, toastOptions);
            }
          })
          .catch((error) => {
            toast.error(error, toastOptions);
          });
      })
      .catch((error) => {
        toast.error(error, toastOptions);
      });
  };

  const getData = ()=>{
    if(handleValidation()){
      setReadOnly(true);
      const data = {userId, name, email, mobile, role, address, state, country};
      fetch(`http://localhost:8080/api/editprofile`,{
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization:`Bearer ${localStorage.getItem('bus-reservation-system-token')}`
        },
        body:JSON.stringify(data)
      }).then((resolve)=>{
        resolve.json().then((result)=>{
          if(result.status === 200){
            fetchUser();
            toast.done("Profile updated successfully", toastOptions);
          }else{
            toast.error(result.message, toastOptions);
          }
        }).catch((error)=>{
          toast.error(error, toastOptions);
        });
      }).catch((error)=>{
        toast.error(error, toastOptions);
      });
    }
  }

  const handleValidation = ()=>{
    if (
      name === "" ||
      email === "" ||
      mobile === "" ||
      address === "" ||
      state === "" ||
      country === ""
    ) {
      toast.error("Fields cannot be empty", toastOptions);
      return false;
    } else if (!validator.isEmail(email)) {
      toast.error("Please enter correct email", toastOptions);
      return false;
    }else if (!validator.isNumeric(mobile)) {
      toast.error(
        "Mobile number should only consist of numbers.",
        toastOptions
      );
      return false;
    } else {
      return true;
    }
  }

  // eslint-disable-next-line
  useEffect(() => {
    fetchUser();
  });

  return (
    <div className="col-md-6 offset-md-1">
      <div className="card">
        <div className="card-title mt-3">
          <i className="fa-solid fa-address-card fa-5x"></i>
          <h1 className="mt-4">MY-PROFILE</h1>
          <hr />
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table class="table table-dark">
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <h4>UserId</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      {userId}
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h4>Name</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <input
                        type="text"
                        value={name}
                        readOnly={readOnly}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-dark text-white"
                      />
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h4>E-mail</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <input
                        type="text"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        readOnly={readOnly}
                        className="bg-dark text-white"
                      />
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h4>Mobile</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <input
                        type="text"
                        value={mobile}
                        readOnly={readOnly}
                        className="bg-dark text-white"
                      />
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h4>Role</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <input
                        type="text"
                        value={role}
                        readOnly={readOnly}
                        className="bg-dark text-white"
                      />
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h4>Address</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <input
                        type="text"
                        value={address}
                        readOnly={readOnly}
                        className="bg-dark text-white"
                      />
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h4>State</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <input
                        type="text"
                        value={state}
                        readOnly={readOnly}
                        className="bg-dark text-white"
                      />
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h4>Country</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <input
                        type="text"
                        value={country}
                        readOnly={readOnly}
                        className="bg-dark text-white"
                      />
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-d-inline-flex profile-button">
            {readOnly===true?<button onClick={()=>setReadOnly(false)} className="btn btn-lg btn-warning mt-3">
              Edit Profile
            </button>:null}
            {readOnly===true?<button onClick={()=>Navigate("/change")} className="btn btn-lg btn-danger ml-3 mt-3">
              Change Password
            </button>:null}
            {readOnly===false?<button onClick={getData} className="btn btn-lg btn-success ml-3 mt-3">
              Save Changes
            </button>:null}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
