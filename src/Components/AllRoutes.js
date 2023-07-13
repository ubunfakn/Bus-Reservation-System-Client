import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllRoutes() {
  const [routes, setRoutes] = useState([]);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const Navigate = useNavigate("");

  const fetchRoutes = () => {
    fetch(`http://localhost:8080/auth/admin/api/routes`, {
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
              setRoutes(result);
            })
            .catch((error) => {
              console.log(error);
              toast.error(error, toastOptions);
            });
        } else {
          setRoutes([]);
          toast.error("No routes found", toastOptions);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, toastOptions);
      });
  };

  const update = (item) => {
    Navigate("/addroute", { state: item });
  };

  const deleteData = (id) => {
    fetch(`http://localhost:8080/auth/admin/api/deleteroute/${id}`, {
      method: "DELETE",
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
          toast.success("Route Deleted", toastOptions);
          fetchRoutes();
        } else {
          toast.error(
            "Something went wrong!! Please try again later",
            toastOptions
          );
        }
      })
      .catch((error) => {
        toast.error(
          "Something went wrong!! Please try again later",
          toastOptions
        );
      });
  };

  useEffect(() => {
    fetchRoutes();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-title mt-3">
          <h2 className="text-center">
            <strong>Routes</strong>
          </h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">ROUTE_ID</th>
                  <th scope="col">BUS_NUMBER</th>
                  <th scope="col">ORIGIN</th>
                  <th scope="col">DESTINATION</th>
                  <th scope="col">PICKUP_POINT</th>
                  <th scope="col">PICKUP_TIME</th>
                  <th scope="col">DROPOFF_PONT</th>
                  <th scope="col">DROPOFF_TIME</th>
                  <th scope="col">DISTANCE</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">BRS{item.id}R</th>
                    <td>{item.number}</td>
                    <td>{item.origin}</td>
                    <td>{item.destination}</td>
                    <td>{item.pickUpPoint}</td>
                    <td>{item.pickUpTime}</td>
                    <td>{item.dropOffPoint}</td>
                    <td>{item.dropOffTime}</td>
                    <td>{item.distance}</td>
                    <td>{item.price}</td>
                    <td>
                      <i
                        onClick={() => deleteData(item.id)}
                        className="btn btn-danger fa fa-delete-left mr-1"
                      ></i>
                      <i
                        onClick={() => update(item)}
                        className="btn btn-warning fa fa-pen-nib ml-1"
                      ></i>
                    </td>
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
