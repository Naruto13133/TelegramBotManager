import { configureStore, createAsyncThunk, createSlice, legacy_createStore } from '@reduxjs/toolkit'
import { EdgeNodeReducer } from './NodeEndgeReducer'
import { thunk } from 'redux-thunk'
import axios from 'axios';
import { STORE_NODEEDGE_DATA } from '../../Config/Api';


const nodeEndge_initialState = {
  flowMaps:[],
  nodes:[],
  edges:[],
  viewport:{},
  jwt:"",
  error:"",
  isLoading:false,
  status:""
};


export const send_node_edge_data = createAsyncThunk(
  "sendding nodes and edges data",
  async({flowMaps},{rejectedwithvalue})=>{
    try{
      console.log("async Function is called!")
      console.log(nodes)
      console.log(edges)
      const {data} = await axios.post(`${STORE_NODEEDGE_DATA}+store`,{flowMaps})
      return data;
    }
    catch(error){
      console.log(error);
    }
  }
)

export const get_flow_data = createAsyncThunk(
  "get List of use created folw for different bots",
  async({userName},{rejectedwithvalue})=>{
    try{
      console.log("async Function is called!")
      console.log(nodes)
      console.log(edges)
      const {data} = await axios.post(`${STORE_NODEEDGE_DATA}getflow`,userName)
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
    setFlowMaps(state,action){
      console.log("saving into state")
      console.log(action.payload)
      state.flowMaps = action.payload;
    },
    set_nodes: (state,action) =>{
      console.log("u called set_nodes")
      console.log(action.payload)
      state.nodes = action.payload;
    },
    set_Viewport: (state,action) =>{
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
    }).addCase(get_flow_data.pending,(state)=>{
      state.isLoading = true;
      state.error = "";
      state.status = "fail to get the data.";
    }).addCase(get_flow_data.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.status = "success";
        state.flowMaps = payload.data;
    }).addCase(get_flow_data.rejected, (state,action)=>{
          state.isLoading = false;
          state.error = payload.error;
          state.status = "failed";
    })
  }
})


export const { logout, set_nodes, set_edges,set_Viewport,setFlowMaps } = NodeEdgeSlice.actions;
export default NodeEdgeSlice.reducer;
