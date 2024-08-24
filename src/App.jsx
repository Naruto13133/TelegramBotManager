import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useDispatch, useSelector } from "react-redux";

// Import your custom node component
import { TextUpdaterNode } from "./component/NodeAndEndge/TextUpdaterNode";
import { Button } from "@chakra-ui/react";
import ApiListNode from "./component/NodeAndEndge/ApiListNode";
import DeleteLabledEdge from "./component/NodeAndEndge/DeleteLabledEdge";
import DeleteEdgeandNodeButton from "./component/NodeAndEndge/DeleteEdgeandNodeButton";
import NodeTextArea from "./component/NodeAndEndge/Utils/NodeTextArea";
import { set_nodes, set_edges, setFlowMaps } from "./Redux/EngeNodeSlice/NodeEdgeStore";
import { send_node_edge_data } from "./Redux/EngeNodeSlice/NodeEdgeStore";

let initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Start", nodeData: { id: "1", textArea: "text" } },
    textAreaVisible: false,
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "2", nodeData: { id: "1", textArea: "text" } },
    type: "textUpdater",
    textAreaVisible: false,
    command: "",
  },
];

let initialEdges = [
  { id: "e1-2", source: "1", target: "2", type: "deleteEdge", key: "" },
];

export default function App() {
  const [textAreaVisible, setTextAreaVisible] = useState(false);
  const [nodeEdge, setNodeENdge] = useState(null);
  const [api, setApi] = useState("");
  const [nodeIdCounter, setNodeIdCounter] = useState(3);
  
  const dispatch = useDispatch();

  let fileName ="" ;
  const services = useSelector(state => state.telegram.services);
  services.map(e => {if(e.userName == "testUserName"){
    fileName = e.userName;
  }})

  const createNewNodeId = () => {
    setNodeIdCounter((prevCount) => prevCount + 1);
    return nodeIdCounter.toString(); // Return the string ID
  };

  const onSave = useCallback(
   ()=>{
    const flow = nodeEdge.toObject();
    const flowMap = useSelector(state => state.nodeEdge.flowMaps)
    flowMap.map(e => { if (e.hasOwnProperty(fileName)){
      e[fileName] = flow;
    }})
    dispatch(setFlowMaps(flowMap))
   }
    ,
  [])



  const nodeTypes = {
    textUpdater: TextUpdaterNode,
    apiList: ApiListNode,
  };

  const edgeType = {
    deleteEdge: DeleteLabledEdge,
  };

  const [newEdge, setNewEdge] = useState([]);
  const nodeArray = {};
  const edgeArray = [];
  let storedNodes = [];
  let storedEdges = [];

  useEffect(() => {
    console.log(
      "Before storing the dataBefore storing the dataBefore storing the data"
    );
    console.log(edges);
    console.log(nodes);
    dispatch(set_edges(edges));
    dispatch(set_nodes(nodes));

    console.log("retrivinggggggggggggggggggggggggggggggg");
    try {
      const saveddata = localStorage.getItem("flowData");
      console.log(`Saveddata::::::::::::${saveddata}`);
      if (saveddata.length > 0) {
        console.log("uess meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        const { nodes, edges } = JSON.parse(saveddata);
        initialNodes = nodes;
        initialEdges = edges;
        console.log("uess copmlettttttttttttttttttttttttttttttttte");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  useEffect(() => {
    return () => {
      console.log("Savingggggggggggggggggggg");
      console.log(nodes, edges);
      localStorage.setItem("flowData", JSON.stringify({ nodes, edges }));
    };
  }, []);

  useEffect(() => {
    const hasVisibleTextArea = nodes.some((node) => node.textAreaVisible);
    setTextAreaVisible(hasVisibleTextArea);
  }, [nodes]);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
      console.log(params);
      console.log(">>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<");
    },
    [setEdges]
  );

  const submitNoteEdge = (e) => {
    e.preventDefault();
    const confirmSubmission = confirm("Are You really want to save the form?");
    if (nodeEdge) {
      const flow = nodeEdge.toObject();
      console.log(flow);
      localStorage.setItem("test", JSON.stringify(flow));
    }

    if (confirmSubmission) {
      dispatch(send_node_edge_data(nodes, edges));
    }
  };

  const memoizedAddCommandNode = useCallback(
    (currentNodes) => {
      const ids = createNewNodeId();
      setNodes((prevNodes) => [
        ...prevNodes,
        {
          id: ids,
          position: { x: 0, y: 0 },
          data: { label: ids, nodeData: { id: ids, text: "" } },
          type: "textUpdater",
          textAreaVisible: false,
          command: "",
        },
      ]);
      dispatch(set_nodes({ nodes }));
    },
    [setNodes, createNewNodeId]
  );

  const memoizedAddApiNode = useCallback(
    (currentNodes) => {
      const ids = createNewNodeId();
      setNodes((prevNodes) => [
        ...prevNodes,
        {
          id: ids,
          position: { x: 0, y: 0 },
          data: { label: ids, nodeData: { id: ids, text: "" } },
          type: "apiList",
          textAreaVisible: false,
          apiName: "",
        },
      ]);
      dispatch(set_nodes({ nodes }));
    },
    [setNodes, createNewNodeId]
  );

  const uniqueTargetSourceEdges = {};

  const filterEdgesByExistingNodes = useCallback(
    (currentNodes, currentEdges) =>
      currentEdges.filter(
        (edge) =>
          currentNodes.some((nd) => nd.id === edge.source) &&
          currentNodes.some((nd) => nd.id === edge.target)
      ),
    [nodes] // Only depends on `nodes` for efficiency
  );

  const memoizedAddEdges = useCallback(() => {
    let i = 0;
    for (let obj of edges) {
      const key = `key${obj.source}${obj.target}`;

      // Create a new Set if the key doesn't exist
      console.log(`key:${key}`);
      if (!uniqueTargetSourceEdges.hasOwnProperty(key)) {
        i = 1;
        console.log("test test test test test test");
        console.log(obj);
        obj = { ...obj, key: key };
        uniqueTargetSourceEdges[key] = obj;
        // setNewEdge((prev) => [...prev, obj]);
        edgeArray.push(obj);
      }
    }

    if (i == 1) {
      console.log(`only unique edges`);
      console.log(nodeArray);
      setEdges([]);
      setEdges(filterEdgesByExistingNodes(nodes, edgeArray));
      i = 0;
    }
    console.log("Testttttt");
    console.log(newEdge);
    console.log(uniqueTargetSourceEdges); // Log the updated object once at the end
    dispatch(set_edges(edges));
  }, [edges, nodes, onNodesChange, onEdgesChange]);

  // console.log(edges);
  // console.log("nodes");
  // console.log(uniqueTargetSourceEdges);
  // console.log("nodes");
  console.log(nodes);

  return (
    <div className="flex gap-x-1">
      <div style={{ width: "77vw", height: "100vh" }}>
        <ReactFlow
          edgeTypes={edgeType}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onInit={setNodeENdge}
        >
          <Controls className="mb-96 " />
          <MiniMap className="mb-20" />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      {/* Right sidebar for potion  */}
      <div className="flex flex-col gap-y-1 mx-auto mt-5">
        <h1 className="mb-5">Functionalities</h1>
        <Button
          className="bg-black text-white w-48 h-12 rounded-[10px]"
          onClick={() => memoizedAddCommandNode(nodes)}
        >
          Add Command
        </Button>
        <Button
          className="bg-black text-white w-48 h-12 rounded-[10px]"
          onClick={() => {
            memoizedAddApiNode(nodes);
            memoizedAddEdges(edges);
          }}
        >
          Integrate Services
        </Button>
        <Button
          className="bg-black text-white w-48 h-12 rounded-[10px]"
          onClick={() => {
            memoizedAddEdges(edges);
          }}
        >
          Optimise Connection
        </Button>
        <Button
          className="bg-black text-white w-48 h-12 rounded-[10px]"
          onClick={submitNoteEdge}
        >
          Save It!
        </Button>
        {/* ... other buttons */}
      </div>
      { textAreaVisible ? <NodeTextArea nodes={nodes} isVisible = {setTextAreaVisible} setNodes = {setNodes} ></NodeTextArea>:""} 
    </div>
  );
}
