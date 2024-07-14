import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

interface QuizState {
  questions: {
    question: string;
    answers: string[];
    correctAnswerIndex: number | null; 
    type: 'multiple-choice' | 'text'; 
  }[];
  selectedAnswers: (number | string)[]; 
  loading: boolean;
  response: string | null;
}

const initialState: QuizState = {
  questions: [
    {
      question: 'Multiple choice question 1?',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
      correctAnswerIndex: 0,
      type: 'multiple-choice',
    },
    {
      question: 'Text input question?',
      answers: [],
      correctAnswerIndex: null,
      type: 'text',
    },
    {
      question: 'Multiple choice question 2?',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
      correctAnswerIndex: 0,
      type: 'multiple-choice',
    },
    {
      question: 'Multiple choice question 3?',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
      correctAnswerIndex: 0,
      type: 'multiple-choice',
    },
    {
      question: 'Multiple choice question 4?',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
      correctAnswerIndex: 0,
      type: 'multiple-choice',
    },
    {
      question: 'Text input question?',
      answers: [],
      correctAnswerIndex: null,
      type: 'text',
    },
    {
      question: 'Text input question?',
      answers: [],
      correctAnswerIndex: null,
      type: 'text',
    },
    {
      question: 'Text input question?',
      answers: [],
      correctAnswerIndex: null,
      type: 'text',
    },
  ],
  selectedAnswers: Array(8), 
  loading: false,
  response: null,
};

export const submitDataToServer = createAsyncThunk(
  'quiz/submitDataToServer',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { quiz } = state;
    const data = {
      answers: quiz.selectedAnswers.map((selectedAnswer, questionIndex) => ({
        question: quiz.questions[questionIndex].question,
        answer: selectedAnswer,
      })),
    };
    console.log(data);
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.message;
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    saveQuizAnswers(
      state,
      action: PayloadAction<{ questionIndex: number; answer: number | string }>
    ) {
      const { questionIndex, answer } = action.payload;
      state.selectedAnswers[questionIndex] = answer;
    },
    submitQuiz(state) {
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitDataToServer.pending, (state) => {
      state.loading = true;
      state.response = null;
    });
    builder.addCase(submitDataToServer.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.response = action.payload;
    });
    builder.addCase(submitDataToServer.rejected, (state) => {
      state.loading = false;
      state.response = 'Submission failed';
    });
  },
});

export const { saveQuizAnswers, submitQuiz } = quizSlice.actions;

export default quizSlice.reducer;