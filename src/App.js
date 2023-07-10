import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigationbar from "./Components/Common/Navigationbar";
import Reservation from "./Components/Reservation";
import ViewTicket from "./Components/ViewTicket";
import CancelTicket from "./Components/CancelTicket";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Footer from "./Components/Common/Footer";
import About from "./Components/About";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import FailedTransactions from "./Components/FailedTransactions";
import Faq from "./Components/Faq";
import Features from "./Components/Features";
import Feedback from "./Components/Feedback";
import ChangePassword from "./Components/ChangePassword";
import Disclaimer from "./Components/Disclaimer";
import ETicketTandC from "./Components/ETicketTandC";
import ForgotPassword from "./Components/ForgotPassword";
import ADMIN_HOME from "./Components/ADMIN_HOME";
import { useEffect, useState } from "react";
import ADD_BUS from "./Components/ADD_BUS";
import ADD_ROUTE from "./Components/ADD_ROUTE";
import Profile from "./Components/Profile";
import Bookings from "./Components/Bookings";
import AllRoutes from './Components/AllRoutes';
import Buses from "./Components/Buses";
import Users from "./Components/Users";
import Customers from './Components/Customers';
import SearchBus from "./Components/SearchBus";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  // eslint-disable-next-line
  useEffect(() => {
    if (!localStorage.getItem("bus-reservation-system-token")) {
      setIsAdmin(false);
      setIsUser(false);
    } else {
      if (
        localStorage.getItem("bus-reservation-system-role") === "ROLE_ADMIN"
      ) {
        setIsAdmin(true);
        setIsUser(false);
      } else if (
        localStorage.getItem("bus-reservation-system-role" === "ROLE_USER")
      ) {
        setIsAdmin(false);
        setIsUser(true);
      }
    }
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Reservation />}></Route>
          <Route path="/view" element={<ViewTicket />} />
          <Route path="/cancel" element={<CancelTicket />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/failed" element={<FailedTransactions />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/features" element={<Features />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/e_tandc" element={<ETicketTandC />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/change" element={<ChangePassword />} />
          <Route path="/searchbuses" element={<SearchBus />} />
        </Routes>
        {isAdmin === true ? (
          <Routes>
            <Route path="/admin" element={<ADMIN_HOME />} />
            <Route path="/addbus" element={<ADD_BUS />} />
            <Route path="/addroute" element={<ADD_ROUTE />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/routes" element={<AllRoutes />} />
            <Route path="/buses" element={<Buses />} />
            <Route path="/users" element={<Users />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        ) : null}
        {isUser === true?(
          <Routes>
            <Route path="/user"/>
          </Routes>
        ):null}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
