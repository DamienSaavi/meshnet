import { useEffect, useState } from 'react'
import Blip from './components/Blip'
import Button from './components/Button'
import Line from './components/Line'
import Node from './objects/Node'
import { RANGE } from "./config/config.js"


function App() {
    const [nodes, setNodes] = useState({})
    const [links, setLinks] = useState({})

    useEffect(() => {
        createNode()
    }, [])

    function createNode() {
        const node = new Node()
        setNodes({
            [node.id]: node,
            ...nodes
        })
    }

    function destroyNode(node) {
        const updateNodes = { ...nodes }
        for (const peer of Object.values(updateNodes[node.id].peers)) {
            delete peer.peers[node.id]
        }

        delete updateNodes[node.id]

        setNodes(updateNodes)
    }

    function updateNodePos(node, pos) {
        const updatedNodes = { ...nodes }

        updatedNodes[node.id].updatePos(pos)

        Object.values(updatedNodes).forEach(neigh => {
            if (node.id !== neigh.id) {
                const d = Math.hypot(node.x - neigh.x, node.y - neigh.y)
                if (d <= RANGE) {
                    updatedNodes[node.id].addPeer(neigh)
                    updatedNodes[neigh.id].addPeer(node)
                } else {
                    updatedNodes[node.id].removePeer(neigh)
                    updatedNodes[neigh.id].removePeer(node)
                }
            }
        })

        setNodes(updatedNodes)
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
        if (event.button === 1) {
            destroyNode(node)
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
                {Object.keys(nodes).length > 0 ?
                    Object.values(nodes).map(node =>
                        <Blip
                            key={node.id}
                            node={node}
                            onMouseDown={(event) => mouseDownHandler(node, event)}
                            onDrag={(pos) => updateNodePos(node, pos)} />
                    )
                    : null}

                {/* render links between nodes */}
                <svg width='100%' height='100%'>
                    {Object.keys(links).map(linkID => {
                        const [from, to] = links[linkID]
                        return <Line
                            key={linkID}
                            from={from}
                            to={to}
                            offset={32} />
                    })}

                </svg>
            </div>
        </div >
    );
}

export default App;
