import { combineReducers } from 'redux';
import  telegramReducer  from '../BotSlice/BotSlice';
import userReducer from '../AuthSlice/AuthSlice';
import NodeEdgeSliceReducer from '../EngeNodeSlice/NodeEdgeStore'

export  const rootReducer = combineReducers({
  telegram: telegramReducer,
  user: userReducer,
  nodeEdge:NodeEdgeSliceReducer,
  // ... other reducers
});

export default rootReducer;

// Redux/RootReducer.js


// Combine your reducers into a single root reducer


// Export the rootReducer directly
// export default rootReducer;
