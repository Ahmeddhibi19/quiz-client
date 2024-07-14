import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressState {
  step: number;
}

const initialState: ProgressState = {
  step: 1,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    nextStep(state) {
      if (state.step < 3) {
        state.step += 1;
      }
    },
    resetProgress(state) {
      state.step = 1;
    },
  },
});

export const { nextStep, resetProgress } = progressSlice.actions;

export default progressSlice.reducer;
