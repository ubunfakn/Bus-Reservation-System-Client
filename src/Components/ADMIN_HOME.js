import React from "react";

export default function ADMIN_HOME() {
  return (
    <div className="col-md-10 offset-md-1">
      <div className="card">
        <div className="card-title mt-3">
          <i className="fa-sharp fa-solid fa-user-secret fa-3x"></i>
          <h1 className="mb-4">ADMIN PANEL</h1>
        </div>
        <div className="card-body mt-5">
          <div className="row">
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-users fa-6x"></i>
                  <h2 className="text-center mt-4">4</h2>
                  <button className="btn btn-warning btn-block">
                    Customers
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-ticket fa-6x"></i>
                  <h2 className="text-center mt-4">8</h2>
                  <button className="btn btn-warning btn-block text-white">
                    Bookings
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-bus fa-6x"></i>
                  <h2 className="text-center mt-4">2</h2>
                  <button className="btn btn-warning btn-block">Buses</button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-road fa-6x"></i>
                  <h2 className="text-center mt-4">2</h2>
                  <button className="btn btn-warning btn-block">Routes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-money-bill fa-6x"></i>
                  <h2 className="text-center mt-4">19</h2>
                  <button className="btn btn-warning btn-block">
                    Transactions
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-users-viewfinder fa-6x"></i>
                  <h2 className="text-center mt-4">2</h2>
                  <button className="btn btn-warning btn-block">Users</button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-sharp fa-solid fa-bus fa-6x"></i>
                  <i className="fa-light fa-plus fa-6x"></i>
                  <button className="btn btn-success btn-block mt-4">
                    Add Bus
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-sharp fa-solid fa-route fa-6x"></i>
                  <i className="fa-light fa-plus fa-6x"></i>
                  <button className="btn btn-success btn-block mt-4">
                    Add Route
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-sharp fa-solid fa-bus fa-6x"></i>
                  <i className="fa-solid fa-pen-nib fa-3x"></i>
                  <button className="btn btn-block btn-primary mt-5">
                    Update Bus Details
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-sharp fa-solid fa-route fa-6x"></i>
                  <i className="fa-solid fa-pen-nib fa-3x"></i>
                  <button className="btn btn-block btn-primary mt-5">
                    Update Route Details
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-sharp fa-solid fa-bus fa-6x"></i>
                  <i className="fa-solid fa-xmark fa-5x"></i>
                  <button className="btn btn-block btn-danger mt-5">
                    Delete Bus
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-sharp fa-solid fa-route fa-6x"></i>
                  <i className="fa-solid fa-xmark fa-5x"></i>
                  <button className="btn btn-block btn-danger mt-5">
                    Delete Route
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-money-bill fa-6x"></i>
                  <i className="fa-solid fa-xmark fa-5x"></i>
                  <button className="btn btn-block btn-danger mt-5">
                    Delete Transaction
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card inside-card">
                <div className="card-body">
                  <i className="fa-solid fa-users fa-6x"></i>
                  <i className="fa-solid fa-xmark fa-5x"></i>
                  <button className="btn btn-block btn-danger mt-5">
                    Remove Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
