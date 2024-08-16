import { useCallback, useRef, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import DeleteEdgeandNodeButton from "./DeleteEdgeandNodeButton";
import NodeTextArea from "./Utils/NodeTextArea";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { set_nodes } from "../../Redux/EngeNodeSlice/NodeEdgeStore";

const handleStyle = {};

export function TextUpdaterNode({ data,id,selected,nodes }) {


  const [textValue, setTextValue] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  // const dispatch = useDispatch();
 


  const { setEdges, getNodes,getEdges } = useReactFlow();
  const onChange = useCallback(
    (evt) => {
      setTextValue(evt.target.value);
      console.log("textValue", textValue);
      console.log("u a 11111111111111111>111111111111111111111 ")
      setNodes(getNodes().map(node => {
        console.log(node)
      if (node.selected) {
        console.log("u are clickgvhing ")
        return {
          ...node,
          selected: true,
          // textAreaVisible: true,
          command:textValue,
        };
      }
      // console.log("id the Func")
      // console.log(node)
      return node;
    }
  )
)
dispatch(set_nodes(getNodes()))
  console.log("calling dispatch")
  console.log(getNodes())
    },
    [textValue,nodes]
  );
  // console.log(getNodes())
  // console.log(getEdges())
  // const test = getNodes();
  // console.log(test[0].data.nodeData)
console.log("test")
  console.log(data)

  const {setNodes} = useReactFlow();
  // getNodes.map( e => (console.log()))
console.log()
const setVisibleTextAreaNode = (e) => {
  // const nodes = getNodes();
  
  const selectedNode = getNodes().find(node => node.selected);
  console.log("inside the setVIsible function of texUpdareNode type")
  // console.log( getNodes())
  if (selectedNode) {
    setNodes(getNodes().map(node => {
      if (node.id === selectedNode.id) {
        return {
          ...node,
          selected: true,
          textAreaVisible: true,
          command:textValue,
        };
      }
      // console.log("id the Func")
      // console.log(node)
      return node;
    }))
    const nodes = getNodes();
    console.log("gettting nodeessss  getiig  nodess")
    console.log(nodes)
    dispatch(set_nodes(nodes));
  }
  // e.stopPropgation();
  // e.stopPropagation();
};

      // onClick={() => {
        // setterFunc((es) => es.filter((e) => e.id!==ids));
        // console.log(setEdge)
      // }}

  return (
    <>
    <div>
      <Handle
        type="target"
        className="mt-[0px] mx-[-40px]  w-[10px] h-[10px] bg-blue-400"
        id="a1"
      />
      <Handle
        type="target"
        className="mt-[0px] mx-[40px]  w-[10px] h-[10px] bg-blue-400"
        id="a2"
      />

      <div className="h-10px align-top h-[30px] w-[120px] mx-auto text-center bg-red-400 rounded-[10px] font-bold">
        TARGET
      </div>
      <div className="flex flex-col items-center justify-between text-center gap-y-5  bg-slate-400 h-32 w-44  border-[3px] border-black rounded-[10px]">
        <label htmlFor="text" x>
          Command
        </label>
        <input
          ref={inputRef}
          className=" h-6 mb-5 nodrag w-32 rounded-[10px] text-center"
          id="text"
          name="text"
          onChange={onChange}
          placeholder="/command"
        />
        <Button onClick ={setVisibleTextAreaNode} className="">AddText</Button>
        <DeleteEdgeandNodeButton selecte={selected} getterFunc={setNodes} setterFunc={setNodes} ids={id}/>
        <div className="h-10px align-bottom h-[30px] w-[120px] bg-green-400 mt-5 rounded-[10px] font-bold">
          SOURCE
          <Handle
            className="mt-[185px] mx-[-40px] w-[10px] h-[10px] bg-yellow-400"
            type="source"
            id="b2"
            style={handleStyle}
          />
          <Handle type="source"  className="mt-[185px] mx-[40px] w-[10px] h-[10px] bg-yellow-400" id="b2" />
        </div>
        
      </div>
      
      {true && (
        <div className="">

  </div>
)}

      </div>
    </>
  );
}
