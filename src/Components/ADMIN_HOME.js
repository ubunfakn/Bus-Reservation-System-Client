import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ADMIN_HOME() {
  const Navigate = useNavigate("");
  const [busCount, setBusCount] = useState(10);
  const [routeCount, setRouteCount] = useState(8);
  const [userCount, setUserCount] = useState(6);
  const [bookingCount, setBookingCount] = useState(20);
  const [customerCount, setCustomerCount] = useState(25);
  // eslint-disable-next-line
  const [transactionCount, setTransactionCount] = useState(13);

  const fetchCounts = ()=>{
    fetch(`http://localhost:8080/auth/admin/api/countall`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "bus-reservation-system-token"
        )}`,
      },
    }).then((resolve)=>{
      if(resolve.status === 200){
        resolve.json().then((data) =>{
          setCustomerCount(data.customerCount);
          setBusCount(data.busCount);
          setRouteCount(data.routeCount);
          setUserCount(data.userCount);
          setBookingCount(data.bookingCount);
        })
      }
    })
  }
  useEffect(()=>{
    fetchCounts();
     // eslint-disable-next-line
  })
  return (
    <div className="col-md-10 offset-md-1">
      <div className="card">
        <div className="card-title mt-3">
          <i className="fa-sharp fa-solid fa-user-secret fa-3x"></i>
          <h1 className="mb-4">ADMIN PANEL</h1>
        </div>
        <div className="card-body mt-5">
          <div className="row">
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-users fa-6x"></i>
                  <h2 className="text-center mt-4">{customerCount}</h2>
                  <button
                    onClick={() => Navigate("/customers")}
                    className="btn btn-warning btn-block"
                  >
                    Customers
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-ticket fa-6x"></i>
                  <h2 className="text-center mt-4">{bookingCount}</h2>
                  <button
                    onClick={() => Navigate("/bookings")}
                    className="btn btn-warning btn-block text-white"
                  >
                    Bookings
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-bus fa-6x"></i>
                  <h2 className="text-center mt-4">{busCount}</h2>
                  <button
                    onClick={() => Navigate("/buses")}
                    className="btn btn-warning btn-block"
                  >
                    Buses
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-road fa-6x"></i>
                  <h2 className="text-center mt-4">{routeCount}</h2>
                  <button
                    onClick={() => Navigate("/routes")}
                    className="btn btn-warning btn-block"
                  >
                    Routes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-users-viewfinder fa-6x"></i>
                  <h2 className="text-center mt-4">{userCount}</h2>
                  <button
                    onClick={() => Navigate("/users")}
                    className="btn btn-warning btn-block"
                  >
                    Users
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-sharp fa-solid fa-bus fa-6x"></i>
                  <i className="fa-light fa-plus fa-6x"></i>
                  <button
                    onClick={() => Navigate("/addbus")}
                    className="btn btn-success btn-block mt-4"
                  >
                    Add Bus
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-sharp fa-solid fa-route fa-6x"></i>
                  <i className="fa-light fa-plus fa-6x"></i>
                  <button
                    onClick={() => Navigate("/addroute")}
                    className="btn btn-success btn-block mt-4"
                  >
                    Add Route
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
