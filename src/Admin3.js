import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SimpleButton from './Simplebutton';
import { addBucket } from './store/bucketsSlice';

function Admin3() {
  const [bucketName, setBucketName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBucketNameChange = (e) => {
    const value = e.target.value;
    setBucketName(value);

    if (value.length < 5) {
      setErrorMessage('Bucket name must be at least 5 characters long.');
    } else {
      setErrorMessage('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    if (form.checkValidity() === false || !bucketName.trim() || bucketName.length < 5) {
      setValidated(true);
    } else {
      dispatch(addBucket({ name: bucketName }));
      setBucketName('');
      setValidated(false);
      setModalMessage('Your bucket has been created successfully.');
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleViewBuckets = () => {
    navigate('/bucket-details');
  };

  const handleReset = () => {
    setBucketName('');
    setValidated(false);
    setErrorMessage('');
  };

  const handleCancel = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="container form-container" style={{ height: '230px' }}>
      <h3 className="text-center">Add Bucket</h3>
      <Form id="bucketForm" noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label htmlFor="bucketName">Bucket Name*</Form.Label>
          <Form.Control
            type="text"
            id="bucketName"
            placeholder="Bucket Name"
            required
            minLength={5}
            maxLength={20}
            value={bucketName}
            onChange={handleBucketNameChange}
          />
          {errorMessage && (
            <div className="text-danger">
              {errorMessage}
            </div>
          )}
        </Form.Group>
        <div className="d-flex justify-content-between mt-2">
          <SimpleButton
            label="Save"
            type="submit"
            className="btn btn-save btn-block"
          />
          <SimpleButton
            label="Reset"
            handleClick={handleReset}
            className="btn btn-reset btn-block"
          />
          <SimpleButton
            label="Cancel"
            handleClick={handleCancel}
            className="btn btn-cancel btn-block"
          />
          <SimpleButton
            label="View"
            handleClick={handleViewBuckets}
            className="btn btn-view btn-block"
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

export default Admin3;
