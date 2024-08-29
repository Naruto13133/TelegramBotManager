import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_edges, set_nodes, set_Viewport } from "../../Redux/EngeNodeSlice/NodeEdgeStore";

export const useReRenderTheView = () => {
    const getFlowMapsFromStore = useSelector(state => state.nodeEdge.flowMaps);
    const dispatch = useDispatch();
    useEffect(() => {
        const reStoreTheView = () => {
            if (getFlowMapsFromStore) {
                const flow = getFlowMapsFromStore.find(e => Object.values(e)[1]);
                console.log(flow)
                if (Object.values(flow)[1]) {
                    const { x = 0, y = 0, zoom = 1 } = Object.values(flow)[0].viewport || {};
                    console.log("nodesssss")
                    console.log(Object.values(flow)[0].nodes)
                    dispatch(set_nodes(Object.values(flow)[0].nodes || []));
                    dispatch(set_edges(Object.values(flow)[0].edges || []));
                    dispatch(set_Viewport({ x, y, zoom }));
                }
            }
        };

        reStoreTheView();
    }, [getFlowMapsFromStore]);
};
