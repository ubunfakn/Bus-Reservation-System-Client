import React, { useState } from "react";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function ADD_ROUTE() {
  const [pickUpPoint, setPickUpPoint] = useState("");
  const [dropOffPoint, setDropOffPoint] = useState("");
  const [pickUpTime, setPickUpTime] = useState();
  const [dropOffTime, setDropOffTime] = useState();
  const [number, setNumber] = useState("");
  const Navigate = useNavigate("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const getData = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const data = {
        number,
        pickUpPoint,
        pickUpTime,
        dropOffPoint,
        dropOffTime,
      };
      fetch(`http://localhost:8080/api/admin/addroute`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "bus-reservation-system-token"
          )}`,
        },
        body: JSON.stringify(data),
      })
        .then((resolve) => {
          resolve
            .json()
            .then((resultJson) => {
              if (resultJson.status === 200) {
                console.log(resultJson);
                Navigate("/routes");
              } else {
                toast.error(resultJson.message, toastOptions);
              }
            })
            .catch((error) => {
              toast.error(error + " Please try again later...", toastOptions);
            });
        })
        .catch((error) => {
          toast.error(error + " Please try again later...", toastOptions);
        });
    }
  };

  const handleValidation = () => {
    if (
      number === "" ||
      pickUpTime === undefined ||
      dropOffTime === undefined ||
      pickUpPoint === "" ||
      dropOffPoint === ""
    ) {
      toast.error("Fields cannot be empty", toastOptions);
      return false;
    } else if (
      !validator.isTime(pickUpTime) ||
      !validator.isTime(dropOffTime)
    ) {
      toast.error("Please enter valid Time", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="col-md-4 offset-md-1">
      <div className="card mb-5 text-white">
        <div className="card-title mt-4">
          <div className="font-weight-bold">
            <h1>Add-Route</h1>
          </div>
          <div className="card-body">
            <form onSubmit={getData}>
              <div className="row">
                {/* Bus-Number  */}
                <div className="col">
                  <lable className="d-flex" htmlFor="number">
                    Bus-Number
                  </lable>
                  <input
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter Bus Number"
                    id="number"
                  />
                </div>
                {/* Bus-Number  */}
              </div>

              <div className="row mt-3">
                {/* Pickup-Point  */}
                <div className="col">
                  <label htmlFor="pickup-point" className="d-flex">
                    Pickup-Point
                  </label>
                  <input
                    id="pickup-point"
                    type="text"
                    name="pickup-point"
                    value={pickUpPoint}
                    onChange={(e) => setPickUpPoint(e.target.value)}
                    className="form-control"
                  />
                </div>
                {/* Pickup-Point  */}

                {/* pickup-Time  */}
                <div className="col">
                  <lable className="d-flex" htmlFor="pickup-time">
                    Pickup-Time
                  </lable>
                  <input
                    type="time"
                    value={pickUpTime}
                    onChange={(e) => setPickUpTime(e.target.value)}
                    className="form-control"
                    name="pickup-time"
                    id="pickup-time"
                  />
                </div>
                {/* Pickup-Time  */}
              </div>

              <div className="row mt-3">
                {/* Dropoff-Point  */}
                <div className="col">
                  <label htmlFor="dropoff-point" className="d-flex">
                    Dropoff-Point
                  </label>
                  <input
                    id="dropoff-point"
                    type="text"
                    name="dropoff-point"
                    value={dropOffPoint}
                    onChange={(e) => setDropOffPoint(e.target.value)}
                    className="form-control"
                  />
                </div>
                {/* Dropoff-Point  */}

                {/* Dropoff-Time  */}
                <div className="col">
                  <lable className="d-flex" htmlFor="dropoff-time">
                    Dropoff-Time
                  </lable>
                  <input
                    type="time"
                    value={dropOffTime}
                    onChange={(e) => setDropOffTime(e.target.value)}
                    className="form-control"
                    id="dropoff-time"
                    name="dropoff-time"
                  />
                </div>
                {/* Dropoff-Time  */}
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Add-Route
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
