import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios , { AxiosError }  from 'axios';

export interface User {
  id?: string;
  firstname: string;
  lastname: string;
  email: string;
  age: number;
  address: string;
  Function: string;
  civil_status: "married" | "single";
  sex: "male" | "female";
  password?:string
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for registering a user
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (user: User,{ rejectWithValue }) => {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          throw new Error('Failed to register');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data);
          } else {
            return rejectWithValue('An unexpected error occurred');
          }
      }
    }
  );

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', credentials);
      return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data);
          } else {
            return rejectWithValue('An unexpected error occurred');
          }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
