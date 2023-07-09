import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewTicket() {
  const [mobile, setMobile] = useState(null);
  const [bookingid, setBookingid] = useState(undefined);
  const toastOptions = {
    position:'bottom-right',
    autoClose:6500,
    pauseOnHover: true,
    draggable: true,
    theme:'dark'
  }
  const getData = async (e)=>{
    console.log("view ticket");
    e.preventDefault();
    if(handleValidation()){
      const data = {mobile, bookingid};
      fetch(`http://localhost/api/view`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          Accept:'application/json'
        },
        body:JSON.stringify(data)
      }).then((resolve)=>{
        if(resolve.status===200){
          resolve.json().then((result)=>{
            console.log(result);
          }).catch((error)=>{
            toast.error(error + " Please Try again later!..", toastOptions);
          })
        }else{
          console.log(resolve);
          toast.error(resolve.body,toastOptions);
        }
      }).catch((error)=>{
        toast.error(error + " Please Try again later!..", toastOptions);
      })
    }
  }
  const handleValidation = ()=>{
    if(mobile===null){
      console.log("I am inside if if if")
      toast.error("Please Enter Mobile No.", toastOptions)
      return false;
    }else if(mobile.length<10){
      toast.error("Please enter correct Mobile Number", toastOptions);
    }else if(bookingid===undefined){
      toast.error('Please Enter booking ID', toastOptions) ;
      return false;
    }else{
      return true;
    }
  }
  return (
    <div>
      <div className="col-md-4 offset-md-1">
        <div className="card mb-5 text-white">
          <div className="card-title mt-4">
            <h1 className="font-weight-bold">View Ticket</h1>
          </div>
          <div className="card-body">
            <form onSubmit={getData} className="mr-5 ml-5 font-weight-bold" action="">
              <div className="form-group">
                <label className="d-flex" htmlFor="mobile">
                  Mobile
                </label>
                <input
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                  id="mobile"
                  name="mobile"
                  placeholder="Enter Mobile Number"
                  type="text"
                  className="form-control"
                />
                <label className="d-flex mt-4" htmlFor="bookingid">
                  Booking Id
                </label>
                <input
                  onChange={(e) => setBookingid(e.target.value)}
                  value={bookingid}
                  id="bookingid"
                  name="bookingid"
                  placeholder="Enter Booking Id"
                  type="text"
                  className="form-control"
                />
              </div>
              <button className="btn btn-lg btn-warning mt-3" type="submit">Get Ticket</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
