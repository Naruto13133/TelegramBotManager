import React from 'react'
import { useReactFlow } from 'react-flow-renderer';

function DeleteEdgeandNodeButton({selecte,setterFunc,ids}) {


  

  return (
    <div>
        { selecte?(<button
            style={{
              position: 'absolute',
              // transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
            onClick={() => {
              setterFunc((es) => es.filter((e) => e.id!==ids));
              // console.log(setEdge)
            }}
          >
            delete
          </button>):"Test"}
      
    </div>
  )
}

export default DeleteEdgeandNodeButton
