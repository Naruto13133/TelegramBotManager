// components/Editor/main.js

// Importing helper modules
import { useEffect, useState } from "react";
import { useReactFlow } from "react-flow-renderer";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
// import styles from "./styles.module.css";
import "react-quill/dist/quill.snow.css";

const NodeTextArea = ({setIsTextAreaVisible,isVisible,nodes,setNodes}) => {
  const [value, setValue] = useState("");

  useEffect(()=>{
    nodes.map(e=>{
      
      if(e.textAreaVisible === true){
        console.log("Component mOunted: ",e.id)
        setValue(e.data.nodeData.textArea)
      }
    })
  },[])
  useEffect(()=>{
 return () => {setValue("")};
  },[])

  // console.log("from nodetextArea")
  
  // console.log(nodes)
  // Editor state

  // const Visible = isVisible;
  // const setIsVisible = setIsTextAreaVisible;
  const testV =()=>{
    console.log("calling testv");
    (nodes.map(e=>{
      // console.log(e)
      console.log("inside the for loop")
      if(e.textAreaVisible == true) 
      {
        // console.log("isVIsislbe")
        // console.log(isVisible)

        e.data.nodeData.textArea = value;
        setValue("")
        e.textAreaVisible = false;
        isVisible(false);
        // e.selected = false;
        setNodes(nodes)

        // console.log("inside if statement")
        // console.log(e)
        // console.log(isVisible)
        // setValue (e.data.nodedata.textArea )
        
      }
      // else setValue("please enter your text!")
    }))
  }
  console.log(nodes)
  
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

