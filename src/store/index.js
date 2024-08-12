import { configureStore } from '@reduxjs/toolkit';
import teamMembersReducer from './teamMembersSlice';
import bucketsReducer from './bucketsSlice';
import tasksReducer from '../tasksSlice';

const store = configureStore({
  reducer: {
    teamMembers: teamMembersReducer,
    buckets: bucketsReducer,
    tasks: tasksReducer
  }
});

export default store;
