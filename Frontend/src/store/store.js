import { configureStore } from '@reduxjs/toolkit';
import captainReducer from './captainSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    captain: captainReducer,
    user: userReducer,
  },
});

export default store;
