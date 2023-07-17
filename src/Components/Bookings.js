import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Bookings() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [data, setData] = useState([]);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  // const [data, setData] = useState();

  const fetchBookings = () => {
    fetch(`http://localhost:8080/auth/admin/api/bookings`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "bus-reservation-system-token"
        )}`,
      },
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          resolve
            .json()
            .then((result) => {
              console.log(result, "result");
              setData(result);
            })
            .catch((error) => {
              console.log(error);
              toast.error(error, toastOptions);
            });
        } else {
          toast.error("No bookings found", toastOptions);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, toastOptions);
      });
  };

  const fetchBookingByUId = (email) => {
    fetch(`http://localhost:8080/auth/api/user/bookings`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "bus-reservation-system-token"
        )}`,
      },
      body: email,
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          resolve
            .json()
            .then((result) => {
              console.log(result, "result");
              setData(result);
            })
            .catch((error) => {
              console.log(error);
              toast.error(error, toastOptions);
            });
        } else {
          toast.error("No bookings found", toastOptions);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, toastOptions);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("bus-reservation-system-role") === "ROLE_ADMIN") {
      setIsAdmin(true);
      setIsUser(false);
      fetchBookings();
    } else if (
      localStorage.getItem("bus-reservation-system-role") === "ROLE_USER"
    ) {
      setIsAdmin(false);
      setIsUser(true);
      const email = localStorage.getItem("bus-reservation-system-user");
      fetchBookingByUId(email);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-title mt-3">
          <h2 className="text-center">
            <strong>Bookings</strong>
          </h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">BOOKING_ID</th>
                  <th scope="col">ORIGIN</th>
                  <th scope="col">DESTINATION</th>
                  <th scope="col">BUS_NUMBER</th>
                  <th scope="col">BOARDING_DATE</th>
                  <th scope="col">BUS_TYPE</th>
                  <th scope="col">PASSENGER_COUNT</th>
                  {isAdmin === true ? <th scope="col">CUSTOMER_ID</th> : null}
                  <th scope="col">E-MAIL</th>
                  <th scope="col">MOBILE</th>
                  <th scope="col">STATUS</th>
                  {isAdmin === true ? <th scope="col">ACTIONS</th> : null}
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr key={i}>
                    <td>{item.bookingId}</td>
                    <td>{item.origin}</td>
                    <td>{item.destination}</td>
                    <td>{item.busNumber}</td>
                    <td>{item.boardingDate}</td>
                    <td>{item.busType}</td>
                    <td>{item.passengerCount}</td>
                    {isAdmin === true ? <td>{item.cid}</td> : null}
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.status}</td>
                    {isAdmin == true ? (
                      <td>
                        <i className="btn btn-danger fa fa-delete-left mr-1"></i>
                        <i className="btn btn-warning fa fa-pen-nib ml-1"></i>
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
