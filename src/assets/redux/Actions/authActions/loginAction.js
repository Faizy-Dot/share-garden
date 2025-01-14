import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiCaller from '../../../../config/ApiCaller';

// Async Thunk for Login
export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await ApiCaller.Post('Authentication/Login', userData);
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
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
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
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = loginSlice.actions;
export default loginSlice.reducer;
