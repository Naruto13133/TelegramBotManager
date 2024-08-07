import { useCallback, useRef, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import DeleteEdgeandNodeButton from './DeleteEdgeandNodeButton';
 
const handleStyle = { left: 10 };
 
export function MultiMediaNode({ data,selected }) {
  const [textValue , setTextValue] = useState("");

  const {setNodes} = useReactFlow();

  const inputRef = useRef(null);
  const onChange = useCallback((evt) => {
    setTextValue(evt.target.value);
    console.log("textValue",textValue);
  }, [textValue]);
 

  

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className='flex flex-col items-center text-center gap-y-5 pt-6 bg-slate-500 h-32 w-44  border-[3px] border-black rounded-[10px]'>
        <label htmlFor="text" x>Command</label>
        <input ref={inputRef} className=" h-6  nodrag w-32 rounded-[10px] text-center"
         id="text" name="text" onChange={onChange} placeholder='/command' />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
      <div>
        <DeleteEdgeandNodeButton selected={selected} setterFunc={setNodes}/>
      </div>
    </>
  );
}