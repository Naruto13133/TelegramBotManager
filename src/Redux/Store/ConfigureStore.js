import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './RootReducer'
import telegramReducer from  '../BotSlice/BotSlice';
import userReducer from '../AuthSlice/AuthSlice';


import rootReducer from './RootReducer'; // Import the combined reducer

const store = configureStore({
  reducer: rootReducer, // Use the rootReducer here
  // Optionally, you can add middleware, devTools, etc.
});

export default store;