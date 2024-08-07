import { combineReducers } from 'redux';
import  telegramReducer  from '../BotSlice/BotSlice';
import userReducer from '../AuthSlice/AuthSlice';

export  const rootReducer = combineReducers({
  telegram: telegramReducer,
  user: userReducer,
 
  // ... other reducers
});

export default rootReducer;

// Redux/RootReducer.js


// Combine your reducers into a single root reducer


// Export the rootReducer directly
// export default rootReducer;
