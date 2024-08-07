import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow,
  } from '@xyflow/react';
  
  export default function DeleteLabledEdge({ id, sourceX, sourceY, targetX, targetY,selected,nodes }) {
    const { setEdges, getNodes } = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    
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
            }}
          >
            delete
          </button>):""}
        </EdgeLabelRenderer>
      </>
    );
  }
  