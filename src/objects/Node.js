import { v4 as uuid } from 'uuid'

export default class Node {
    constructor() {
        this.id = uuid()
        this.pos = { x: 0, y: 0 }
        this.peers = {}
    }

    get x() { return this.pos.x }
    get y() { return this.pos.y }

    updatePos = ({ x, y }) => {
        this.pos = { x, y }
    }

    addPeer = (peer) => {
        if (!this.peers[peer.id])
            this.peers = { ...this.peers, [peer.id]: peer }
    }

    removePeer = (peer) => {
        if (this.peers[peer.id])
            delete this.peers[peer.id]
    }
}