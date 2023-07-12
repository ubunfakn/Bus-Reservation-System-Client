import React, { useEffect, useState } from "react";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function ADD_ROUTE() {
  const [id, setId] = useState(undefined);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [pickUpPoint, setPickUpPoint] = useState("");
  const [dropOffPoint, setDropOffPoint] = useState("");
  const [pickUpTime, setPickUpTime] = useState();
  const [dropOffTime, setDropOffTime] = useState();
  const [number, setNumber] = useState("");
  const state = useLocation().state;
  const [isUpdate, setIsUpdate] = useState(false);
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
        origin,
        destination,
        pickUpPoint,
        pickUpTime,
        dropOffPoint,
        dropOffTime,
      };
      const updateData = {
        id,
        origin,
        destination,
        number,
        pickUpPoint,
        pickUpTime,
        dropOffPoint,
        dropOffTime,
      }
      fetch(`http://localhost:8080/auth/admin/api/addroute`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "bus-reservation-system-token"
          )}`,
        },
        body: JSON.stringify(isUpdate===true?updateData:data),
      })
        .then((resolve) => {
          console.log(resolve);
          resolve
            .json()
            .then((resultJson) => {
              if (resolve.status === 200) {
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

  const updateData = ()=>{
    setPickUpPoint(state.pickUpPoint);
    setDropOffPoint(state.dropOffPoint);
    setDropOffTime(state.dropOffTime);
    setPickUpTime(state.pickUpTime);
    setNumber(state.number);
    setOrigin(state.origin);
    setDestination(state.destination);
    setId(state.id);
  }

  useEffect(()=>{
    if(state!==null){
      setIsUpdate(true);
      updateData();
    }else{
      setIsUpdate(false);
    }
    // eslint-disable-next-line
  },[])

  const handleValidation = () => {
    if (
      number === "" ||
      pickUpTime === undefined ||
      dropOffTime === undefined ||
      pickUpPoint === "" ||
      origin === "" ||
      destination === "" ||
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
            {isUpdate===false?<h1>Add-Route</h1>:<h1>Update-Route</h1>}
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

              <div className="row">
                {/* Origin  */}
                <div className="col">
                  <lable className="d-flex" htmlFor="origin">
                    Origin
                  </lable>
                  <input
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter Origin"
                    id="origin"
                  />
                </div>
                {/* Origin  */}
                {/* Destination  */}
                <div className="col">
                  <lable className="d-flex" htmlFor="destination">
                    Destination
                  </lable>
                  <input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter Destination"
                    id="destination"
                  />
                </div>
                {/* Destination  */}
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
                    placeholder="Enter Pickup point"
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
                    placeholder="Enter Dropoff point"
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
                {isUpdate===false?"Add-Route":"Update-Route"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
