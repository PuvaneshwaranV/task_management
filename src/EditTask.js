import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from './tasksSlice';
import SimpleButton from './Simplebutton';
import { useNavigate, useLocation } from 'react-router-dom';
import './admin1.css';

const EditTask = () => {
  const location = useLocation();
  const task = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teamMembers = useSelector((state) => state.teamMembers);

  const [taskData, setTaskData] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ index: task.id, updatedTask: taskData }));
    navigate('/view-tasks');
  };

  const getMemberName = (phone) => {
    const member = teamMembers.find((m) => m.phone === phone);
    return member ? `${member.firstName} ${member.lastName}` : phone;
  };

  const getMemberPhone = (name) => {
    const member = teamMembers.find((m) => `${m.firstName} ${m.lastName}` === name);
    return member ? member.phone : name;
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Edit Task</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="taskName" className="form-label">Task Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="task"
                    value={taskData.task}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="assignedTo" className="form-label">Assigned To</label>
                  <select
                    className="form-control"
                    name="assignedTo"
                    value={taskData.assignedTo}
                    onChange={(e) => {
                      const memberPhone = getMemberPhone(e.target.value);
                      handleChange({ target: { name: 'assignedTo', value: memberPhone } });
                    }}
                  >
                    {teamMembers.map((member) => (
                      <option key={member.phone} value={member.phone}>
                        {member.firstName} {member.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="tagMember" className="form-label">Tag Member for Notifications</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tag"
                    value={taskData.tag}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="dueDate" className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        value="high"
                        checked={taskData.priority === 'high'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">High</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        value="medium"
                        checked={taskData.priority === 'medium'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        value="low"
                        checked={taskData.priority === 'low'}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Low</label>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={taskData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <SimpleButton label="Update Task" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
