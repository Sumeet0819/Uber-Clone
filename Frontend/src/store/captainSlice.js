import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { captainAPI, apiUtils } from '../api/apiService';

// Register captain
export const registerCaptain = createAsyncThunk(
  'captain/register',
  async (captainData, { rejectWithValue }) => {
    try {
      const response = await captainAPI.register(captainData);
      const data = response.data;

      // Store token in localStorage
      apiUtils.setCaptainToken(data.token);

      return data.captain;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Registration failed');
    }
  }
);

// Login captain
export const loginCaptain = createAsyncThunk(
  'captain/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await captainAPI.login(credentials);
      const data = response.data;

      // Store token in localStorage
      apiUtils.setCaptainToken(data.token);

      return data.captain;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
    }
  }
);

// Logout captain
export const logoutCaptainThunk = createAsyncThunk(
  'captain/logout',
  async (_, { rejectWithValue }) => {
    try {
      await captainAPI.logout();

      // Remove token from localStorage
      localStorage.removeItem('captainToken');

      return true;
    } catch (error) {
      // Still remove token even if API call fails
      localStorage.removeItem('captainToken');
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get captain profile
export const getCaptainProfile = createAsyncThunk(
  'captain/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await captainAPI.getProfile();
      return response.data.captain;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch profile');
    }
  }
);

// Update captain profile
export const updateCaptainProfile = createAsyncThunk(
  'captain/updateProfile',
  async (captainData, { rejectWithValue }) => {
    try {
      const response = await captainAPI.updateProfile(captainData);
      return response.data.captain;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to update profile');
    }
  }
);

// Delete captain account
export const deleteCaptainAccount = createAsyncThunk(
  'captain/deleteAccount',
  async (_, { rejectWithValue }) => {
    try {
      await captainAPI.deleteAccount();

      // Remove token from localStorage
      localStorage.removeItem('captainToken');

      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete account');
    }
  }
);

const initialState = {
  captain: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const captainSlice = createSlice({
  name: 'captain',
  initialState,
  reducers: {
    setCaptain(state, action) {
      state.captain = action.payload;
      state.isAuthenticated = true;
    },
    setCaptainLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCaptainError(state, action) {
      state.error = action.payload;
    },
    updateCaptain(state, action) {
      if (state.captain) {
        state.captain = { ...state.captain, ...action.payload };
      }
    },
    logoutCaptain(state) {
      state.captain = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearCaptainError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerCaptain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerCaptain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.captain = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerCaptain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginCaptain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginCaptain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.captain = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginCaptain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutCaptainThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutCaptainThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.captain = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutCaptainThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Profile
      .addCase(getCaptainProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCaptainProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.captain = action.payload;
        state.error = null;
      })
      .addCase(getCaptainProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateCaptainProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCaptainProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.captain = action.payload;
        state.error = null;
      })
      .addCase(updateCaptainProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Account
      .addCase(deleteCaptainAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCaptainAccount.fulfilled, (state) => {
        state.isLoading = false;
        state.captain = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(deleteCaptainAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCaptain,
  setCaptainLoading,
  setCaptainError,
  updateCaptain,
  logoutCaptain,
  clearCaptainError,
} = captainSlice.actions;

export default captainSlice.reducer;
