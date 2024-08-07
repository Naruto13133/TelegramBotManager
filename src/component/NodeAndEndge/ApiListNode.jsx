import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import DeleteEdgeandNodeButton from './DeleteEdgeandNodeButton';

const handleStyle = { left: 10 };
const animalNames = ['Lion', 'Tiger', 'Bear', 'Elephant', 'Monkey'];

function ApiListNode({data,selected,id}) {
  const [selectedAnimal, setSelectedAnimal] = useState(null);


  const {setNodes,getNodes} = useReactFlow();

  return (
    <>
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
      <div className="flex flex-col items-center justify-between text-center gap-y-5  bg-slate-500 h-32 w-44  border-[3px] border-black rounded-[10px]">
        <label htmlFor="text" >
          Command
        </label>
        <select
          id="animal"
          value={selectedAnimal}
          onChange={(e) => setSelectedAnimal(e.target.value)}
          className="text-center rounded-[5px] px-2 py-1 border border-gray-300"
        >
          <option value="">Choose...</option>
          {animalNames.map((animal) => (
            <option key={animal} value={animal}>
              {animal}
            </option>
          ))}
        </select>
        <DeleteEdgeandNodeButton selecte={selected} getterFunc={getNodes} setterFunc={setNodes} ids={id}/>
        <div className="h-10px align-bottom h-[30px] w-[120px] bg-green-400 mt-[30px] rounded-[10px] font-bold">
          SOURCE
          <Handle
            className="mt-[185px] mx-[-40px] w-[10px] h-[10px] bg-yellow-400"
            type="source"
            id="b2"
          />
          <Handle type="source"  className="mt-[185px] mx-[40px] w-[10px] h-[10px] bg-yellow-400" id="b2" />
        </div>
      </div>
      {/* <Handle type="source" position={Position.Left} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} /> */}
    </>
  );
}

export default ApiListNode
