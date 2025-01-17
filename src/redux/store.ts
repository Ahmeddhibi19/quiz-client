import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './quizSlice';
import progressReducer from './progressSlice';
import authReducer from './AuthSlice';


export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    progress: progressReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
