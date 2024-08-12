import { createSlice } from '@reduxjs/toolkit';
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    currentTaskIndex: null
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    setCurrentTask: (state, action) => {
      state.currentTaskIndex = action.payload;
    },
    updateTask: (state, action) => {
      const { index, updatedTask } = action.payload;
      state.tasks[index] = updatedTask;
      state.currentTaskIndex = null;
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    }
  }
});

export const { addTask, setCurrentTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
