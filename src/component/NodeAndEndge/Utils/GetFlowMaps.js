import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_flow_data } from '../../../Redux/EngeNodeSlice/NodeEdgeStore';



const GetFlowMaps = () => {
const dispatch = useDispatch();
  const getUserName = useSelector((state)=>{state.user.user});
  const getFlowData = dispatch(get_flow_data(getUserName));
  
  return getFlowData;
  
}

export default GetFlowMaps;
