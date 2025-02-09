import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiCaller from '../../../config/ApiCaller';
// Async Thunk for Login
export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await ApiCaller.Post('/api/auth/login', userData);
    console.log("response from redux==>>",response);
    if (response.status === 200) {
      return response.data; // Return response if successful
    } else if(response.status === 401) {
      return response.data; // Reject if not successful
    }else{
      
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
    // token: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      // state.token = null;
      state.loading = false;
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // Update the user with new data
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

        // Check if the response is successful
        if (action.payload && action.payload.token && action.payload.token !== '') {
          state.user = action.payload || null; // Assign userinfo or null
          // state.token = action.payload.token || null;
        } else {
          state.error = action.payload.message || 'An unknown error occurred';
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Login failed';
      });
  }
});

export const { clearError, logout,updateUserProfile } = loginSlice.actions;
export default loginSlice.reducer;
