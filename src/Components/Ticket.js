import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Ticket() {
  const locationState = useLocation().state;
  console.log(locationState);
  const [origin] = useState(locationState.booking.route.origin);
  const [destination] = useState(locationState.booking.route.destination);
  const [boardingDate] = useState(locationState.booking.bus.departureDate);
  const [arrivalDate] = useState(locationState.booking.bus.arrivalDate);
  const [passenger] = useState(locationState.booking.passenger);
  const [totalPrice] = useState(locationState.booking.bookings.totalPrice);
  const [distance] = useState(locationState.booking.route.distance);
  const [pickUpPoint] = useState(locationState.booking.route.pickUpPoint);
  const [dropOffPoint] = useState(locationState.booking.route.dropOffPoint);
  const [pickUpTime] = useState(locationState.booking.route.pickUpTime);
  const [dropOffTime] = useState(locationState.booking.route.dropOffTime);
  const [name] = useState(locationState.booking.bus.name);
  const [number] = useState(locationState.booking.bus.number);
  const [type] = useState(locationState.booking.bus.type);
  const [customer_name] = useState(locationState.booking.customer.name);
  const [email] = useState(locationState.booking.customer.email);
  const [mobile] = useState(locationState.booking.customer.name);
  const [booking_id] = useState(locationState.booking.bookings.bookingId);
  const [status] = useState(locationState.booking.bookings.status);
  const [cancelStatus, setCancelStatus] = useState(locationState.cancelStatus);
  const [isCancelled, setIsCancelled] = useState(false);
  const toastOptions = {
    position:'bottom-right',
    autoClose:6500,
    pauseOnHover: true,
    draggable: true,
    theme:'dark'
  }
  console.log(locationState.booking.passenger);

  const cancelTicket = ()=>{
    fetch(`http://localhost:8080/auth/api/cancel/${booking_id}`).then((resolve)=>{
      if(resolve.status === 200){
          toast.success("Your ticket is cancelled",toastOptions);
          setCancelStatus(false);
          setIsCancelled(true);
      }
    })
  }

  // eslint-disable-next-line
  useEffect(()=>{
    console.log(status + "**************************")
    if(status==="Cancelled"){
      setCancelStatus(false);
      setIsCancelled(true);
    }
  })
  return (
    <div className="col-md-8 offset-md-2 booking-div">
      <div className="card">
        <div className="card-title mt-4">
          <h1>Bus-Ticket</h1>
          {isCancelled===true?<h2 className="text-danger mt-4"><strong>!!!!Cancelled!!!!</strong></h2>:null}
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col mr-5 mt-3">
              <h1>{origin}</h1>
            </div>
            <div className="col">
              <i className="fa-solid fa-arrow-right-long fa-4x"></i>
              <h2>
                <strong>{distance}km</strong>
              </h2>
            </div>
            <div className="col mt-3">
              <h1>{destination}</h1>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col mr-5">
              <h4>
                Boarding Date:{" "}
                <i>
                  <strong>{boardingDate}</strong>
                </i>
              </h4>
            </div>
            <div className="col">
              <h4>
                Arrival Date:{" "}
                <i>
                  <strong>{arrivalDate}</strong>
                </i>
              </h4>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col mr-5">
              <h5>
                Pick-up location:{" "}
                <i>
                  <strong>{pickUpPoint}</strong>
                </i>
              </h5>
            </div>
            <div className="col">
              <h5>
                Dropoff location:{" "}
                <i>
                  <strong>{dropOffPoint}</strong>
                </i>
              </h5>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <h5>
                Pick-up Time:{" "}
                <i>
                  <strong>{pickUpTime}</strong>
                </i>
              </h5>
            </div>
            <div className="col">
              <h5>
                Arrival Time:{" "}
                <i>
                  <strong>{dropOffTime}</strong>
                </i>
              </h5>
            </div>
          </div>
          <div className="container mt-3">
            <h2>Booking id: <strong>{booking_id}</strong></h2>
          </div>
          <div className="container mt-4">
            <h2>
              <strong>Bus Details</strong>
            </h2>
          </div>
          <div className="table-responsive col-md-10 offset-md-1">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Bus_Number</th>
                  <th scope="col">Bus_Name</th>
                  <th scope="col">Bus_Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{number}</td>
                  <td>{name}</td>
                  <td>{type}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="container mt-4">
            <h2>
              <strong>Passengers</strong>
            </h2>
          </div>
          <div className="table-responsive col-md-10 offset-md-1">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Seat_No.</th>
                  <th scope="col">Ticket_Fare</th>
                </tr>
              </thead>
              <tbody>
                {passenger.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.gender}</td>
                    <td>{item.seat}</td>
                    <td>Rs.{totalPrice / passenger.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row mt-5">
              <h3>
                Total Fare:{" "}
                <strong>
                  <i>Rs.{totalPrice}</i>
                </strong>
              </h3>
            </div>
          </div>
          <div className="table-responsive col-md-10 offset-md-1">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">C_Name</th>
                  <th scope="col">C_Email</th>
                  <th scope="col">C_Mobile</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>{customer_name}</td>
                    <td>{email}</td>
                    <td>{mobile}</td>
                  </tr>
              </tbody>
            </table>
            </div>
            {cancelStatus===true?<button onClick={cancelTicket} className="btn btn-danger btn-lg mt-4">Cancel Ticket</button>:null}
            {isCancelled===true?<h4 className="mt-4">Ticket Cancelled..Your refund will be initiated within 2-3 business days</h4>:null}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
