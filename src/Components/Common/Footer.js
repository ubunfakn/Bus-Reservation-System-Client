import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      {/* <!-- Footer --> */}
      <footer className="text-center text-white">
        {/* <!-- Grid container --> */}
        <div className="container p-4">
          {/* <!-- Section: Social media --> */}
          <section className="mb-4">
            {/* <!-- Instagram --> */}
            <Link
              className="btn btn-outline-light btn-floating m-1"
              to={"https://instagram.com/_i__am_ankit__"}
              target="blank"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </Link>

            {/* <!-- Linkedin --> */}
            <Link
              className="btn btn-outline-light btn-floating m-1"
              target="blank"
              to={"https://www.linkedin.com/in/ankit-kumar-nashine-17331a252/"}
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </Link>

            {/* <!-- Github --> */}
            <Link
              className="btn btn-outline-light btn-floating m-1"
              to={"https://github.com/ubunfakn"}
              target="blank"
              role="button"
            >
              <i className="fab fa-github"></i>
            </Link>
          </section>
          {/* <!-- Section: Social media --> */}

          {/* <!-- Section: Text --> */}
          <section className="mb-4">
            <p>
              Imagine the thrill of feeling the wind in your hair, while looking
              at the changing scenes from a window-seat, in a bus. Book your journey
              on <br /> <i className="fa fa-bus-alt"></i> CHALO Yatri in just few clicks
              and enjoy your trip.
            </p>
          </section>
          {/* <!-- Section: Text --> */}

          {/* <!-- Section: Links --> */}
          <section className="">
            {/* <!--Grid row--> */}
            <div className="row mt-5">
              {/* <!--Grid column--> */}
              <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to={"/"} className="text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={"/about"} className="text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to={"/privacy"} className="text-white">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <!--Grid column--> */}

              {/* <!--Grid column--> */}
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to={"/t_routes"} className="text-white">
                      Top Routes
                    </Link>
                  </li>
                  <li>
                    <Link to={"/failed"} className="text-white">
                      Failed Transactions
                    </Link>
                  </li>
                  <li>
                    <Link to={"/e_tandc"} className="text-white">
                      e-Ticket Terms&Conditions
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <!--Grid column--> */}

              {/* <!--Grid column--> */}
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to={"/faqs"} className="text-white">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link to={"/features"} className="text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link to={"/feedback"} className="text-white">
                      Feedback
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <!--Grid column--> */}
            </div>
            {/* <!--Grid row--> */}
          </section>
          {/* <!-- Section: Links --> */}
        </div>
        {/* <!-- Grid container --> */}

        {/* <!-- Copyright --> */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:
          <Link
            className="text-white"
            target="blank"
            to={"https://github.com/ubunfakn"}
          >
            CHALO Yatri
          </Link>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
    </div>
  );
}
