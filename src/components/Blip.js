import React, { useRef } from "react"
import Draggable from "react-draggable"
import Button from "./Button"
import { RiSendPlaneFill, RiDeleteBin5Fill } from "react-icons/ri";


export default function Blip({ node, className, onDrag, destroyNode, onClick }) {
    const { id, pos, peers } = node
    const ref = useRef()

    return (
        <Draggable
            // nodeRef={ref}
            positionOffset={{ x: -32, y: -32 }}
            defaultClassName={`absolute node-container ${className}`}
            position={pos}
            onDrag={(event, { x, y }) => onDrag({ x, y })}
            onMouseDown={event => onClick(event)}
            bounds='parent'
        >
            <div
                className='node transition-color select-none font-mono text-white flex flex-col justify-center items-center overflow-visible whitespace-nowrap hover:animate-ping'>
                <div className='text-xs flex justify-center items-center font-bold bg-green-600 hover:bg-green-500 w-16 h-16 z-20 rounded-full shadow-xl'>{pos.x + ' ' + pos.y}</div>
                {/* <div className='flex-col text-xs peers hidden absolute left-full ml-2 p-1 bg-gray-500 rounded shadow-xl'>
                    <p className='place-self-center'>{Object.keys(peers).length === 0 ? 'lonely...' : 'PEERS'}</p>
                    <hr className='my-0.5' />
                    {Object.keys(peers).map(peer => <p key={peer}>{peer}</p>)}
                </div> */}
                <div className='hidden controls absolute z-0 top-full bg-gray-600 rounded-b-full p-1 pt-6 -mt-4 flex-col justify-end items-center gap-1'>
                    <button
                        className='rounded-full bg-gray-500 hover:bg-blue-500 w-8 h-8 flex justify-center items-center'
                        onClick={null} >
                        <RiSendPlaneFill
                            className='text-white transform translate-y-0.5 -translate-x-px'
                        />
                    </button>
                    <button
                        className='rounded-full bg-gray-500 hover:bg-red-600 w-8 h-8 flex justify-center items-center'
                        onClick={destroyNode} >
                        <RiDeleteBin5Fill
                            className='text-white'
                        />
                    </button>
                </div>
                <div className='absolute transition-all duration-400 ease-out node-range z-0 bg-transparent rounded-full border w-0 h-0 opacity-0'></div>
            </div>
        </Draggable>
    )
}