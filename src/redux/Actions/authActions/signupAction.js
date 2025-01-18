import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiCaller from '../../../config/ApiCaller';

// Async Thunk for SignUp
export const signUp = createAsyncThunk('auth/signUp', async (userData, { rejectWithValue }) => {
  try {
    const response = await ApiCaller.Post('Authentication/SignUp', userData);
    
 
    if (response.status === 200) {
      return response.data;
    } else {
      return rejectWithValue(response.data);
    }
  } catch (error) {
    console.log(error.response || error.message)
    return rejectWithValue(error.response || error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
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
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
