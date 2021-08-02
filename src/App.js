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
    const [highlightedNode, setHighlightedNode] = useState(null)
    const canvas = useRef()


    const updatePacketState = (packet, action, nodeID) => {
        switch (action.toUpperCase()) {
            case 'CREATE':
            case 'UPDATE':
                packets[packet.id] = packet
                setPackets({ ...packets })
                break;

            case 'DELETE':
                delete packets[packet.id]
                setPackets({ ...packets })
                break;

            default:
                break;
        }
    }

    function createNode() {
        const node = new Node({ updatePacketState,packets })
        setNodes({
            ...nodes,
            [node.id]: node
        })
    }

    function destroyNode(node) {
        const updateNodes = { ...nodes }

        for (const peer of Object.values(updateNodes[node.id].peers)) {
            delete peer.peers[node.id]
        }

        clearInterval(updateNodes[node.id].mingle)

        delete updateNodes[node.id]

        setNodes(updateNodes)
    }

    function updateNodePos(node, pos) {
        nodes[node.id].updatePos(pos)

        Object.values(nodes).forEach(neigh => {
            if (node.id !== neigh.id) {
                const d = Math.hypot(node.x - neigh.x, node.y - neigh.y)
                if (d <= RANGE) {
                    nodes[node.id].addPeer(neigh)
                    nodes[neigh.id].addPeer(node)
                } else {
                    nodes[node.id].removePeer(neigh)
                    nodes[neigh.id].removePeer(node)
                }
            }
        })

        setNodes({ ...nodes })
    }

    useEffect(() => {
        const updatedLinks = {}

        for (const node of Object.values(nodes)) {
            for (const peer of Object.values(node.peers)) {
                const linkID = [node.id, peer.id].sort().join('+')
                if (!updatedLinks[linkID]) {
                    updatedLinks[linkID] = [node.pos, peer.pos]
                }
            }
        }

        setLinks(updatedLinks)

    }, [nodes])

    const mouseDownHandler = (node, event) => {
        switch (event.button) {
            case 0:
                node.sendData()
                break;
            case 1:
                destroyNode(node)
                break;
            default:
                break;
        }
    }


    return (
        <div className='h-screen w-full flex flex-col overflow-hidden'>
            <div className='w-full relative z-50 bg-gray-800 border-b-2 border-gray-500 mx-auto flex justify-center items-center py-4'>
                <Button
                    title='Add Node'
                    onClick={createNode}
                />
            </div>
            <div className="relative bg-gray-700 flex-grow">

                {/* render nodes */}
                <div className='absolute z-20 w-full h-full'>
                    {Object.keys(nodes).length > 0 ?
                        Object.values(nodes).map(node =>
                            <Blip
                                key={node.id}
                                node={node}
                                onClick={(event) => mouseDownHandler(node, event)}
                                onDrag={(pos) => updateNodePos(node, pos)} />
                        )
                        : null}
                </div>

                {/* render links between nodes */}
                <svg ref={canvas} width='100%' height='100%' className='absolute z-0' xmlns="http://www.w3.org/2000/svg">
                    {Object.keys(links).map(linkID => {
                        const [from, to] = links[linkID]
                        return <Line
                            key={linkID}
                            from={from}
                            to={to}
                            offset={32} />
                    })}

                    {Object.keys(packets).map(id => {
                        return <Bloop
                            key={id}
                            pos={packets[id].pos}
                            offset={32} />
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
