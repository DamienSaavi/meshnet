import React, { Component } from "react";
import Draggable from "react-draggable";
import { areEqual } from "../lib/util";
import { RANGE } from "../config/config.js";

export default class Node extends Component {
    constructor(props) {
        super(props)
        this.id = props.id
        this.state = {
            pos: props.pos,
            peers: []
        }
    }

    get pos() { return this.state.pos }
    get peers() { return this.state.peers }

    updatePos = (x, y) => {
        this.setState({ pos: { x, y } })
        this.props.onPosUpdate(this.pos)
    }

    addPeer = (id) => {
        if (!this.state.peers.includes(id)) {
            const updatedPeers = [...this.peers, id].sort()

            this.setState({ peers: updatedPeers })
            return true
        } else
            return null
    }

    removePeer = (id) => {
        const i = this.state.peers.indexOf(id)

        if (i > -1) {
            const updatedPeers = this.peers.slice(0, i).concat(this.peers.slice(i + 1)).sort()
            this.setState({ peers: updatedPeers })
            return true
        } else
            return null
    }

    scan = () => {
        const nodes = this.props.nodes
        const n = nodes.length

        for (let i = 0; i < n; i++) {
            const d = Math.hypot(nodes[i].pos.x - this.pos.x, nodes[i].pos.y - this.pos.y)

            if (d <= RANGE) this.addPeer(nodes[i].id)
            else this.removePeer(nodes[i].id)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!areEqual(prevState.peers, this.peers)) {
            this.props.onPeersUpdate(this.peers)
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.scan()
        }, 500);
    }

    render() {
        return (
            <Draggable
                defaultClassName={`absolute ${this.props.className}`}
                position={this.state.pos}
                onDrag={(event, { x, y }) => this.updatePos(x, y)}
                onStop={this.props.updateNodePeers}
                bounds='parent'
            >
                <div className='transition-color select-none font-mono text-white bg-green-600 rounded-full shadow-xl w-16 h-16 flex flex-col justify-center items-center hover:bg-green-500 overflow-visible whitespace-nowrap'>
                    <div className='text-xs font-bold'>{this.state.pos.x + ' ' + this.state.pos.y}</div>
                    <div className='flex-col text-xs peers hidden absolute left-full ml-2 p-1 bg-gray-500 rounded shadow-xl'>
                        <p className='place-self-center'>PEERS</p>
                        <hr className='my-0.5'/>
                        {this.peers.map(peer=> <p>{peer}</p>)}
                    </div>
                    <div className='absolute transition-all node-range z-0 bg-transparent rounded-full border w-0 h-0 opacity-0'></div>
                </div>
            </Draggable>)
    }
}