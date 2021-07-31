import { v4 as uuid } from 'uuid'
import Packet from './Packet'

export default class Node {
    constructor() {
        this.id = uuid()
        this.pos = { x: 0, y: 0 }
        this.peers = {}
        this.packets = []

        this.packetHandler = setInterval(() => {
            this.handlePacket()
        }, 3000);
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

    sendData = (data, destination) => {
        const dest = Object.keys(this.peers)[0]
        if (!dest) return

        const packet = new Packet({
            data: data,
            destination: dest,
            sourceID: this.id
        })
        this.recievePacket(packet)
    }

    relayPacket = (packet) => {
        if (this.peers[packet.destination]) {
            packet.route.push(this.id)
            this.peers[packet.destination].recievePacket(packet)
        } else
            this.packets.push(packet)
    }

    recievePacket = (packet) => {
        packet.station = this
        this.packets.push(packet)
    }

    openPacket = (packet) => {
        console.log('PACKET RECIEVED BY ' + this.id)
        console.log('PACKET DATA: ' + packet.data)
    }

    handlePacket = () => {
        const packet = this.packets.pop()

        if (packet) {
            if (packet.destination === this.id)
                this.openPacket(packet)
            else
                this.relayPacket(packet)
        }
    }


}