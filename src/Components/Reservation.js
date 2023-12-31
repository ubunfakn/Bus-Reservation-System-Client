import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import "react-toastify/dist/ReactToastify.css";

export default function Reservation() {
  const [date, setDate] = useState();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const Navigate = useNavigate("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // eslint-disable-next-line
  const searchCity = (val) => {
    console.log(val);
    fetch(``)
      .then((resolve) => {
        resolve
          .json()
          .then((data) => {})
          .catch((error) => {
            // console.log(error);
          });
      })
      .catch((error) => {
        // console.log(error);
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
            // console.log(resolve.status);
            resolve
              .json()
              .then((buses) => {
                Navigate("/searchbuses", {
                  state: {
                    statusOfSearch: true,
                    origin:origin,
                    destination:destination,
                    date:date,
                    buses:buses,
                  },
                });
              })
              .catch((error) => {
                toast.error("Please try later", toastOptions);
              });
          } else {
            // console.log(resolve.status);
            Navigate("/searchbuses", {
              state: { statusOfSearch: false, origin, destination, date },
            });
          }
        })
        .catch((error) => {
          toast.error("Please try later", toastOptions);
        });
    }
  };

  const handleValidation = () => {
    if (!validator.isDate(date)) {
      toast.error("Please enter Date in dd/mm/yyyy format", toastOptions);
      return false;
    } else if (origin === "") {
      toast.error("Please Enter Origin", toastOptions);
      return false;
    } else if (destination === "") {
      toast.error("Please Enter Destination", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <div className="col-md-4 offset-md-1">
        <div className="card mb-5 text-white">
          <div className="card-title mt-2">
            <h1 className="font-weight-bold">Search Buses</h1>
          </div>
          <div className="card-body">
            <form
              onSubmit={getData}
              className="mr-5 ml-5 font-weight-bold"
              action=""
            >
              <div className="form-group">
                <label className="d-flex" htmlFor="date">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Enter Journey Date"
                  type="date"
                  className="form-control"
                />
                <label className="d-flex mt-4" htmlFor="origin">
                  Origin
                </label>
                <input
                  id="origin"
                  name="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  // onKeyUp={() => searchCity(origin)}
                  placeholder="Enter Origin"
                  type="text"
                  className="form-control"
                />
                <label className="d-flex mt-4" htmlFor="destination">
                  Destination
                </label>
                <input
                  id="destination"
                  name="destination"
                  onChange={(e) => setDestination(e.target.value)}
                  value={destination}
                  // onKeyUp={() => searchCity(destination)}
                  placeholder="Enter Destination"
                  type="text"
                  className="form-control"
                />
              </div>
              <button className="btn btn-lg btn-success mt-3" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
