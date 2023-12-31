import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const fetchUsers = () => {
    fetch(`http://localhost:8080/auth/admin/api/users`, {
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
              setUsers(result);
            })
            .catch((error) => {
              console.log(error);
              toast.error(error, toastOptions);
            });
        } else {
          toast.error("No users found", toastOptions);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, toastOptions);
      });
  };

  useEffect(() => {
    fetchUsers();
  });
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-title mt-3">
          <h2 className="text-center">
            <strong>Users</strong>
          </h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">USER_ID</th>
                  <th scope="col">USER_NAME</th>
                  <th scope="col">USER_EMAIL</th>
                  <th scope="col">USER_MOBILE</th>
                  <th scope="col">USER_ROLE</th>
                  <th scope="col">USER_STATE</th>
                  <th scope="col">USER_COUNTRY</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">BRS{item.id}U</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.role}</td>
                    <td>{item.state}</td>
                    <td>{item.country}</td>
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
