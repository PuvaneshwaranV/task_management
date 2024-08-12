import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from './tasksSlice';
import { addTaskToMember } from './store/teamMembersSlice';
import SimpleButton from './Simplebutton';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import './admin1.css';

const Admin1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teamMembers = useSelector((state) => state.teamMembers);
  const tasks = useSelector((state) => state.tasks.tasks);

  const [task, setTask] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [tag, setTag] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const tags = ["Official", "Personal"];
  const priorities = ["High", "Medium", "Low"];

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'task':
        if (!value.match(/^[a-zA-Z\s]{10,120}$/)) {
          newErrors.task = "*Please enter Task details properly.";
        } else if (tasks.some((t) => t.task === value)) {
          newErrors.task = "*Task with this name already exists.";
        } else {
          delete newErrors.task;
        }
        break;
      case 'assignedTo':
        if (!value) {
          newErrors.assignedTo = "*Please select a member.";
        } else {
          delete newErrors.assignedTo;
        }
        break;
      case 'tag':
        if (!value) {
          newErrors.tag = "*Please select a tag.";
        } else {
          delete newErrors.tag;
        }
        break;
      case 'dueDate':
        if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
          newErrors.dueDate = "*Please enter Due Date properly.";
        } else {
          delete newErrors.dueDate;
        }
        break;
      case 'priority':
        if (!value) {
          newErrors.priority = "*Please select priority.";
        } else {
          delete newErrors.priority;
        }
        break;
      case 'description':
        if (!value.match(/^[a-zA-Z\s]{10,250}$/)) {
          newErrors.description = "*Please enter Description properly.";
        } else {
          delete newErrors.description;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'task':
        setTask(value);
        break;
      case 'assignedTo':
        setAssignedTo(value);
        break;
      case 'tag':
        setTag(value);
        break;
      case 'dueDate':
        setDueDate(value);
        break;
      case 'priority':
        setPriority(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
    validateField(id, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.keys(errors).length === 0 &&
      task && assignedTo && tag && dueDate && priority && description;

    if (isValid) {
      const newTask = { task, assignedTo, tag, dueDate, priority, description };
      dispatch(addTask(newTask));
      dispatch(addTaskToMember({ phone: assignedTo, task: newTask }));
      setModalMessage("Task assigned successfully.");
      setShowModal(true);
      // Clear input fields
      handleReset();
    } else {
      const newErrors = {};
      if (!task) newErrors.task = "*Please enter Task details properly.";
      if (!assignedTo) newErrors.assignedTo = "*Please select a member.";
      if (!tag) newErrors.tag = "*Please select a tag.";
      if (!dueDate) newErrors.dueDate = "*Please enter Due Date properly.";
      if (!priority) newErrors.priority = "*Please select priority.";
      if (!description) newErrors.description = "*Please enter Description properly.";
      setErrors(newErrors);
    }
  };

  const handleReset = (e) => {
    if (e) e.preventDefault();
    setTask('');
    setAssignedTo('');
    setTag('');
    setDueDate('');
    setPriority('');
    setDescription('');
    setErrors({});
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  return (
    <div className="container form-container mt-1 mb-0">
      <form id="taskForm" onSubmit={handleSubmit}>
        <div className="form-header">
          <h3 className="text-center">Assign Tasks</h3>
        </div>
        <div className="form-body">
          <div className="form-group">
            <label>Task*</label>
            <input
              type="text"
              id="task"
              placeholder="Enter Task"
              value={task}
              onChange={handleChange}
              className={`form-control ${errors.task ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.task}</div>
          </div>
          <div className="form-group">
            <label>Assigned To*</label>
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={handleChange}
              className={`form-control ${errors.assignedTo ? 'is-invalid' : ''}`}
            >
              <option value="">Select a member</option>
              {teamMembers.map((member) => (
                <option key={member.phone} value={member.phone}>
                  {member.firstName} {member.lastName}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.assignedTo}</div>
          </div>
          <div className="form-group">
            <label>Tag*</label>
            <select
              id="tag"
              value={tag}
              onChange={handleChange}
              className={`form-control ${errors.tag ? 'is-invalid' : ''}`}
            >
              <option value="">Select a tag</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.tag}</div>
          </div>
          <div className="form-group">
            <label>Due Date*</label>
            <input
              type="date"
              id="dueDate"
              min={today} // Set the min attribute to today's date
              value={dueDate}
              onChange={handleChange}
              className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.dueDate}</div>
          </div>
          <div className="form-group">
            <label>Priority*</label>
            <select
              id="priority"
              value={priority}
              onChange={handleChange}
              className={`form-control ${errors.priority ? 'is-invalid' : ''}`}
            >
              <option value="">Select priority</option>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.priority}</div>
          </div>
          <div className="form-group">
            <label>Description*</label>
            <textarea
              id="description"
              placeholder="Enter Description"
              value={description}
              onChange={handleChange}
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            ></textarea>
            <div className="invalid-feedback">{errors.description}</div>
          </div>
        </div>
        <div className="form-footer d-flex justify-content-between mt-0">
          <SimpleButton label="Save" handleClick={handleSubmit} />
          <SimpleButton type="reset" label="Reset" handleClick={handleReset} />
          <SimpleButton label="View" handleClick={() => navigate('/view-tasks')} />
        </div>
      </form>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <SimpleButton label="Close" handleClick={handleModalClose} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin1;
