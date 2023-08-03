import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRazorpay from "react-razorpay";

export default function BookingConfirmation() {
  const [Razorpay] = useRazorpay();
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
  const [razorpay_payment_id, set_razorpay_payment_id] = useState("");
  const [razorpay_order_id, set_razorpay_order_id] = useState("");
  const [razorpay_signature, set_razorpay_signature] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [readOnly, setReadOnly] = useState();
  const [displayBookingId, setDisplayBookingId] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  console.log(razorpay_order_id,razorpay_payment_id,razorpay_signature);

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
        passengers: passenger,
        busType: type,
        totalPrice: totalPrice,
        status: "Pending",
      };
      fetch(`http://localhost:8080/auth/api/savebooking`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        body: JSON.stringify({
          bookings,
          customer,
          passenger,
          seat: selectedSeats,
        }),
      })
        .then((resolve) => {
          if (resolve.status === 200) {
            resolve
              .json()
              .then((result) => {
                console.log("Bookings saved");
                fetchOrder(result);
              })
              .catch((error) => {
                console.log(error);
                toast.error(error + " Please try again later...", toastOptions);
              });
          } else {
            toast.error(
              "Failed saving data!! Please try again later...",
              toastOptions
            );
          }
        })
        .catch((error) => {
          toast.error(error + " Please try again later...", toastOptions);
        });
    }
  };

  const handlePaymentFailure = () => {
    console.log("Payment failed");
    toast.error("Sorry!! Payment Failed ", toastOptions);
  };

  const fetchOrder = (data) => {
    const options = {
      key: "rzp_test_5SKZYSprPJkNCr", // Enter the Key ID generated from the Dashboard
      amount: totalPrice, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "CHALO YATRI",
      description: "Booking Payment",
      order_id: data.id,
      handler: function (response) {
        set_razorpay_order_id(response.razorpay_payment_id);
        set_razorpay_payment_id(response.razorpay_order_id);
        set_razorpay_signature(response.razorpay_signature);
        updatePaymentOnServer(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        );
      },
      modal: {
        ondismiss: handlePaymentFailure,
      },
      prefill: {
        name: "Ankit",
        email: "ankit2003nashine@gmail.com",
        contact: "8602185525",
      },
      notes: {
        address: "UBUNFAKN",
      },
      theme: {
        color: "#3399cc",
      },
    };

    let razorpay = new Razorpay(options);
    razorpay.open();
  };

  const updatePaymentOnServer = (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature
  ) => {
    console.log("Updating payment");
    console.log(razorpay_payment_id, razorpay_order_id, razorpay_signature);
    fetch(`http://localhost:8080/auth/api/paymentupdate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        paymentStatus: "paid",
      }),
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          resolve
            .json()
            .then((result) => {
              console.log("Booking_id: " + result);
              setBookingId(result);
              setReadOnly(true);
              setPaymentSuccess(true);
              setDisplayBookingId(true);
              toast.success(
                "Payment Successful.... Enjoy your trip",
                toastOptions
              );
            })
            .catch((error) => {
              toast.error(
                "Error saving data!! You dont worry we will update ou soon"
              );
            });
        }
      })
      .catch((error) => {
        toast.error(
          "Error saving data!! You dont worry we will update ou soon"
        );
      });
    console.log(razorpay_order_id);
    console.log(razorpay_payment_id);
    console.log(razorpay_signature);
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
        {displayBookingId === true ? (
          <div className="card-title mt-4">
            <h1>Bus-Ticket</h1>
          </div>
        ) : null}
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
          {displayBookingId === true ? (
            <div className="container mt-3">
              <h2>Booking id: <strong>{booking_id}</strong></h2>
            </div>
          ) : null}
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
                    <td>Rs.{totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row mt-5">
              <h3>
                Total Fare:{" "}
                <strong>
                  <i>Rs.{totalPrice*passenger.length}</i>
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
                  readOnly={readOnly}
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
                  readOnly={readOnly}
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
                  readOnly={readOnly}
                  name="mobile"
                  id="mobile"
                  placeholder="Please enter your mobile no."
                />
              </div>
            </div>
          </div>
          {paymentSuccess === false ? (
            <div className="d-inline">
              <button onClick={payment} className="btn btn-success btn-lg mt-3">
                Proceed to pay
              </button>
            </div>
          ) : (
            <div className="d-flex offset-md-4">
              <i className="fa-solid fa-check fa-2x"></i>
              <h3>Enjoy your trip....</h3>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
