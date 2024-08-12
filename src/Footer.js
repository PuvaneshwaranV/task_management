import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './footer.css'
const Footer = () => {
  return (
    <footer className="pt-4" id="al">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>FOLLOW US ON</h5>
            <a href="https://facebook.com" className="ms-2 text-light me-4"><FaFacebook size={24} /></a>
            <a href="https://twitter.com" className="text-light me-4"><FaTwitter size={24} /></a>
            <a href="https://instagram.com" className="text-light"><FaInstagram size={24} /></a>
          </div>
          <div className="col-md-3">
            <h5>QUICK LINKS</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Dashboard</a></li>
              <li><a href="#" className="text-light">Analysis</a></li>
              <li><a href="#" className="text-light">All Due Tasks</a></li>
              <li><a href="#" className="text-light">All Completed Tasks</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>CONTACT US</h5>
            <p>Phone: 04362 221112, 221113</p>
            <p>Fax: 04362 221112</p>
            <p>Email: <a href="mailto:vpuvaneshwaran5@gmail.com" className="text-light">vpuvaneshwaran5@gmail.com</a></p>
          </div>
          <div className="col-md-3">
            <h5>ADDRESS</h5>
            <p>7/23, Dubai kuruku santhu, <br />Saarjah, <br />Dubai - 773402</p>
          </div>
        </div>
        <hr />
        <div className="row mt-3">
          <div className="col-6 text-start">
            <p>Copyright © Dubai Corporate Limited-Dubai, 2024</p>
          </div>
          <div className="col-6 text-end">
            <p>Developed & Maintained by Puvi 😉</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
