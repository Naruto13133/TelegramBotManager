import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFlowMaps } from "../../Redux/EngeNodeSlice/NodeEdgeStore";

export const useShowSelectedFlow = () => {
    const getFlowMapsFromStore = useSelector(state => state.nodeEdge.flowMaps);
    console.log(getFlowMapsFromStore);
    const dispatch = useDispatch();

    const showFlowByName = (name) => {
        const flowMaps = getFlowMapsFromStore.map(e => {
            if (Object.keys(e)[0] === name) {
                return { ...e, show: true };
            } else {
                return { ...e, show: false };
            }
        });

        console.log(flowMaps);
        dispatch(setFlowMaps(flowMaps));
    };

    return showFlowByName;
};