import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function BookingConfirmation() {
  const locationSate = useLocation().state;
  const [origin, setOrigin] = useState(
    locationSate.locationstate.locationState.locationState.origin
  );
  const [destination, setDestination] = useState(
    locationSate.locationstate.locationState.locationState.destination
  );
  const [boardingDate, setBoardingDate] = useState(
    locationSate.locationstate.locationState.bus.departureDate
  );
  const [arrivalDate, setArrivalDate] = useState(
    locationSate.locationstate.locationState.bus.arrivalDate
  );
  const [passenger, setPassenger] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [price, setPrice] = useState("");
  const [distance, setDistance] = useState("");
  const [pickUpPoint, setPickUpPoint] = useState("");
  const [dropOffPoint, setDropOffPoint] = useState("");
  const [pickUpTime, setPickUpTime] = useState();
  const [dropOffTime, setDropOffTime] = useState();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("Select Option");
  console.log();
  console.log(origin, destination);

  return (
    <div className="col-md-8 offset-md-2">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
