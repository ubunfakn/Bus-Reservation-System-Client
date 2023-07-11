import React, { useEffect, useState } from "react";
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

    const fetchRoutes = ()=>{
        fetch(`http://localhost:8080/auth/admin/api/routes`,{
            method: 'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                Authorization:`Bearer ${localStorage.getItem('bus-reservation-system-token')}`
            }
        }).then((resolve)=>{
            resolve.json().then((result)=>{
                if(result.status === 200){
                    setRoutes(result.routes);
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
        fetchRoutes();
    })
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
                  <th scope="col">PICKUP_POINT</th>
                  <th scope="col">PICKUP_TIME</th>
                  <th scope="col">DROPOFF_PONT</th>
                  <th scope="col">DROPOFF_TIME</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((item)=>
                    <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.number}</td>
                    <td>{item.pickupPoint}</td>
                    <td>{item.pickupTime}</td>
                    <td>{item.dropoffPoint}</td>
                    <td>{item.dropoffTime}</td>
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
