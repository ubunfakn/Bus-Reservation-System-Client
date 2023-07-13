import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import "react-toastify/dist/ReactToastify.css";

export default function AddPassengers() {
  const locationState = useLocation().state;
  const [passenger] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(undefined);
  const [gender, setGender] = useState("");
  const [displayForm, setDisplayForm] = useState(true);
  const [displayPassenger, setDisplayPassenger] = useState(false);
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
      passenger.push({ name, age, gender });
      console.log(passenger);
      setDisplayForm(false);
      setName("");
      setAge(undefined);
      setGender("");
      setDisplayPassenger(true);
    }
  };

  const handleValidation = () => {
    if (name === "" || age === undefined || gender === "") {
      toast.error("Fields cannot be empty", toastOptions);
      return false;
    } else if (!validator.isNumeric(age)) {
      toast.error("Please enter correct age", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const deletePassenger = (id) => {
    passenger.splice(id, 1);
    setDisplayForm(!displayForm);
  };

  return (
    <div className="col-md-10 offset-md-1">
      <div className="card">
        <div className="card-title">
          <h1 className="mt-3">Add Passengers</h1>
        </div>
        {displayPassenger === true ? (
          <div className="card-body">
            <h2 className="d-flex">Passengers</h2>
            <div className="table-responsive">
              <table className="table table-striped table-dark">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {passenger.map((item, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.gender}</td>
                      <td>
                        <button
                          onClick={() => deletePassenger(i)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="d-flex">
                <button
                  onClick={() => setDisplayForm(true)}
                  type="submit"
                  className="btn btn-warning btn-lg ml-3"
                >
                  Add another
                </button>
                <button
                  onClick={() =>
                    Navigate("/selectseat", {
                      state: { locationState, passenger },
                    })
                  }
                  type="submit"
                  className="btn btn-success btn-lg ml-3"
                >
                  Select Seats
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {displayForm === true ? (
          <div className="card-body">
            <form onSubmit={getData}>
              <div className="row">
                {/* Passenger Name  */}
                <div className="col">
                  <label htmlFor="name" className="d-flex">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    className="form-control"
                  />
                </div>
                {/* Passenger Name  */}
              </div>
              <div className="row mt-3">
                {/* Passenger Age  */}
                <div className="col">
                  <label htmlFor="age" className="d-flex">
                    Age
                  </label>
                  <input
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    className="form-control"
                    id="age"
                  />
                </div>
                {/* Passenger Age  */}

                {/* Passenger Gender  */}
                <div className="col">
                  <label htmlFor="gender" className="d-flex">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                    id="gender"
                    className="form-control"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {/* Passenger Gender  */}
              </div>

              <div className="row mt-5">
                <div className="col">
                  <button
                    onClick={getData}
                    type="submit"
                    className="btn btn-success btn-lg mr-3"
                  >
                    Save Passenger
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
}
