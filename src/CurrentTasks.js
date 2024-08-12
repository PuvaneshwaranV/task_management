import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskProgress, completeTask } from './store/teamMembersSlice';
import { Modal, Button } from 'react-bootstrap';
import SimpleButton from './Simplebutton';

const CurrentTasks = ({ currentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [completedTask, setCompletedTask] = useState(null);

  const teamMembers = useSelector((state) => state.teamMembers) || [];
  const member = teamMembers.find(m => m.email === currentUser);
  const tasks = (member && member.tasks) ? member.tasks : [];
  const dispatch = useDispatch();

  const handleUpdateProgress = (taskId, progress) => {
    const newProgress = parseInt(progress, 10);
    dispatch(updateTaskProgress({ email: currentUser, taskId, progress: newProgress }));
  };

  const handleUpdateButtonClick = (taskId) => {
    setModalMessage('Task progress updated successfully.');
    setShowModal(true);
  };

  const handleCompleteButtonClick = (taskId) => {
    const completionDate = new Date().toLocaleDateString();
    dispatch(completeTask({ email: currentUser, taskId, completionDate }));
    setModalMessage('Task completed successfully.');
    setCompletedTask({ taskId, completionDate });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (completedTask) {
      setCompletedTask(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Current Tasks</h2>
      {tasks.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Tag</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Description</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.task}</td>
                <td>{task.tag}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.description}</td>
                <td>
                  <input
                    type="number"
                    value={task.progress}
                    onChange={(e) => handleUpdateProgress(task.id, e.target.value)}
                    min="0"
                    max="100"
                  />
                </td>
                <td>
                  <SimpleButton label="Update" handleClick={() => handleUpdateButtonClick(task.id)} />
                  {task.progress === 100 && (
                    <SimpleButton label="Complete" handleClick={() => handleCompleteButtonClick(task.id)} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks available.</p>
      )}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CurrentTasks;
