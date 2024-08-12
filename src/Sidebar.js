import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar1.css";

const Sidebar = ({ onNavClick, isAdmin }) => {
  const [show, setShow] = useState(false);
  const [activeLink, setActiveLink] = useState("/"); // Set default active link if needed

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavClick = (heading, icon, path) => {
    onNavClick(heading, icon, path);
    setActiveLink(path);
    handleClose();
  };

  return (
    <div className="d-flex flex-column mt-0">
      <div className="sidebar d-none d-md-block">
        <h4 className="text-white ms-5">DASHBOARD</h4>
        <ul className="nav flex-column">
          {isAdmin ? (
            <>
              <li className="nav-item mt-4">
                <NavLink
                  className={`nav-link ${
                    activeLink === "/admin1" ? "bg-dark" : ""
                  }`}
                  to="/admin1"
                  onClick={() =>
                    handleNavClick("Create Tasks", "✔✔", "/admin1")
                  }
                >
                  <i className="icon">&#10003;&#10003;</i>Create Tasks
                </NavLink>
              </li>
              <li className="nav-item mt-4">
                <NavLink
                  className={`nav-link ${
                    activeLink === "/admin2" ? "bg-dark" : ""
                  }`}
                  to="/admin2"
                  onClick={() =>
                    handleNavClick("Add Team Members", "👤", "/admin2")
                  }
                >
                  <i className="icon">&#128100;</i>Add Team Members
                </NavLink>
              </li>
              <li className="nav-item mt-4">
                <NavLink
                  className={`nav-link ${
                    activeLink === "/admin3" ? "bg-dark" : ""
                  }`}
                  to="/admin3"
                  onClick={() => handleNavClick("Add Bucket", "🗑", "/admin3")}
                >
                  <i className="icon">&#128465;</i>Add Bucket
                </NavLink>
              </li>
              <li className="nav-item mt-4">
                <NavLink
                  className={`nav-link ${
                    activeLink === "/admin4" ? "bg-dark" : ""
                  }`}
                  to="/admin4"
                  onClick={() => handleNavClick("Task Status", "○", "/admin4")}
                >
                  <i className="icon">&#9675;</i>Task Status
                </NavLink>
              </li>
              <li className="nav-item mt-4">
                <NavLink
                  className={`nav-link ${
                    activeLink === "/admin5" ? "bg-dark" : ""
                  }`}
                  to="/admin5"
                  onClick={() =>
                    handleNavClick("Recently Created Tasks", "+", "/admin5")
                  }
                >
                  <i className="icon">&#43;</i>Recently Created Tasks
                </NavLink>
              </li>
              <li className="nav-item mt-4">
                <NavLink
                  className={`nav-link ${
                    activeLink === "/admin6" ? "bg-dark" : ""
                  }`}
                  to="/admin6"
                  onClick={() =>
                    handleNavClick("All Completed Tasks", "✔", "/admin6")
                  }
                >
                  <i className="icon">&#10004;</i>All Completed Tasks
                </NavLink>
              </li>
              <li className="nav-item mt-4">
                <NavLink
                  className={`nav-link ${
                    activeLink === "/admin7" ? "bg-dark" : ""
                  }`}
                  to="/admin7"
                  onClick={() =>
                    handleNavClick("All Due Tasks", "↻", "/admin7")
                  }
                >
                  <i className="icon">&#8635;</i>All Due Tasks
                </NavLink>
              </li>
              <li className="nav-item mt-4">
                <NavLink
                  className={`nav-link ${
                    activeLink === "/admin8" ? "bg-dark" : ""
                  }`}
                  to="/admin8"
                  onClick={() => handleNavClick("Analysis", "📈", "/admin8")}
                >
                  <i className="icon">&#x1F4C8;</i>Analysis
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item mt-4">
                <NavLink
                  className={`nav-link ${
                    activeLink === "/current-tasks" ? "bg-dark" : ""
                  }`}
                  to="/current-tasks"
                  onClick={() =>
                    handleNavClick("Current Tasks", "📋", "/current-tasks")
                  }
                >
                  <i className="icon">&#128221;</i>Current Tasks
                </NavLink>
              </li>
              <li className="nav-item mt-4">
                <NavLink
                  className={`nav-link ${
                    activeLink === "/past-tasks" ? "bg-dark" : ""
                  }`}
                  to="/past-tasks"
                  onClick={() =>
                    handleNavClick("Past Tasks", "📋", "/past-tasks")
                  }
                >
                  <i className="icon">&#128221;</i>Past Tasks
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="d-md-none">
      <Button variant="primary" onClick={handleShow}>
          View Reports
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reports</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className="nav flex-column">
              {isAdmin ? (
                <>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeLink === "/admin1" ? "bg-dark" : ""
                      }`}
                      href="#"
                      onClick={() =>
                        handleNavClick("Create Tasks", "✔✔", "/admin1")
                      }
                    >
                      <i className="icon">&#10003;&#10003;</i>Create Tasks
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeLink === "/admin2" ? "bg-dark" : ""
                      }`}
                      href="#"
                      onClick={() =>
                        handleNavClick("Add Team Members", "👤", "/admin2")
                      }
                    >
                      <i className="icon">&#128100;</i>Add Team Members
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeLink === "/admin3" ? "bg-dark" : ""
                      }`}
                      href="#"
                      onClick={() =>
                        handleNavClick("Add Bucket", "🗑", "/admin3")
                      }
                    >
                      <i className="icon">&#128465;</i>Add Bucket
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeLink === "/admin4" ? "bg-dark" : ""
                      }`}
                      href="#"
                      onClick={() =>
                        handleNavClick("Task Status", "○", "/admin4")
                      }
                    >
                      <i className="icon">&#9675;</i>Task Status
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeLink === "/admin5" ? "bg-dark" : ""
                      }`}
                      href="#"
                      onClick={() =>
                        handleNavClick("Recently Created Tasks", "+", "/admin5")
                      }
                    >
                      <i className="icon">&#43;</i>Recently Created Tasks
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeLink === "/admin6" ? "bg-dark" : ""
                      }`}
                      href="#"
                      onClick={() =>
                        handleNavClick("All Completed Tasks", "✔", "/admin6")
                      }
                    >
                      <i className="icon">&#10004;</i>All Completed Tasks
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeLink === "/admin7" ? "bg-dark" : ""
                      }`}
                      href="#"
                      onClick={() =>
                        handleNavClick("All Due Tasks", "↻", "/admin7")
                      }
                    >
                      <i className="icon">&#8635;</i>All Due Tasks
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeLink === "/admin8" ? "bg-dark" : ""
                      }`}
                      href="#"
                      onClick={() =>
                        handleNavClick("Analysis", "📈", "/admin8")
                      }
                    >
                      <i className="icon">&#x1F4C8;</i>Analysis
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mt-4">
                    <NavLink
                      className={`nav-link ${
                        activeLink === "/current-tasks" ? "bg-dark" : ""
                      }`}
                      to="/current-tasks"
                      onClick={() =>
                        handleNavClick("Current Tasks", "📋", "/current-tasks")
                      }
                    >
                      <i className="icon">&#128221;</i>Current Tasks
                    </NavLink>
                  </li>
                  <li className="nav-item mt-4">
                    <NavLink
                      className={`nav-link ${
                        activeLink === "/past-tasks" ? "bg-dark" : ""
                      }`}
                      to="/past-tasks"
                      onClick={() =>
                        handleNavClick("Past Tasks", "📋", "/past-tasks")
                      }
                    >
                      <i className="icon">&#128221;</i>Past Tasks
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Sidebar;
