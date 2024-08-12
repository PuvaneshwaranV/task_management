import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { removeTeamMember } from './store/teamMembersSlice';
import SimpleButton from './Simplebutton';
// import './Admin2.css';

function TeamMembers() {
  const teamMembers = useSelector((state) => state.teamMembers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [memberIndex, setMemberIndex] = useState(null);

  const handleRemove = (index) => {
    setMemberIndex(index);
    setShowModal(true);
  };

  const handleConfirmRemove = () => {
    if (memberIndex !== null) {
      dispatch(removeTeamMember(memberIndex));
    }
    setShowModal(false);
    setMemberIndex(null);
  };

  const handleCancelRemove = () => {
    setShowModal(false);
    setMemberIndex(null);
  };

  const handleBack = () => {
    navigate('/admin2');
  };

  return (
    <div className="container mb-5" id="ct">
      <h3 className="text-center">Team Members</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr key={index}>
              <td>{member.firstName}</td>
              <td>{member.lastName}</td>
              <td>{member.role}</td>
              <td>{member.phone}</td>
              <td>{member.email}</td>
              <td>
                <SimpleButton
                  label="Remove"
                  handleClick={() => handleRemove(index)}
                  className="btn btn-danger"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="me-4">
        <SimpleButton
          label="Back to Add Members"
          handleClick={handleBack}
          className="btn btn-primary"
        />
      </div>

      <Modal show={showModal} onHide={handleCancelRemove}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this member?
        </Modal.Body>
        <Modal.Footer>
          <SimpleButton 
            label="Cancel" 
            variant="secondary" 
            handleClick={handleCancelRemove} 
          />
          <SimpleButton 
            label="OK" 
            variant="danger" 
            handleClick={handleConfirmRemove} 
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TeamMembers;
