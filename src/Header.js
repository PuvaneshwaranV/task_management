import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './Logo.png';
import notify from './head4.svg';
import help from './head5.svg';
import profile from './Head6.png';
import SimpleButton from './Simplebutton';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

const Header = ({ heading, headingIcon, isLoginPage }) => {
  const [activeContent, setActiveContent] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const toggleContent = (content) => {
    setActiveContent((prevContent) => (prevContent === content ? null : content));
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Perform any logout logic here (e.g., clearing user session data)
    setShowLogoutModal(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  if (isLoginPage) {
    return (
      <header className="py-2" id="log">
        <div className="container d-flex align-items-center">
          <img src={logo} alt="Logo" className="me-2 rounded-circle" width="36" height="36" />
          <h1 className="mb-0 ms-1 text-light">Task Management</h1>
        </div>
      </header>
    );
  }

  return (
    <header className="py-2" id="ad">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Left: Logo */}
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="Center Icon"
            className="rounded-circle me-2"
            width="36"
            height="36"
          />
        </div>

        {/* Center: Dynamic Heading with Unicode icon */}
        <div className="d-flex align-items-center">
          {headingIcon && (
            <i className="icon me-2" style={{ fontSize: '24px' }}>
              {headingIcon}
            </i>
          )}
          <h4 className="mb-0 ms-1 text-light">{heading}</h4>
        </div>

        {/* Right: Icon buttons */}
        <div className="d-flex align-items-center">
          <div
            className="icon hover-effect"
            title="Notifications"
            onClick={() => toggleContent('notify')}
          >
            <img src={notify} alt="Notifications" />
          </div>
          <div
            className="icon hover-effect me-2"
            title="Help"
            onClick={() => toggleContent('help')}
          >
            <img src={help} alt="Help" />
          </div>
          <div
            className="icon hover-effect"
            title="Profile"
            onClick={() => toggleContent('profile')}
          >
            <img src={profile} alt="Profile" width={50} height={50} />
          </div>
        </div>
      </div>
      {activeContent === 'notify' && (
        <div
          id="pro"
          className="position-fixed top-8 end-0 mt-2 bg-light p-3 rounded shadow"
          style={{ zIndex: 1050 }}
        >
          <div id="nt1">
            <h4 style={{ color: 'black' }}>Notifications</h4>
          </div>
          <div id="n1" style={{ color: 'black' }}>
            <p>
              Hello! Puvaneshwaran Your Task A <br /> has a deadline on July 30, 2024,
              <br />
              please complete it within the deadline.
            </p>
            <p>
              You have been assigned a new Task 🥳, <br />
              please put your full effort into completing it.
            </p>
          </div>
        </div>
      )}
      {activeContent === 'help' && (
        <div
          className="position-fixed top-8 end-0 me-5 mt-2 bg-light p-3 rounded shadow"
          style={{ zIndex: 1050 }}
        >
          <div>
            <p>
              <a href="#">Features</a>
            </p>
            <p>
              <a href="#">Keyboard Shortcuts</a>
            </p>
            <p>
              <a href="#">What's New</a>
            </p>
            <p>
              <a href="#">Ask the community</a>
            </p>
            <p>
              <a href="#">Feature Request</a>
            </p>
            <p>
              <a href="#">Contact Us</a>
            </p>
            <p>
              <a href="#">Help Center</a>
            </p>
          </div>
        </div>
      )}

      {/* Profile content */}
      {activeContent === 'profile' && (
        <div
          id="pro"
          className="position-fixed top-8 end-0 mt-2 me-2 bg-light p-3 rounded shadow"
          style={{ zIndex: 1050 }}
        >
          <div id="pro1" className="text-center text-dark">
            <img src={profile} alt="Profile" width="100" height="100" />
            <p>Elon Musk</p>
            <p>admin@gmail.com</p>
            <p>Admin</p>
          </div>
          <p>
            <a href="#">Account</a>
          </p>
          <p>
            <a href="#">My Team</a>
          </p>
          <p>
            <a href="#">Appearance</a>
          </p>
          <p>
            <a href="#">Notifications</a>
          </p>
          <p>
            <a href="#">Help</a>
          </p>
          <p>
            <a href="#" onClick={handleLogout}>LogOut</a>
          </p>
        </div>
      )}

      <Modal show={showLogoutModal} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <SimpleButton label="Cancel" handleClick={cancelLogout} />
          <SimpleButton label="OK" handleClick={confirmLogout} />
        </Modal.Footer>
      </Modal>

      {/* Additional CSS for hover effects */}
      <style jsx>{`
        .hover-effect:hover {
          opacity: 0.7;
          cursor: pointer;
        }
      `}</style>
    </header>
  );
};

export default Header;
