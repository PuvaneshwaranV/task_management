import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';
import { addTeamMember } from './store/teamMembersSlice';
import SimpleButton from './Simplebutton';
import { useNavigate } from 'react-router-dom';
import './Admin2.css';

function Admin2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    phone: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const dispatch = useDispatch();
  const teamMembers = useSelector((state) => state.teamMembers);

  const roles = ["Assistant Manager", "Team Member"];

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstName':
        if (!value.match(/^[a-zA-Z]{3,20}$/)) {
          error = "*Please enter First name properly.";
        }
        break;
      case 'lastName':
        if (!value.match(/^[a-zA-Z]{1,20}$/)) {
          error = "*Please enter Last name properly.";
        }
        break;
      case 'role':
        if (!roles.includes(value)) {
          error = "*Please select the role.";
        }
        break;
      case 'phone':
        if (!value.match(/^[6-9]\d{9}$/)) {
          error = "*Please enter Phone number properly.";
        }
        break;
      case 'email':
        if (!value.match(/^[a-z0-9]+@gmail\.com$/i) || value === "admin@gmail.com") {
          error = "*Please enter the Email properly.";
        }
        break;
      case 'password':
        if (!value.match(/^[1][2][3][4][5][6][7][8]$/)) {
          error = "*Please enter the Password properly.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error === '';
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    validateField(id, value);
  };

  const isFormValid = () => {
    const fields = Object.keys(formData);
    return fields.every((field) => validateField(field, formData[field]));
  };

  const isDuplicate = () => {
    return teamMembers.some(
      (member) => member.phone === formData.phone || member.email === formData.email
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      if (isDuplicate()) {
        setModalMessage("Unable to add member. Phone number or Email already exists.");
      } else {
        dispatch(addTeamMember(formData));
        setModalMessage("Your information is correct. New Member Added successfully.");
        setFormData({
          firstName: '',
          lastName: '',
          role: '',
          phone: '',
          email: '',
          password: ''
        });
        setErrors({});
      }
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      role: '',
      phone: '',
      email: '',
      password: ''
    });
    setErrors({});
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container form-container mt-5 mb-5">
      <h3 className="text-center">Add Team Members</h3>
      <Form id="teamMemberForm" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name*</Form.Label>
          <Form.Control
            type="text"
            id="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            isInvalid={!!errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name*</Form.Label>
          <Form.Control
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            isInvalid={!!errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Role*</Form.Label>
          <Form.Control
            as="select"
            id="role"
            value={formData.role}
            onChange={handleChange}
            isInvalid={!!errors.role}
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.role}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone*</Form.Label>
          <Form.Control
            type="tel"
            id="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email*</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password*</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex justify-content-between mt-2">
          <SimpleButton
            label="Add"
            handleClick={handleSubmit}
            className="btn btn-save w-50"
          />
          <SimpleButton
            label="View"
            handleClick={() => navigate('/team-members')}
            className="btn btn-view w-50"
          />
          <SimpleButton
            label="Reset"
            handleClick={handleReset}
            className="btn btn-reset w-50"
          />
          <SimpleButton
            label="Cancel"
            handleClick={handleCancel}
            className="btn btn-cancel w-50"
          />
        </div>
      </Form>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <SimpleButton
            label="OK"
            handleClick={handleModalClose}
            className="btn btn-primary"
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Admin2;
