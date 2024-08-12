import { createSlice } from '@reduxjs/toolkit';

const bucketsSlice = createSlice({
  name: 'buckets',
  initialState: [],
  reducers: {
    addBucket: (state, action) => {
      state.push(action.payload);
    },
    removeBucket: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addBucket, removeBucket } = bucketsSlice.actions;
export default bucketsSlice.reducer;
