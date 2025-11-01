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

// Action for Google login that doesn't make an API call
export const googleLogin = createAsyncThunk('auth/googleLogin', async (userData, { rejectWithValue }) => {
  try {
    if (!userData || !userData.token) {
      return rejectWithValue({ message: 'Invalid user data' });
    }
    return userData;
  } catch (error) {
    return rejectWithValue(error);
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
    updateUserSubscription: (state, action) => {
      state.user = { ...state.user, subscription: action.payload }; // Update the user's subscription data
    },
    updateUserPoints: (state, action) => {
      // Update only the sgPoints field
      if (state.user) {
        state.user.sgPoints = action.payload;
      }
    },
    incrementUserPoints: (state, action) => {
      // Increment sgPoints by the specified amount
      if (state.user) {
        state.user.sgPoints = (state.user.sgPoints || 0) + action.payload;
      }
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
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.token && action.payload.token !== '') {
          state.user = action.payload;
        } else {
          state.error = 'Invalid user data';
        }
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Google login failed';
      });
  }
});

export const { clearError, logout, updateUserProfile, updateUserSubscription, updateUserPoints, incrementUserPoints } = loginSlice.actions;
export default loginSlice.reducer;
