import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Bookings() {

    const [bookings, setBookings] = useState([]);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 6500,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const fetchBookings = ()=>{
        fetch(`http://localhost:8080/auth/admin/api/bookings`,{
            method: 'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                Authorization:`Bearer ${localStorage.getItem('bus-reservation-system-token')}`
            }
        }).then((resolve)=>{
            resolve.json().then((result)=>{
                if(result.status === 200){
                    setBookings(result.routes);
                }else{
                    toast.error(result.message,toastOptions);
                }
            }).catch((error)=>{
                toast.error(error, toastOptions);
            });
        }).catch((error)=>{
            toast.error(error, toastOptions);
        });
    }

    useEffect(()=>{
        fetchBookings();
    })
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-title mt-3">
          <h2 className="text-center">
            <strong>Bookings</strong>
          </h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">BOOKING_ID</th>
                  <th scope="col">BUS_NUMBER</th>
                  <th scope="col">ORIGIN</th>
                  <th scope="col">DESTINATION</th>
                  <th scope="col">BOARDING_DATE</th>
                  <th scope="col">PASSENGERS</th>
                  <th scope="col">CUSTOMER_ID</th>
                  <th scope="col">E-MAIL</th>
                  <th scope="col">MOBILE</th>
                  <th scope="col">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((item)=>
                    <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.number}</td>
                    <td>{item.origin}</td>
                    <td>{item.destination}</td>
                    <td>{item.boardingDate}</td>
                    <td>{item.passengers}</td>
                    <td>{item.cutomer_id}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.status}</td>
                    <td>
                        <i className="btn btn-danger fa fa-delete-left mr-1"></i>
                        <i className="btn btn-warning fa fa-pen-nib ml-1"></i>
                    </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
