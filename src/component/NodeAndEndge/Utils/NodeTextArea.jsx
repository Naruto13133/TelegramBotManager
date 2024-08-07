// components/Editor/main.js

// Importing helper modules
import { useEffect, useState } from "react";
import { useReactFlow } from "react-flow-renderer";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
// import styles from "./styles.module.css";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { set_nodes } from "../../../Redux/EngeNodeSlice/NodeEdgeStore";
import { useSelector } from "react-redux";



const NodeTextArea = ({isVisible,nodes,setNodes}) => {
  const [value, setValue] = useState("");
  const getNodddess = useSelector((state) => state.nodeEdge.nodes);
  useEffect(() => {
    console.log(`useeffect value called: id: ${getNodddess[1].id} and ${getNodddess[1].data.nodeData.textArea} ans is visible ${getNodddess[1].selected}`)
    // console.log(`useeffect value called: id: ${getNodddess[2].id} and ${getNodddess[2].data.nodeData.textArea} ans is visible ${getNodddess[2].selected}`)
    const foundNode = getNodddess.find((e) => e.selected === true);
    if (foundNode) {
      
      setValue(foundNode.data.nodeData.textArea);
    }
  }, []); // Update only when getNodddess changes

  
  const dispatch = useDispatch();
 
  // const dispatch = useDispatch();
 
  console.log("Testingggggg Testigggg testing testitng testing")
  const stored_nodes = useSelector ((state)=> state.nodeEdge)
  console.log(stored_nodes)
  // const getNodddess = useSelector((state)=>(state.nodeEdge.nodes));
  console.log(`getNoddess: ${getNodddess}`)

  // console.log("from nodetextArea")
  
  // console.log(nodes)
  // Editor state

  // const Visible = isVisible;
  // const setIsVisible = setIsTextAreaVisible;
  // const testV =()=>{
  //   console.log("calling testv");
  //   (nodes.map(e=>{
  //     // console.log(e)
  //     console.log("inside the for loop")
  //     if(e.textAreaVisible == true) 
  //     {
  //       console.log("inside the if block")
  //       //Usesing spread operator to change nested property of constant object
  //       e = {...e,data:{...e.data,nodeData:{...e.data.nodeData,textArea:value}},textAreaVisible:false}

  //       console.log(e)
  //       // console.log(isVisible)
  //       console.log(typeof(value))
  //       console.log(typeof(e.data.nodeData.textArea))
       
  //       // setValue("")
  //       e.textAreaVisible = false;
  //       isVisible(false);
  //       // e.selected = false;
        
        

  //       // console.log("inside if statement")
  //       // console.log(e)
  //       // console.log(isVisible)
  //       // setValue (e.data.nodedata.textArea )
        
  //     }
  //     // else setValue("please enter your text!")
  //   }
  // ))
  //   console.log("Colling storing methods")
    
    
  //   dispatch(set_nodes(nodes))
    
    
  // }

  const testV = () => {
    const updatedNodes = [...nodes]; // Create a copy of the nodes array

    updatedNodes.map((e) => {
      if (e.textAreaVisible === true) {
        e.selected= false
        e.data = {
          ...e.data,
          nodeData: {
            ...e.data.nodeData,
            textArea: value, // Update textArea with current value
          },
        };
        e.textAreaVisible = false; // Optionally hide the editor after update
        
      }
    });

    dispatch(set_nodes(updatedNodes)); // Dispatch action to update Redux state
    setNodes(nodes);
    isVisible(false)
  };

 
  
  return (
    true ?
    <div className = " "
    style={{
        borderColor:"black",
        borderWidth:"10px",
        backgroundColor: "white",
        borderRadius: "20px",
        position: "fixed",
        width: "40%",
        height: "500px",
        gap: "100px",
        top: "50%",
        left: "50%",
        color: "red",
        transform: "translate(-50%, -50%)",
        p: 1,
        bgcolor: "background.paper",
        // background:"transparent",
        overflow:"hidden",
        zIndex:50

      }}>
    <div className="">
    <label className="">Editor Content</label>
    <QuillEditor
      className="bg-white"
      theme="snow"
      value={value}
      onChange={(value) => setValue(value)}
    />
    
  </div>
  
    <button className="bg-red-400 sticky " onClick={()=>{testV()
        console.log(isVisible)
    }}> Close</button> 
  </div> : ""
  );
};

export default NodeTextArea;

