import { configureStore, legacy_createStore } from '@reduxjs/toolkit'
import { EdgeNodeReducer } from './NodeEndgeReducer'
import { thunk } from 'redux-thunk'

export const NodeEdgeStore = configureStore({
  bot_api_key: "" ,
  service_list:{},
    // "":{
    //   id:"",
    //   name:"",
    //   key:"",
    //   url:"",
    //   type:"",

    node_edge_strc:{},
})

export const AuthStore = legacy_createStore(EdgeNodeReducer,applyMiddleware(thunk))