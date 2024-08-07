import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow,
  } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { set_edges } from '../../Redux/EngeNodeSlice/NodeEdgeStore';
  

  export default function DeleteLabledEdge({ id, sourceX, sourceY, targetX, targetY,selected,nodes }) {
    const { setEdges, getNodes, getEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    const dispatch = useDispatch();
    

    
    return (
      <>
        <BaseEdge id={id} path={edgePath} />
        <EdgeLabelRenderer>
         {selected ? (<button
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
            onClick={() => {
              setEdges((es) => es.filter((e) => e.id!==id));
              dispatch(set_edges(getEdges))
            }}
          >
            delete
          </button>):""}
        </EdgeLabelRenderer>
      </>
    );
  }
  