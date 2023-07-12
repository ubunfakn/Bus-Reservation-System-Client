import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const fetchCustomers = () => {
    fetch(`http://localhost:8080/auth/admin/api/customers`, {
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
              setCustomers(result);
            })
            .catch((error) => {
              console.log(error);
              toast.error(error, toastOptions);
            });
        } else {
          setCustomers([]);
          toast.error("No customers found", toastOptions);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, toastOptions);
      });
  };

  const deleteData = (id) => {
    fetch(`http://localhost:8080/auth/admin/api/deletecustomer/${id}`, {
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
          toast.success("Customer Deleted", toastOptions);
          fetchCustomers();
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
    fetchCustomers();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-title mt-3">
          <h2 className="text-center">
            <strong>Customers</strong>
          </h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">BRS{item.id}C</th>
                    <td>{item.name}</td>
                    <td>{item.mobile}</td>
                    <td>{item.email}</td>
                    <td>
                      <i
                        onClick={() => deleteData(item.id)}
                        className="btn btn-danger fa fa-delete-left mr-1"
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
