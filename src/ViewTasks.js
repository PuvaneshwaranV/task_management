import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from './tasksSlice';
import { useNavigate } from 'react-router-dom';
import SimpleButton from './Simplebutton';
import { Modal } from 'react-bootstrap';
import './admin1.css';

const ViewTasks = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const teamMembers = useSelector((state) => state.teamMembers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleEdit = (index) => {
    const task = { ...tasks[index], id: index };
    navigate(`/edit-task/${index}`, { state: task });
  };

  const confirmDelete = (index) => {
    setTaskToDelete(index);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (taskToDelete !== null) {
      dispatch(deleteTask(taskToDelete));
      setShowModal(false);
    }
  };

  const getMemberName = (phone) => {
    const member = teamMembers.find((m) => m.phone === phone);
    return member ? `${member.firstName} ${member.lastName}` : phone;
  };

  return (
    <div className="container" id="ct">
      <h2>Task List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Assigned To</th>
            <th>Tag</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.task}</td>
              <td>{getMemberName(task.assignedTo)}</td>
              <td>{task.tag}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(index)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="me-4">
        <SimpleButton label="Back to Add Task" handleClick={() => navigate('/admin1')} />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <SimpleButton label="Cancel" handleClick={() => setShowModal(false)} />
          <SimpleButton label="OK" handleClick={handleDelete} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewTasks;
