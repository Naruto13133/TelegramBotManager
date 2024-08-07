import react, { Fragment } from "react";

import ReactFlow from "react-flow-renderer";

 const MindNode = () =>{

    const initialVal= [
        {
            id:"1",
            type:"input",
            data:"testLable 1",
            position:{x: 0, y: 0},
        }
    ]

    return (
        <Fragment>
                    <ReactFlow element={initialVal} style={{
                        width:"100%",
                        height:"90vh"
                    }}/>
                        
                    
        </Fragment>
 
    )

 }
 export default MindNode;