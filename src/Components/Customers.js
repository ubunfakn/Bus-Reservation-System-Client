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

    const fetchCustomers = ()=>{
        fetch(`http://localhost:8080/api/customers`,{
            method: 'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                Authorization:`Bearer ${localStorage.getItem('bus-reservation-system-token')}`
            }
        }).then((resolve)=>{
            resolve.json().then((result)=>{
                if(result.status === 200){
                    setCustomers(result.routes);
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
        fetchCustomers();
    })
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
                  <th scope="col">Name</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((item)=>
                    <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.mobile}</td>
                    <td>{item.email}</td>
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
