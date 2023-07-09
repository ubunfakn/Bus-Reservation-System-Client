import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import "react-toastify/dist/ReactToastify.css";

export default function Feedback() {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [rating, setRating] = useState(0);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const getData = async (e) => {
    console.log("view ticket");
    e.preventDefault();
    if (handleValidation()) {
      const data = { name, email, rating, feedback };
      fetch(`http://localhost/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resolve) => {
          if (resolve.status === 200) {
            resolve
              .json()
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                toast.error(error + " Please Try again later!..", toastOptions);
              });
          } else {
            console.log(resolve);
            toast.error(resolve.body, toastOptions);
          }
        })
        .catch((error) => {
          toast.error(error + " Please Try again later!..", toastOptions);
        });
    }
  };
  const handleValidation = () => {
    if (email === null) {
      console.log("I am inside if if if");
      toast.error("Please Enter email", toastOptions);
      return false;
    } else if (!validator.isEmail(email)) {
      toast.error("Please enter Correct email Number", toastOptions);
      return false;
    } else if (name === null) {
      toast.error("Please enter your name", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  return (
    <div className="col-md-4 offset-md-1">
      <div className="card">
        <div className="card-title mt-3">
          <i className=""></i>
          <h1>Feedback</h1>
        </div>
        <div className="card-body">
          <form onSubmit={getData}>
            <div className="row">
              {/* Name Field  */}
              <div className="col">
                <label className="d-flex" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Full name"
                />
              </div>
              {/* Name Field  */}

              {/* Email Field  */}
              <div className="col">
                <label className="d-flex" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              {/* Email Field  */}
            </div>

            {/* Rating-Field  */}

            <div className="form-group">
              <label className="d-flex mt-3" htmlFor="rating">
                Rating
              </label>
              <div className="d-flex">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor={"orange"}
                />
              </div>
            </div>

            {/* Rating-Field  */}

            {/* Feedback-Text  */}
            <div className="form-group mt-2">
              <lable className="d-flex" htmlFor="feedback">
                Feedback
              </lable>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="form-control"
                name="message"
                id="message"
                cols="30"
                rows="6"
              ></textarea>
            </div>
            {/* Feedback-Text  */}

            <button className="btn btn-lg btn-success" type="submit">
              Send Feedback
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
