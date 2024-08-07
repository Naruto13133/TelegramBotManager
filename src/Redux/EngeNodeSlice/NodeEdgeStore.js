import { configureStore, createAsyncThunk, createSlice, legacy_createStore } from '@reduxjs/toolkit'
import { EdgeNodeReducer } from './NodeEndgeReducer'
import { thunk } from 'redux-thunk'
import axios from 'axios';
import { NODE_EDGE_API } from '../../Config/Api';


const nodeEndge_initialState = {
  nodes:[],
  edges:[],
  jwt:"",
  error:"",
  isLoading:false,
  status:""
};


export const send_node_edge_data = createAsyncThunk(
  "sendding nodes and edges data",
  async({nodes,edges},{rejectedwithvalue})=>{
    try{
      console.log("async Function is called!")
      const {data} = await axios.post(`${NODE_EDGE_API}`,{nodes,edges})
      return data;
    }
    catch(error){
      console.log(error);
    }
  }
)

const NodeEdgeSlice = createSlice({
  name:"nodeEndge",
  initialState: nodeEndge_initialState,
  reducers:{
    set_nodes: (state,action) =>{
      console.log("u called set_nodes")
      console.log(action.payload)
      state.nodes = action.payload;
    },
    set_edges:(state,action) => {
      console.log("u called set_edges")
      console.log(action.payload)
      state.edges = action.payload;
    },
    logOut: (state) =>{
      state.nodes = []
      state.edges = []
      jwt = ""
      error = ""
      isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(send_node_edge_data.pending,(state)=>{
      state.isLoading =true;
    }).addCase(send_node_edge_data.fulfilled, (state)=>{
      state.isLoading = false;
      state.status = "success";
      state.error = "";
    }).addCase(send_node_edge_data.rejected, (state,action)=>{
      state.isLoading = false;
      state.error = action.data;
      state.status = "fail to send the data."
    })
  }
})


export const { logout, set_nodes, set_edges } = NodeEdgeSlice.actions;
export default NodeEdgeSlice.reducer;
