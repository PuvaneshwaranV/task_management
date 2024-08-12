

import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './admin4.css';

const Admin5 = () => {
  const data = {
    labels: ['BackLog', 'To Do', 'Review'],
    datasets: [
      {
        label: 'BackLog',
        data: [2, 0, 0],
        backgroundColor: 'rgba(144,238,144, 0.6)',
        borderColor: 'rgba(144,238,144, 1)',
        borderWidth: 1,
      },
      {
        label: 'To Do',
        data: [0, 3, 0],
        backgroundColor: 'rgba(128,0,128, 0.6)',
        borderColor: 'rgba(128,0,128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Review',
        data: [0, 0, 2],
        backgroundColor: 'rgba(255,165,0, 0.6)',
        borderColor: 'rgba(255,165,0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container">
      <div className="header">
        <h2>Project</h2>
        <h2>Status</h2>
        <h2 className="task-management">
          Task Management
        </h2>
      </div>
      <h3 className="total-tasks">Total Task 7</h3>
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Admin5;
