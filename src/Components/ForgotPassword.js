import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(undefined);
  const Navigate = useNavigate("");
  const toastOptions = {
    position:'bottom-right',
    autoClose:6500,
    pauseOnHover: true,
    draggable: true,
    theme:'dark'
  }

  const getOtp = ()=>{
    if(handleValidation()){
      toast.loading("Please wait.........",toastOptions)
      // toast.warn("loading....")
      fetch('http://localhost:8080/auth/forgot',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({email})
      }).then((resolve)=>{
          resolve.json().then((result)=>{
            if(resolve.status === 200){
              toast.success(result.message, toastOptions);
              setTimeout(()=>{
                toast.dismiss();
              },1000);
            }else{
              toast.error(result.message, toastOptions);
            }
          }).catch((error)=>{
            toast.error(error + " Something went wrong from our end!! Please try again after sometime", toastOptions);
          })
      }).catch((error)=>{
        toast.error(error + " Something went wrong from our end!! Please try again after sometime", toastOptions);
      })
    }
  }

  const handleValidation = ()=>{
    if(!validator.isEmail(email)){
      toast.error("Please enter valid email address", toastOptions);
      return false;
    }else{
      return true;
    }
  }

  const getData = (e)=>{
    e.preventDefault();
    if(otp!==undefined && validator.isNumeric(otp)){
      fetch('http://localhost:8080/auth/verify',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({otp})
      }).then((resolve)=>{
        resolve.json().then((result)=>{
          if(resolve.status === 200){
            Navigate("/change",{state: email});
          }else{
            toast.error(result.message, toastOptions);
          }
        }).catch((error)=>{
          toast.error(error + " Something went wrong from our end!! Please try again after sometime", toastOptions);
        })
      }).catch((error)=>{
        toast.error(error + " Something went wrong from our end!! Please try again after sometime" ,toastOptions);
      })
    }
  }
  return (
    <div>
        <div className="col-md-4 offset-md-1">
          <div
            className="card text-white mb-5"
            style={{marginTop: '17%'}}
          >
            <div className="card-title mt-3">
              <i className="fa fa-lock fa-4x"></i>
              <h1>Forgot Password</h1>
            </div>
            <div className="card-body mt-2">
              <form onSubmit={getData}>
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
                  <Link className="mt-1 font-weight-bold d-flex" onClick={getOtp}>Get Otp</Link>
                </div>
                <div className="form-group">
                  <label className="d-flex" htmlFor="otp">
                    OTP
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setOtp(e.target.value)}
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter otp"
                  />
                </div>
                <button type="submit" className="btn btn-lg btn-success">Verify</button>
              </form>
            </div>
          </div>
        </div>
      <ToastContainer />
    </div>
  );
}
