import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // needed for react-chartjs-2

const Admin8 = () => {
  const location = useLocation();
  const [memberProgress, setMemberProgress] = useState([]);
  const [totalCurrentTasks, setTotalCurrentTasks] = useState(0);
  const [totalPastTasks, setTotalPastTasks] = useState(0);

  const teamMembers = useSelector((state) => state.teamMembers);

  useEffect(() => {
    if (location.state) {
      setMemberProgress(location.state.memberProgress);
      setTotalCurrentTasks(location.state.totalCurrentTasks);
      setTotalPastTasks(location.state.totalPastTasks);
    } else {
      // Compute the data if location.state is not available
      const currentTasks = [];
      const pastTasks = [];
      const computedMemberProgress = teamMembers.map(member => {
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

      setMemberProgress(computedMemberProgress);
      setTotalCurrentTasks(currentTasks.length);
      setTotalPastTasks(pastTasks.length);
    }
  }, [location, teamMembers]);

  const pieData = {
    labels: ['Current Tasks', 'Past Tasks'],
    datasets: [
      {
        data: [totalCurrentTasks, totalPastTasks],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#a9a9b0', overflow: 'hidden' }}>
      <div style={{ width: '50%', marginBottom: '20px' }}>
        <h2>Task Distribution</h2>
        <div style={{ position: 'relative', height: '300px' }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
      <div style={{ width: '50%', marginBottom: '20px' }}>
        <h1>Team Member Progress</h1>
        {memberProgress.length > 0 ? (
          memberProgress.map((member, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={`https://i.pravatar.cc/50?img=${index + 1}`} alt={member.name} style={{ borderRadius: '50%', marginRight: '10px' }} />
                <div style={{ width: '100%' }}>
                  <div style={{ marginBottom: '5px' }}>{member.name}</div>
                  <div style={{ width: '100%', backgroundColor: '#ddd' }}>
                    <div style={{ width: `${member.progress}%`, backgroundColor: '#4169E1', height: '20px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No progress data available.</p>
        )}
      </div>
    </div>
  );
};

export default Admin8;
