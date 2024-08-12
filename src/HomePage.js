import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './Logo.png';
import index from './Index.png';
import SimpleButton from './Simplebutton';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center ">
            <div className="row w-100">
                <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
                    <h2 className="mb-4">
                        <img src={logo} alt="" width="50" height="50" /> Task Management System
                    </h2>
                    <p className="justify-content-center">
                        Task Management is the process of overseeing a task through its lifecycle. It involves planning, testing, tracking, and reporting. Task management can help individuals achieve goals or enable groups of individuals to collaborate and share knowledge for the accomplishment of collective goals.
                    </p>
                    <a href="/login" style={{ textDecoration: 'none' }}>
                        <SimpleButton label="Login" />
                    </a>
                </div>
                <div className="col-md-8 d-flex align-items-center justify-content-center">
                    <img src={index} className="img-fluid" alt="Task Management System" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
