import React, { useEffect, useState } from "react";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function ADD_BUS() {
  const [id, setId] = useState(undefined);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [capacity, setCapacity] = useState();
  const [type, setType] = useState("Select Option");
  const [departureDate, setDepartureDate] = useState();
  const [arrivalDate, setArrivalDate] = useState();
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState();
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
      departureDate.toString().split(11);
      departureDate.toString().split(11);
      const data = {
        name,
        number,
        capacity,
        type,
        departureDate,
        arrivalDate,
        description,
      };
      const updateData = {
        id,
        name,
        number,
        capacity,
        type,
        available,
        departureDate,
        arrivalDate,
        description,
      };
      const token = `Bearer ${localStorage.getItem(
        "bus-reservation-system-token"
      )}`;
      fetch(`http://localhost:8080/auth/admin/api/addbus`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          Authorization: token,
        },
        body: JSON.stringify(isUpdate === true ? updateData : data),
      })
        .then((resolve) => {
          resolve
            .json()
            .then((resultJson) => {
              if (resolve.status === 200) {
                console.log(resultJson);
                Navigate("/buses");
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
      name === "" ||
      number === "" ||
      capacity === undefined ||
      arrivalDate === undefined ||
      departureDate === undefined ||
      type === "Select Option"
    ) {
      toast.error("Fields cannot be empty", toastOptions);
      return false;
    } else if (
      !validator.isDate(departureDate) ||
      !validator.isDate(arrivalDate)
    ) {
      toast.error("Please enter valid Date", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const updateData = () => {
    setId(state.id);
    setArrivalDate(state.arrivalDate);
    setCapacity(state.capacity);
    setDepartureDate(state.departureDate);
    setDescription(state.description);
    setName(state.name);
    setAvailable(state.available);
    setNumber(state.number);
    setType(state.type);
  };

  useEffect(() => {
    if (state !== null) {
      setIsUpdate(true);
      updateData();
    } else {
      setIsUpdate(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="col-md-4 offset-md-1">
      <div className="card mb-5 text-white">
        <div className="card-title mt-4">
          <div className="font-weight-bold">
            {isUpdate === false ? <h1>Add-Bus</h1> : <h1>Update-Bus</h1>}
          </div>
          <div className="card-body">
            <form onSubmit={getData}>
              <div className="row">
                {/* Bus-Name  */}
                <div className="col">
                  <lable className="d-flex" htmlFor="name">
                    Bus-Name
                  </lable>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter Bus Name"
                    id="name"
                  />
                </div>
                {/* Bus-Name  */}

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
                {/* Bus-Type  */}
                <div className="col">
                  <lable className="d-flex" htmlFor="type">
                    Bus-Type
                  </lable>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="form-control"
                    name="type"
                    id="type"
                  >
                    <option>{type}</option>
                    <option>AC</option>
                    <option>Non-AC</option>
                  </select>
                </div>
                {/* Bus-Type  */}

                {/* Bus-Capacity  */}
                <div className="col">
                  <lable className="d-flex" htmlFor="capacity">
                    Bus-Capacity
                  </lable>
                  <input
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Enter Capacity"
                    id="capacity"
                  />
                </div>
                {/* Bus-Capacity  */}
              </div>

              <div className="row mt-3">
                {/* Departure-Date  */}
                <div className="col">
                  <lable className="d-flex" htmlFor="departure-date">
                    Departure-Date
                  </lable>
                  <input
                    type="date"
                    className="form-control"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    name="departure-date"
                    id="departure-date"
                  />
                </div>
                {/* Departure-Dtae  */}

                {/* Arraival-Date  */}
                <div className="col">
                  <lable className="d-flex" htmlFor="arrival-date">
                    Arrival-Date
                  </lable>
                  <input
                    type="date"
                    className="form-control"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    id="arrival-date"
                    name="arrival-date"
                  />
                </div>
                {/* Arrival-Date  */}
              </div>

              <div className="row mt-3">
                <div className="col">
                  <label htmlFor="description" className="d-flex">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    className="form-control"
                    cols="30"
                    rows="6"
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-4">
                {isUpdate === false ? "Add-Bus" : "Update-Bus"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
