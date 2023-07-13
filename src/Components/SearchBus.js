import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import "react-toastify/dist/ReactToastify.css";

export default function SearchBus() {
  const locationState = useLocation().state;
  const [busNotFound, setBusNotFound] = useState(!locationState.statusOfSearch);
  const [origin, setOrigin] = useState(locationState.origin);
  const [destination, setDestination] = useState(locationState.destination);
  const [date, setDate] = useState(locationState.date);
  const [buses, setBuses] = useState(locationState.buses);
  const Navigate = useNavigate('');
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // eslint-disable-next-line
  const searchCity = (val) => {
    fetch(``)
      .then((resolve) => {
        resolve
          .json()
          .then((data) => {})
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = (e) => {
    e.preventDefault();
    const data = { date, origin, destination };
    if (handleValidation()) {
      //fetch data from api and display it on the screen using react components
      fetch(`http://localhost:8080/auth/api/getBuses`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((resolve) => {
        if (resolve.status === 200) {
          resolve
            .json()
            .then((result) => {
              setBuses(result);
              setBusNotFound(false);
            })
            .catch((error) => {
              toast.error("Please try later", toastOptions);
            });
        } else {
          setBusNotFound(true);
        }
      })
  }
  };

  const handleValidation = () => {
    if (!validator.isDate(date)) {
      toast.error("Please enter Date in dd/mm/yyyy format", toastOptions);
      return false;
    } else if (origin === "" || origin === undefined) {
      toast.error("Please Enter Origin", toastOptions);
      return false;
    } else if (destination === "" || destination === undefined) {
      toast.error("Please Enter Destination", toastOptions);
      return false;
    } else if (date === undefined) {
      toast.error("Please enter Date in dd/mm/yyyy format", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const addPassengers = (bus)=>{
    Navigate("/addpass", {state:{locationState,bus}});
  }

  return (
    <div className="col-md-10 offset-md-1">
      <div className="card">
        <div className="card-body">
          {busNotFound === true ? (
            <h2 className="text-danger">
              No Active Bus found for the selected date!!
            </h2>
          ) : (
            <h2 className="text-success">
              Buses available for the selected date and destination
            </h2>
          )}
          <form onSubmit={getData} className="mt-5">
            <div className="row">
              <div className="col">
                <label htmlFor="origin" className="d-flex">
                  Origin
                </label>
                <input
                  type="text"
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  // onKeyUp={() => searchCity(origin)}
                  className="form-control"
                  placeholder="Enter origin"
                />
              </div>
              <div className="col">
                <label htmlFor="destination" className="d-flex">
                  Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  // onKeyUp={() => searchCity(origin)}
                  className="form-control"
                  placeholder="Enter origin"
                />
              </div>
              <div className="col">
                <label htmlFor="departureDate" className="d-flex">
                  Departure Date
                </label>
                <input
                  type="date"
                  id="departureDate"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <button type="submit" className="mt-4 btn-success btn-lg">
              Check
            </button>
          </form>

          {busNotFound===false?<div className="table-responsive mt-4">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                <th scope="col">BUS_ID</th>
                  <th scope="col">BUS_NAME</th>
                  <th scope="col">BUS_NUMBER</th>
                  <th scope="col">BUS_TYPE</th>
                  <th scope="col">BUS_CAPACITY</th>
                  <th scope="col">AVAILABLE_SEATS</th>
                  <th scope="col">DEPT. Date</th>
                  <th scope="col">Arrival Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((item) => (
                  <tr>
                    <th scope="row">BRS{item.id}B</th>
                    <td>{item.name}</td>
                    <td>{item.number}</td>
                    <td>{item.type}</td>
                    <td>{item.capacity}</td>
                    <td>{item.available}</td>
                    <td>{item.departureDate}</td>
                    <td>{item.arrivalDate}</td>
                    <td>
                      <button onClick={()=>addPassengers(item)} className="btn btn-warning">
                        Add Passengers
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>:null}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
