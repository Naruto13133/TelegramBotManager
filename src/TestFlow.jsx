import { useState } from 'react';
import { ReactFlow } from '@xyflow/react';
import { Box } from '@chakra-ui/react';
// import '@xyflow/react/dist/style.css';


const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 0, y: 0 },
  },

//   {
//     id: '2',
//     // you can also pass a React component as a label
//     data: { label: <div>Default Node</div> },
//     position: { x: 100, y: 125 },
//   },
//   {
//     id: '3',
//     type: 'output',
//     data: { label: 'Output Node' },
//     position: { x: 50, y: 250 },
//   },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

function TestFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return 
    {
     <Box height={"500px"} width={"500px"} border={"1px solid black"} >
        <ReactFlow className='w-full h-full bg-red-950' nodes={nodes}  fitView />;
     </Box>  
    } 
}

export default TestFlow;