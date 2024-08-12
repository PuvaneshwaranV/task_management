import React, { useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./HomePage";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Admin1 from "./Admin1";
import TeamMembers from "./TeamMembers";
import Admin2 from "./Admin2";
import Admin3 from "./Admin3";
import Admin4 from "./Admin4";
import Admin5 from "./Admin5";
import Admin6 from "./Admin6";
import Admin7 from "./Admin7";
import Admin8 from "./Admin8";
import Footer from "./Footer";
import Login from "./Login";
import ViewTasks from "./ViewTasks";
import EditTask from "./EditTask";
import SimpleButton from "./Simplebutton";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import BucketDetails from "./BucketDetails";
import CurrentTasks from "./CurrentTasks";
import PastTasks from "./PastTasks";
import ForgotPassword from "./ForgotPassword";
import { Provider } from "react-redux";
import "./App.css";

function App() {
  const [heading, setHeading] = useState("Task Management System");
  const [headingIcon, setHeadingIcon] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const teamMembers = useSelector((state) => state.teamMembers);

  const handleNavClick = (heading, headingIcon, path) => {
    setHeading(heading);
    setHeadingIcon(headingIcon);
    navigate(path);
  };

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setIsAdmin(email === "admin@gmail.com");
    setCurrentUser(email);
    if (email === "admin@gmail.com") {
      navigate("/admin8");
    } else {
      navigate("/current-tasks");
    }
  };

  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  return (
    <Provider store={store}>
      <div style={{ backgroundColor: "#B3B4BD", color: "#2C2E3A" }}>
        <Header heading={heading} headingIcon={headingIcon} isLoginPage={isLoginPage} />
        <div className="d-flex me-0">
          {!isLoginPage && isLoggedIn && <Sidebar onNavClick={handleNavClick} isAdmin={isAdmin} />}
          <div className="content w-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login onLogin={handleLogin} teamMembers={teamMembers} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/view-tasks" element={<ViewTasks />} />
              <Route path="/edit-task/:id" element={<EditTask />} />
              <Route path="/admin1" element={<Admin1 />} />
              <Route path="/team-members" element={<TeamMembers />} />
              <Route path="/admin2" element={<Admin2 />} />
              <Route path="/bucket-details" element={<BucketDetails />} />
              <Route path="/admin3" element={<Admin3 />} />
              <Route path="/admin4" element={<Admin4 />} />
              <Route path="/admin5" element={<Admin5 />} />
              <Route path="/admin6" element={<Admin6 />} />
              <Route path="/admin7" element={<Admin7 />} />
              <Route path="/admin8" element={<Admin8 />} />
              <Route path="/current-tasks" element={<CurrentTasks currentUser={currentUser} />} />
              <Route path="/past-tasks" element={<PastTasks currentUser={currentUser} />} />
            </Routes>
          </div>
        </div>
        {!isLoginPage && isLoggedIn && <Footer />}
      </div>
    </Provider>
  );
}

export default App;
