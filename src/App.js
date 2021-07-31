import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import Node from './components/Node'
import Button from './components/Button'
import Line from './components/Line'
import { RANGE } from "./config/config.js";


function App() {
  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])

  function addNode() {
    const node = { id: uuid(), pos: { x: 0, y: 0 }, peers: [] }
    setNodes([...nodes, node])
  }

  function updateNodePos(i, pos) {
    const updatedNodes = [...nodes]
    updatedNodes[i].pos = pos

    setNodes(updatedNodes)
  }

  function updateNodePeers(i, peers) {
    const updatedNodes = [...nodes]
    updatedNodes[i].peers = peers

    setNodes(updatedNodes)

  }

  const updateLinks = (nodes) => {
    const updatedLinks = []

    for (let i = 0; i < nodes.length - 1; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].pos.x - nodes[j].pos.x, nodes[i].pos.y - nodes[j].pos.y)

        if (d <= RANGE) updatedLinks.push([
          {
            id:nodes[i].id,
            x: nodes[i].pos.x,
            y: nodes[i].pos.y
          },
          {
            id:nodes[j].id,
            x: nodes[j].pos.x,
            y: nodes[j].pos.y
          }
        ])
      }
    }
    setLinks(updatedLinks)
  }

  useEffect(() => {
    updateLinks(nodes)
  }, [nodes])

  return (
    <div className='h-screen w-full flex flex-col'>
      <div className='w-full bg-gray-500 mx-auto flex justify-center items-center py-8'>
        <Button
          title='Add Node'
          onClick={addNode}
        />
      </div>
      <div className="relative bg-gray-700 flex-grow">

        {/* render nodes */}
        {nodes.map(({ pos, id }, i) => {
          return (
            <>
              <Node
                className='node'
                nodes={nodes.slice(0, i).concat(nodes.slice(i + 1))}
                pos={pos}
                id={id}
                key={id}
                onPosUpdate={(pos) => updateNodePos(i, pos)}
                onPeersUpdate={(peers) => updateNodePeers(i, peers)}
              />
            </>
          )
        })}

        {/* render links between nodes */}
        <svg width='100%' height='100%'>
          {links.map(link => {
            return <Line 
            key={link[0].id+'TO'+link[1].id}
            from={link[0]}
            to={link[1]}
            offset={40} />
          })}
        </svg>
      </div>
    </div >
  );
}

export default App;
