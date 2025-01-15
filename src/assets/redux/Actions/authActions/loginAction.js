import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiCaller from '../../../../config/ApiCaller';

// Async Thunk for Login
export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await ApiCaller.Post('Authentication/Login', userData);
    console.log(response);
    if (response.status === 200) {
      return response.data; // Return response if successful
    } else {
      return rejectWithValue(response.data); // Reject if not successful
    }
  } catch (error) {
    console.log(error.response || error.message);
    return rejectWithValue(error.response || error.message); // Handle error
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.userinfo;
        state.token = action.payload.data.token;
        console.log("something to share", action.payload)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.status;
      });
  },
});

export const { clearError, logout } = loginSlice.actions;
export default loginSlice.reducer;
