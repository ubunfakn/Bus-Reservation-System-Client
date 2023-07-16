import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SelectSeat() {
  const locationstate = useLocation().state;
  const capacity = locationstate.locationState.bus.capacity;
  // eslint-disable-next-line
  const [unavailableSeat, setUnavailableSeat] = useState([]);
  const [availableSeat, setAvailableSeat] = useState();
  const [firstRow, setFirstRow] = useState([]);
  const [secondRow, setSecondRow] = useState([]);
  const [thirdRow, setThirdRow] = useState([]);
  const [fourthRow, setFourthRow] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [price, setPrice] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [route, setRoute] = useState();
  const number = locationstate.locationState.bus.number;
  const Navigate = useNavigate("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const fetchBus = () => {
    fetch(`http://localhost:8080/auth/api/getbus/${number}`, {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          resolve
            .json()
            .then((result) => {
              setAvailableSeat(capacity - result.length);
              for (let i = 0; i < result.length; i++) {
                unavailableSeat.push(result[i]);
              }
              unavailableSeat.slice(0, result.length);
            })
            .catch((error) => {
              toast.error(
                "Cannot fetch seats latest update...Something went wrong from our end!! Please try later",
                toastOptions
              );
            });
        } else {
          unavailableSeat.push(0);
        }
      })
      .catch((error) => {
        toast.error(
          "Cannot fetch seats latest update...Something went wrong from our end!! Please try later",
          toastOptions
        );
      });
  };

  const fetchPrice = () => {
    fetch(`http://localhost:8080/auth/api/getprice/${number}`, {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          resolve
            .json()
            .then((result) => {
              setPrice(result.price);
              setRoute(result);
            })
            .catch((error) => {
              toast.error(
                "Cannot fetch price...Something went wrong from our end!! Please try later",
                toastOptions
              );
            });
        } else {
          toast.error(
            "Cannot fetch price...Something went wrong from our end!! Please try later",
            toastOptions
          );
        }
      })
      .catch((error) => {
        toast.error(
          "Cannot fetch price...Something went wrong from our end!! Please try later",
          toastOptions
        );
      });
  };

  const handleSeat = (seat) => {
    if (!selectedSeats.includes(seat)) {
      selectedSeats.push(seat);
    } else {
      selectedSeats.splice(selectedSeats.indexOf(seat), 1);
    }
    console.log(selectedSeats);
    setTotalPrice(price * selectedSeats.length);
    setSelectedSeats((selectedSeats) => [...selectedSeats]);
  };

  const booking = () => {
    if (locationstate.passenger.length === selectedSeats.length) {
      Navigate("/bookingconfirmation", {
        state: { locationstate, selectedSeats, route },
      });
    } else {
      toast.error(
        "Passenger count and seat selected dosen't match",
        toastOptions
      );
    }
  };

  useEffect(() => {
    fetchBus();
    fetchPrice();
    for (let i = 0; i < Math.ceil(capacity / 4); i++) {
      firstRow.push(i + 1);
      secondRow.push(2 + i + Math.floor(capacity / 4));
      thirdRow.push(i + 1 + Math.floor(capacity / 4) * 2);
      fourthRow.push(i + 2 + Math.floor(capacity / 4) * 3);
      setFirstRow(firstRow.slice(0, Math.ceil(capacity / 4)));
      setSecondRow(secondRow.slice(0, Math.ceil(capacity / 4)));
      setThirdRow(thirdRow.slice(0, Math.ceil(capacity / 4)-1));
      setFourthRow(fourthRow.slice(0, Math.ceil(capacity / 4)-1));
    }
    // eslint-disable-next-line
  }, []);
  console.log();
  return (
    <div className="col-md-10 offset-md-1">
      <div className="card">
        <div className="card-title">
          <h1 className="mt-3">Seat Selection</h1>
        </div>
        <div className="card-body text-center">
          <div className="row">
            <div className="col">
              <h3>Capacity: {capacity}</h3>
            </div>
            <div className="col">
              <h3>Price-Per-Ticket: {price}</h3>
            </div>
            <div className="col">
              <h3>Total-Price: {totalPrice}</h3>
            </div>
            <div className="col">
              <h3>Available: {availableSeat}</h3>
            </div>
          </div>
          <br />

          {/* */}
          <h1>
            Selected Seats:{" "}
            {selectedSeats.map((item) => (
              <em>{item}, </em>
            ))}
          </h1>
          <button onClick={booking} className="btn btn-danger btn-lg mr-4">
            Go for booking
          </button>
          <br />
          <br />
          <div className="table-responsive">
            <div className="col-md-6 offset-md-1">
              <ul className="d-flex text-white">
                {firstRow.map((item) =>
                  unavailableSeat.includes(item) === false ? (
                    <li
                      onClick={() => handleSeat(item)}
                      className="d-inline-block seat-list"
                    >
                      {item}
                    </li>
                  ) : (
                    <li
                      style={{ backgroundColor: "red" }}
                      className="d-inline-block seat-list"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
              <ul className="d-flex text-white">
                {secondRow.map((item) =>
                  unavailableSeat.includes(item) === false ? (
                    <li
                      onClick={() => handleSeat(item)}
                      className="d-inline-block seat-list"
                    >
                      {item}
                    </li>
                  ) : (
                    <li
                      style={{ backgroundColor: "red" }}
                      className="d-inline-block seat-list"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
              <br />
              <br />
              <ul className="d-flex text-white">
                {thirdRow.map((item) =>
                  unavailableSeat.includes(item) === false ? (
                    <li
                      onClick={() => handleSeat(item)}
                      className="d-inline-block seat-list"
                    >
                      {item}
                    </li>
                  ) : (
                    <li
                      style={{ backgroundColor: "red" }}
                      className="d-inline-block seat-list"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
              <ul className="d-flex text-white">
                {fourthRow.map((item) =>
                  unavailableSeat.includes(item) === false ? (
                    <li
                      onClick={() => handleSeat(item)}
                      className="d-inline-block seat-list"
                    >
                      {item}
                    </li>
                  ) : (
                    <li
                      style={{ backgroundColor: "red" }}
                      className="d-inline-block seat-list"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
