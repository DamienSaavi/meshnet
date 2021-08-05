import React, { useRef } from "react"
import Draggable from "react-draggable"

export default function Blip({ node, className, onDrag, onClick }) {
    const { id, pos, peers } = node
    const ref = useRef()

    return (
        <Draggable
            // nodeRef={ref}
            defaultClassName={`absolute ${className}`}
            position={pos}
            onDrag={(event, { x, y }) => onDrag({ x, y })}
            onMouseDown={event => onClick(event)}
            bounds='parent'
        >
            <div
                className='node transition-color select-none font-mono text-white bg-green-600 rounded-full shadow-xl w-16 h-16 flex flex-col justify-center items-center hover:bg-green-500 overflow-visible whitespace-nowrap hover:animate-ping'>
                <div className='text-xs font-bold'>{pos.x + ' ' + pos.y}</div>
                <div className='flex-col text-xs peers hidden absolute left-full ml-2 p-1 bg-gray-500 rounded shadow-xl'>
                    <p className='place-self-center'>{Object.keys(peers).length === 0 ? 'lonely...' : 'PEERS'}</p>
                    <hr className='my-0.5' />
                    {Object.keys(peers).map(peer => <p key={peer}>{peer}</p>)}
                </div>

                <div className='absolute transition-all duration-400 ease-out node-range z-0 bg-transparent rounded-full border w-0 h-0 opacity-0'></div>
            </div>
        </Draggable>
    )
}