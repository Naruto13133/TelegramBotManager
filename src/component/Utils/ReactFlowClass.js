import { useDispatch, useSelector } from "react-redux";
import { setFlowMaps } from "../../Redux/EngeNodeSlice/NodeEdgeStore";

export const useCreateNewReactFlow = () => {
    const dispatch = useDispatch();
    const getFlowMapsFromStore = useSelector(state => state.nodeEdge.flowMaps);

    const createNewFlow = (fileName = null, flow = null) => {
        if (fileName == null) {
            fileName = prompt('Please enter the file name: ');
        }

        if (!fileName) {
            alert("File name is required!");
            return;
        }

        if (!flow) {
            flow = {
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
        }

        if (getFlowMapsFromStore.some(e => e.hasOwnProperty(fileName))) {
            alert(`${fileName} File name already exists, use a different one!`);
            return;
        }

        const flowData = { [fileName]: flow };
        const updatedFlowMaps = [...getFlowMapsFromStore, flowData];
        dispatch(setFlowMaps(updatedFlowMaps));
    };

    return createNewFlow;
};
