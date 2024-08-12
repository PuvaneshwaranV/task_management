import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin6.css';

const Admin6 = () => {
  const [taskData, setTaskData] = useState({
    pastTasks: [],
    totalTasks: 0,
    completedTasks: 0
  });

  useEffect(() => {
    const storedTaskData = localStorage.getItem('taskData');
    if (storedTaskData) {
      setTaskData(JSON.parse(storedTaskData));
    }
  }, []);

  const { pastTasks, totalTasks, completedTasks } = taskData;

  const data = {
    labels: ['Tasks'],
    datasets: [
      {
        label: 'Completed',
        data: [completedTasks],
        backgroundColor: 'rgba(144,238,144, 0.6)',
        borderColor: 'rgba(144,238,144, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total',
        data: [totalTasks],
        backgroundColor: 'rgba(0,0,255, 0.3)',
        borderColor: 'rgba(0,0,255, 1)',
        borderWidth: 1,
      }
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
        max: totalTasks,
        ticks: {
          stepSize: 1,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Container fluid className="chart-container">
      <Row className="header align-items-center mb-4">
        <Col xs={12} md={8} className="mb-2 mb-md-0">
          <h2 className="text-center text-md-start">Project Task Management</h2>
        </Col>
        <Col xs={12} md={4} className="text-center text-md-end">
        </Col>
      </Row>
      <Row className="text-center mb-4">
        <Col>
          <h3>Total Tasks: {totalTasks}</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="chart-wrapper">
            <Bar data={data} options={options} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin6;
