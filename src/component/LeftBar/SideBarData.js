import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useGetListOfFlowMaps = () => {
  const getFlowMapsFromStore = useSelector((state) => state.nodeEdge.flowMaps);
  const [flowMap, setFlowMap] = useState([]);
  
  useEffect(() => {
    // Transform the flow maps into the desired format for the sidebar
    if (getFlowMapsFromStore && getFlowMapsFromStore != undefined) {
      console.log(">>>>>>>>>>>>> calling")
     
      const formattedFlowMaps = getFlowMapsFromStore.map((e) => ({
        title: Object.keys(e)[0], 
        cName: `${Object.keys(e)[0]} nav-text `,
        value: Object.values(e)[0],
        show : Object.values(e)[1],
      }));
      console.log(getFlowMapsFromStore)
      setFlowMap(formattedFlowMaps);
    }
  }, [getFlowMapsFromStore]);
console.log("flowMaps from hook:")
console.log(flowMap)
  return flowMap;
};
