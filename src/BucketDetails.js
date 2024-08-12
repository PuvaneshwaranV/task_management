import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import SimpleButton from './Simplebutton';
import { removeBucket } from './store/bucketsSlice';
import './admin3.css';

function BucketDetails() {
  const buckets = useSelector((state) => state.buckets);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [bucketIndex, setBucketIndex] = useState(null);

  const handleDeleteBucket = (index) => {
    setBucketIndex(index);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (bucketIndex !== null) {
      dispatch(removeBucket(bucketIndex));
    }
    setShowModal(false);
    setBucketIndex(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setBucketIndex(null);
  };

  const handleBackToAdmin = () => {
    navigate('/admin3');
  };

  return (
    <div className="container" id="ct">
      <h3 className="text-center">Bucket Details</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Bucket Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buckets.map((bucket, index) => (
            <tr key={index}>
              <td id="dur">{bucket.name}</td>
              <td>
                <SimpleButton
                  label="Delete"
                  handleClick={() => handleDeleteBucket(index)}
                  className="btn btn-danger"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='me-4'>
        <SimpleButton
          label="Back to Admin"
          handleClick={handleBackToAdmin}
          className="btn btn-primary"
        />
      </div>

      <Modal show={showModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this bucket?
        </Modal.Body>
        <Modal.Footer>
          <SimpleButton
            label="Cancel"
            handleClick={handleCancelDelete}
            className="btn btn-secondary"
          />
          <SimpleButton
            label="OK"
            handleClick={handleConfirmDelete}
            className="btn btn-danger"
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BucketDetails;
