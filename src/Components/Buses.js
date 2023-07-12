import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Buses() {
  const [buses, setBuses] = useState([]);
  const Navigate = useNavigate("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const fetchBuses = () => {
    fetch(`http://localhost:8080/auth/admin/api/buses`, {
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
              setBuses(result);
            })
            .catch((error) => {
              console.log(error);
              toast.error(error, toastOptions);
            });
        } else {
          setBuses([]);
          toast.error("No buses found", toastOptions);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, toastOptions);
      });
  };

  const update = (item)=>{
    Navigate("/addbus",{state:item});
  }

  const deleteData = (id)=>{
    fetch(`http://localhost:8080/auth/admin/api/deletebus/${id}`,{
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "bus-reservation-system-token"
        )}`,
      },
    }).then((resolve)=>{
      if(resolve.status === 200){
        toast.success("Bus Deleted", toastOptions);
        fetchBuses();
      }else{
        toast.error("Something went wrong!! Please try again later", toastOptions);
      }
    }).catch((error)=>{
      toast.error("Something went wrong!! Please try again later", toastOptions)
    })
  }

  useEffect(() => {
    fetchBuses();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="col-md-12">
      <div className="card">
        <div className="card-title mt-3">
          <h2 className="text-center">
            <strong>Buses</strong>
          </h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">BUS_ID</th>
                  <th scope="col">BUS_NAME</th>
                  <th scope="col">BUS_NUMBER</th>
                  <th scope="col">BUS_TYPE</th>
                  <th scope="col">BUS_CAPACITY</th>
                  <th scope="col">AVAILABLE_SEATS</th>
                  <th scope="col">DEPT. Date</th>
                  <th scope="col">Arrival Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">BRS{item.id}B</th>
                    <td>{item.name}</td>
                    <td>{item.number}</td>
                    <td>{item.type}</td>
                    <td>{item.capacity}</td>
                    <td>{item.available}</td>
                    <td>{item.departureDate}</td>
                    <td>{item.arrivalDate}</td>
                    <td>
                      <i onClick={()=>deleteData(item.id)} className="btn btn-danger fa fa-delete-left mr-1"></i>
                      <i onClick={()=>update(item)} className="btn btn-warning fa fa-pen-nib ml-1"></i>
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
