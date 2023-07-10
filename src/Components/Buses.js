import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Buses() {

    const [buses, setBuses] = useState([]);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 6500,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const fetchBuses = ()=>{
        fetch(`http://localhost:8080/api/buses`,{
            method: 'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                Authorization:`Bearer ${localStorage.getItem('bus-reservation-system-token')}`
            }
        }).then((resolve)=>{
            resolve.json().then((result)=>{
                if(result.status === 200){
                    setBuses(result.buses);
                }else{
                    toast.error(result.message,toastOptions);
                }
            }).catch((error)=>{
                toast.error(error, toastOptions);
            });
        }).catch((error)=>{
            toast.error(error, toastOptions);
        });
    }

    useEffect(()=>{
        fetchBuses();
    })
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
                  <th scope="col">DEPT. Date</th>
                  <th scope="col">Arrival Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((item)=>
                    <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.number}</td>
                    <td>{item.type}</td>
                    <td>{item.capacity}</td>
                    <td>{item.deptDate}</td>
                    <td>{item.arrDate}</td>
                    <td>
                        <i className="btn btn-danger fa fa-delete-left mr-1"></i>
                        <i className="btn btn-warning fa fa-pen-nib ml-1"></i>
                    </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
