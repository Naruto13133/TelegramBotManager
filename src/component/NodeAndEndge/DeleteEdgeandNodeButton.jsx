import React from 'react'
import { useReactFlow } from 'react-flow-renderer';
import { useDispatch } from 'react-redux';
import { set_nodes } from '../../Redux/EngeNodeSlice/NodeEdgeStore';

function DeleteEdgeandNodeButton({selecte,setterFunc,ids, getterFunc}) {
const dispatch = useDispatch();

  

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
              dispatch(set_nodes(getterFunc()))  
              // console.log(setEdge)
            }}
          >
            delete
          </button>):"Test"}
      
    </div>
  )
}

export default DeleteEdgeandNodeButton
