import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingConfirmation() {
  const locationSate = useLocation().state;
  const [origin] = useState(
    locationSate.locationstate.locationState.locationState.origin
  );
  const [destination] = useState(
    locationSate.locationstate.locationState.locationState.destination
  );
  const [boardingDate] = useState(
    locationSate.locationstate.locationState.bus.departureDate
  );
  const [arrivalDate] = useState(
    locationSate.locationstate.locationState.bus.arrivalDate
  );
  const [passenger] = useState(locationSate.locationstate.passenger);
  const [selectedSeats] = useState(locationSate.selectedSeats);
  const [totalPrice] = useState(locationSate.route.price);
  const [distance] = useState(locationSate.route.distance);
  const [pickUpPoint] = useState(locationSate.route.pickUpPoint);
  const [dropOffPoint] = useState(locationSate.route.dropOffPoint);
  const [pickUpTime] = useState(locationSate.route.pickUpTime);
  const [dropOffTime] = useState(locationSate.route.dropOffTime);
  const [name] = useState(locationSate.locationstate.locationState.bus.name);
  const [number] = useState(
    locationSate.locationstate.locationState.bus.number
  );
  const [type] = useState(locationSate.locationstate.locationState.bus.type);
  const [customer_name, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [booking_id, setBookingId] = useState(undefined);
  const Navigate = useNavigate("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const payment = () => {
    if (handleValidation()) {
      let customer = { name: customer_name, email: email, mobile: mobile };
      let bookings = {
        mobile: mobile,
        email: email,
        busNumber: number,
        boardingDate: boardingDate,
        arrivalDate: arrivalDate,
        origin: origin,
        destinantion: destination,
        passengers:passenger,
        busType: type,
        totalPrice: totalPrice,
        status: "Pending",
      };
      fetch(`http://localhost:8080/auth/api/savebooking`,{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        body:JSON.stringify({bookings,customer,passenger,seat:selectedSeats})
      }).then((resolve)=>{
        if(resolve.status===200){
          resolve.json().then((result)=>{
            setBookingId(result);
            console.log(result)
          }).catch((error)=>{
            toast.error(error + " Please try again later...", toastOptions);
          })
        }else{
          toast.error("Failed saving data!! Please try again later...", toastOptions);
        }
      }).catch((error)=>{
        toast.error(error + " Please try again later...", toastOptions);
      })
    }
  };

  const handleValidation = () => {
    if (customer_name === "" || email === "" || mobile === "") {
      toast.error("Fields cannot be empty", toastOptions);
      return false;
    } else if (!validator.isEmail(email)) {
      toast.error("Please enter valid email", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="col-md-8 offset-md-2 booking-div">
      <div className="card">
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
                    <td>{selectedSeats[i]}</td>
                    <td>Rs.{totalPrice / selectedSeats.length}</td>
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
            <div className="row">
              <p>
                *Please note that the seat numbers mentioned above are not final
                and may vary depending on
              </p>
              <div className="form-group">
                <label htmlFor="name" id="name">
                  Name<em className="text-danger">*</em>
                </label>
                <input
                  onChange={(e) => setCustomerName(e.target.value)}
                  value={customer_name}
                  className="mr-4 ml-2"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Please enter your name"
                />
                <label htmlFor="email" id="email">
                  Email<em className="text-danger">*</em>
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="ml-2"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Please enter your email"
                />
                <label htmlFor="mobile" id="mobile" className="ml-3">
                  Mobile<em className="text-danger">*</em>
                </label>
                <input
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                  className="ml-2"
                  type="text"
                  name="mobile"
                  id="mobile"
                  placeholder="Please enter your mobile no."
                />
              </div>
            </div>
          </div>
          <div className="d-inline">
            <button className="btn btn-danger btn-lg mt-3 mr-3">Cancel</button>
            <button onClick={payment} className="btn btn-success btn-lg mt-3">
              Proceed to pay
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
