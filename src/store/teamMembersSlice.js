import { createSlice } from '@reduxjs/toolkit';



const teamMembersSlice = createSlice({
  name: 'teamMembers',
  initialState: [],
  reducers: {
    addTeamMember: (state, action) => {
      state.push(action.payload);
    },
    removeTeamMember: (state, action) => {
      return state.filter((member, index) => index !== action.payload);
    },
    addTaskToMember: (state, action) => {
      const { phone, task } = action.payload;
      const member = state.find(m => m.phone === phone);
      if (member) {
        if (!member.tasks) {
          member.tasks = [];
        }
        member.tasks.push({ ...task, id: member.tasks.length });
      }
    },
    updateTaskProgress: (state, action) => {
      const { email, taskId, progress } = action.payload;
      const member = state.find(m => m.email === email);
      if (member) {
        const task = member.tasks.find(t => t.id === taskId);
        if (task) {
          task.progress = progress;
        }
      }
    },
    completeTask: (state, action) => {
      const { email, taskId, completionDate } = action.payload;
      const member = state.find(m => m.email === email);
      if (member) {
        const taskIndex = member.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
          const task = member.tasks[taskIndex];
          task.progress = 100;
          task.completionDate = completionDate;
          member.tasks.splice(taskIndex, 1); // Remove the completed task
          if (!member.completedTasks) {
            member.completedTasks = []; // Initialize completedTasks if it doesn't exist
          }
          member.completedTasks.push(task);
        }
      }
    }
  }
});

export const { addTeamMember, removeTeamMember, addTaskToMember, updateTaskProgress, completeTask } = teamMembersSlice.actions;
export default teamMembersSlice.reducer;
