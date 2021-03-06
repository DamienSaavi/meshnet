import { useEffect, useState, useRef } from 'react'
import Blip from './components/Blip'
import Bloop from './components/Bloop'
import Button from './components/Button'
import Line from './components/Line'
import { Node } from './lib/objects'
import { RANGE } from "./config/config.js"

function App() {
    const [nodes, setNodes] = useState({})
    const [links, setLinks] = useState({})
    const [packets, setPackets] = useState({})
    const packetsRef = useRef({})


    const updatePacketState = (packet, action) => {
        switch (action.toUpperCase()) {
            case 'CREATE':
            case 'UPDATE':
                packetsRef.current[packet.id] = packet
                setPackets({ ...packetsRef.current })
                break;

            case 'DELETE':
                delete packetsRef.current[packet.id]
                setPackets({ ...packetsRef.current })
                break;

            default:
                break;
        }
    }

    const createNode = (pos) => {
        const node = new Node({ pos, updatePacketState })
        updateNetworkByNode(node)
    }

    const destroyNode = (node) => {
        // console.log('deleting')
        const updatedNodes = { ...nodes }
        const updatedLinks = { ...links }

        node.suspend()

        for (const peer of Object.values(updatedNodes[node.id].peers)) {
            const linkID = [node.id, peer.id].sort().join('+')

            delete updatedLinks[linkID]
            // delete peer.peers[node.id]
        }

        delete updatedNodes[node.id]

        setNodes(updatedNodes)
        setLinks(updatedLinks)
    }

    const updateNetworkByNode = (node, pos) => {
        const updatedNodes = { ...nodes, [node.id]: node }
        const updatedLinks = { ...links }

        if (pos)
            node.pos = pos

        Object.values(updatedNodes).forEach(neigh => {
            if (node.id !== neigh.id) {

                const d = Math.hypot(node.pos.x - neigh.pos.x, node.pos.y - neigh.pos.y)
                const linkID = [node.id, neigh.id].sort().join('+')

                if (d <= RANGE) {
                    updatedLinks[linkID] = { from: node.pos, to: neigh.pos }
                    updatedNodes[node.id].addPeer(neigh)
                    updatedNodes[neigh.id].addPeer(node)
                } else {
                    delete updatedLinks[linkID]
                    updatedNodes[node.id].removePeer(neigh)
                    updatedNodes[neigh.id].removePeer(node)
                }
            }
        })

        setNodes(updatedNodes)
        setLinks(updatedLinks)
    }

    const clearNetwork = () => {
        for (const node of Object.values(nodes)) {
            node.suspend()
        }

        packetsRef.current = {}
        setNodes({})
        setLinks({})
        setPackets({})
    }

    const mouseDownHandler = (node, event) => {
        switch (event.button) {
            case 1:
                destroyNode(node)
                break;
            default:
                break;
        }
    }

    const doubleClickHandler = (event) => {
        const { layerX: x, layerY: y } = event.nativeEvent
        createNode({ x, y })
    }

    // useEffect(() => console.log(packets), [packets])

    return (
        <div className='h-screen w-full flex flex-col overflow-hidden'>
            <div className='w-full relative z-50 bg-gray-800 border-b-2 border-gray-500 mx-auto flex justify-center items-center py-4 gap-8'>

                <div className='rounded-lg border-2 border-gray-400'>
                    <button
                        title={'Add Node'}
                        className='flex justify-center items-center font-bold text-white  leading-none rounded-md p-3 px-3 w-40 max-w-prose border-b-4 border-blue-800 hover:bg-blue-400 bg-blue-500 active:border-b-2 -mt-0.5 active:mt-0'
                        onClick={() => createNode()}
                    >{'Add Node'}</button>
                </div>

                <div className='rounded-lg border-2 border-gray-400'>
                    <button
                        title={'Clear'}
                        className='flex justify-center items-center font-bold text-white  leading-none rounded-md p-3 px-3 w-40 max-w-prose border-b-4 border-red-800 hover:bg-red-400 bg-red-500 active:border-b-2 -mt-0.5 active:mt-0'
                        onClick={clearNetwork}
                    >{'Clear'}</button>
                </div>

            </div>
            <div className="relative bg-gray-700 flex-grow justify-center flex">

                <div className='bg-gray-600 absolute top-0 text-white p-2 px-4 rounded-b-xl opacity-80'>
                    <p><strong>Double click</strong> to create new node</p>
                    <p><strong>Middle click</strong> to destroy node</p>
                </div>

                {/* render nodes */}
                <div
                    onDoubleClick={event => doubleClickHandler(event)}
                    className='absolute z-20 w-full h-full'>
                    {Object.keys(nodes).length > 0 ?
                        Object.values(nodes).map(node =>
                            <Blip
                                key={node.id}
                                node={node}
                                destroyNode={() => destroyNode(node)}
                                onClick={(event) => mouseDownHandler(node, event)}
                                onDrag={(pos) => updateNetworkByNode(node, pos)} />
                        )
                        : null}
                </div>

                {/* render links between nodes */}
                <svg width='100%' height='100%' className='absolute z-0' xmlns="http://www.w3.org/2000/svg">
                    {Object.keys(links).map(linkID => {
                        const { from, to } = links[linkID]
                        return <Line
                            key={linkID}
                            from={from}
                            to={to} />
                    })}

                    {Object.keys(packets).map(id => {
                        return <Bloop
                            key={id}
                            pos={packets[id].pos} />
                    })}
                </svg>

                {/* render packets */}
                <div className='relative z-10 w-full h-full transition-all'>
                </div>

            </div>
        </div >
    );
}

export default App;
