import { useDispatch, useSelector } from "react-redux";
import { setFlowMaps } from "../../Redux/EngeNodeSlice/NodeEdgeStore";

export const useCreateNewReactFlow = () => {
    const dispatch = useDispatch();
    const getFlowMapsFormStore = useSelector(state => state.nodeEdge.flowMaps);

    const createNewFlow = () => {
        const fileName = prompt('Please enter the file name:');

        if (fileName && !getFlowMapsFormStore.some(e => e.hasOwnProperty(fileName))) {
            const NewNodeRefrence = {
                "nodes": [
                    {
                        "id": "1",
                        "position": { "x": 0, "y": 0 },
                        "data": { "label": "Start", "nodeData": { "id": "1", "textArea": "text" } },
                        "textAreaVisible": false,
                        "measured": { "width": 150, "height": 40 }
                    },
                    {
                        "id": "2",
                        "position": { "x": 0, "y": 100 },
                        "data": { "label": "2", "nodeData": { "id": "1", "textArea": "text" } },
                        "type": "textUpdater",
                        "textAreaVisible": false,
                        "command": "",
                        "measured": { "width": 176, "height": 158 }
                    }
                ],
                "edges": [
                    {
                        "id": "e1-2",
                        "source": "1",
                        "target": "2",
                        "type": "deleteEdge",
                        "key": ""
                    }
                ],
                "viewport": { "x": 0, "y": 0, "zoom": 1 }
            };

            const flowData = {
                [fileName]: NewNodeRefrence,
            };
            const updatedFlowMaps = [...getFlowMapsFormStore, flowData];
            dispatch(setFlowMaps(updatedFlowMaps));
        } else {
            alert("Use a different file name");
        }
    };

    return createNewFlow;
};
