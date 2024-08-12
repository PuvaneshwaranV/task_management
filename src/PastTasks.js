import React from 'react';
import { useSelector } from 'react-redux';

const PastTasks = ({ currentUser }) => {
  const teamMembers = useSelector((state) => state.teamMembers);
  const completedTasks = [];

  const member = teamMembers.find(m => m.email === currentUser);
  if (member && member.completedTasks) {
    member.completedTasks.forEach(task => {
      completedTasks.push({ ...task, memberName: `${member.firstName} ${member.lastName}` });
    });
  }

  return (
    <div className="container mt-4">
      <h2>Past Tasks</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Tag</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Description</th>
            <th>Completion Date</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task, index) => (
            <tr key={index}>
              <td>{task.task}</td>
              <td>{task.tag}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td>{task.completionDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PastTasks;
