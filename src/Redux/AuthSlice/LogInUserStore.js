import { applyMiddleware, combineReducers, legacy_createStore } from '@reduxjs/toolkit'
import  {authReducer}  from './LoginReducer'
import { thunk } from 'redux-thunk'

export const AuthRootReducer = combineReducers({
  LoginUserStore : authReducer,
})

export const AuthStore = legacy_createStore(AuthRootReducer,applyMiddleware(thunk))