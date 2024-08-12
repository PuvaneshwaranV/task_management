import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const Admin4 = () => {
  const teamMembers = useSelector((state) => state.teamMembers);
  const navigate = useNavigate();

  const currentTasks = [];
  const pastTasks = [];
  const memberProgress = teamMembers.map(member => {
    let totalTasks = 0;
    let completedTasks = 0;

    if (member.tasks) {
      totalTasks += member.tasks.length;
      member.tasks.forEach(task => {
        currentTasks.push({ ...task, memberName: `${member.firstName} ${member.lastName}` });
      });
    }

    if (member.completedTasks) {
      completedTasks += member.completedTasks.length;
      totalTasks += member.completedTasks.length;
      member.completedTasks.forEach(task => {
        pastTasks.push({ ...task, memberName: `${member.firstName} ${member.lastName}` });
      });
    }

    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    return { name: `${member.firstName} ${member.lastName}`, progress, completedTasks, totalTasks };
  });

  const totalCurrentTasks = currentTasks.length;
  const totalPastTasks = pastTasks.length;

  const handleViewDashboard = () => {
    localStorage.setItem('taskData', JSON.stringify({
      currentTasks,
      totalTasks: totalCurrentTasks + totalPastTasks,
      inProgressTasks: currentTasks.length
    }));
    navigate('/admin7');
  };

  return (
    <div className="container" id="ct">
      <h2>Current Task List</h2>
      {currentTasks.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Tag</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Description</th>
                <th>Progress</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.task}</td>
                  <td>{task.tag}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.priority}</td>
                  <td>{task.description}</td>
                  <td>{task.progress}</td>
                  <td>{task.memberName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No current tasks available.</p>
      )}

      <h2>Past Task List</h2>
      {pastTasks.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Tag</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Description</th>
                <th>Completion Date</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {pastTasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.task}</td>
                  <td>{task.tag}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.priority}</td>
                  <td>{task.description}</td>
                  <td>{task.completionDate}</td>
                  <td>{task.memberName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No past tasks available.</p>
      )}

      <button className="btn btn-primary mt-3" onClick={handleViewDashboard}>
        View Dashboard
      </button>
    </div>
  );
};

export default Admin4;
