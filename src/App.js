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
import ETicketTandC from './Components/ETicketTandC';
import ForgotPassword from './Components/ForgotPassword';
import PageNotFound from "./Components/PageNotFound";


function App() {
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
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
