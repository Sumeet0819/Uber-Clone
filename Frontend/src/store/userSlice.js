import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI, apiUtils } from '../api/apiService';

// Register user
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userAPI.register(userData);
      const data = response.data;

      // Store token in localStorage
      apiUtils.setUserToken(data.token);

      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Registration failed');
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await userAPI.login(credentials);
      const data = response.data;

      // Store token in localStorage
      apiUtils.setUserToken(data.token);

      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
    }
  }
);

// Logout user
export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await userAPI.logout();

      // Remove token from localStorage
      localStorage.removeItem('userToken');

      return true;
    } catch (error) {
      // Still remove token even if API call fails
      localStorage.removeItem('userToken');
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get user profile
export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.getProfile();
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch profile');
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateProfile(userData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to update profile');
    }
  }
);

// Delete user account
export const deleteUserAccount = createAsyncThunk(
  'user/deleteAccount',
  async (_, { rejectWithValue }) => {
    try {
      await userAPI.deleteAccount();

      // Remove token from localStorage
      localStorage.removeItem('userToken');

      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to delete account');
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setUserLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUserError(state, action) {
      state.error = action.payload;
    },
    updateUser(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Profile
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Account
      .addCase(deleteUserAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setUser,
  setUserLoading,
  setUserError,
  updateUser,
  logoutUser,
  clearUserError,
} = userSlice.actions;

export default userSlice.reducer;
