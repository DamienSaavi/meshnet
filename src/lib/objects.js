import { v4 as uuid } from 'uuid'

export class Packet {
    constructor(props) {
        // only for react states. actual outgoing should not be uniquely identifiable
        this.id = uuid()

        this.data = props.data || 'Boop!'
        this.destination = props.destination
        this.source = props.source
        this.route = []
        this.station = props.station
        this.created = Date.now()
        this.suspended = false
    }

    // return packet's position
    get pos() { return this.station.pos || null }
    get x() { return this.station.pos.x }
    get y() { return this.station.pos.y }
}


export class Node {
    constructor(props) {
        this.id = uuid()
        this.pos = props.pos || { x: 0, y: 0 }
        this.peers = {}
        this.packets = []

        this.updatePacketState = props.updatePacketState

        this.mingle = setInterval(() => {
            this.sendData(null, Object.keys(this.peers)[
                Math.floor(Math.random() * Object.keys(this.peers).length)
            ])
        }, 500);
    }

    // return position's x and y
    get x() { return this.pos.x }
    get y() { return this.pos.y }

    // update node position
    updatePos({ x, y }) {
        this.pos = { x, y }
    }


    // =============== PEER METHODS ===============
    // add peer
    addPeer(peer) {
        if (!this.peers[peer.id])
            this.peers = { ...this.peers, [peer.id]: peer }
    }

    // remove peer
    removePeer(peer) {
        if (this.peers[peer.id])
            delete this.peers[peer.id]
    }


    // =============== PACKET METHODS ===============
    // create and send a packet
    sendData(data, destination) {
        if (!destination)
            return

        const packet = new Packet({
            data: data,
            destination: destination,
            source: this.id,
            station: this
        })

        this.storePacket(packet)
        this.updatePacketState(packet, 'CREATE')
    }


    // forward packet if possible route present, otherwise put back in queue
    forwardPacket(packet) {
        if (this.peers[packet.destination]) {
            packet.route.push(this.id)
            this.peers[packet.destination].storePacket(packet)

            this.updatePacketState(packet, 'UPDATE')

        } else {
            this.storePacket(packet)
        }
    }

    // output data content of packet
    openPacket(packet) {
        this.updatePacketState(packet, 'DELETE')
        // console.log('PACKET RECIEVED BY ' + this.id)
        // console.log('PACKET DATA: ' + packet.data)
    }

    // recieve and store incoming packet
    storePacket(packet) {
        packet.station = this
        this.packets.push(packet)

        this.handlePackets()
    }

    handlePackets() {
        let packet

        do {
            packet = this.packets.shift()

            if (packet && Date.now() - packet.created > 5000)
                this.updatePacketState(packet, 'DELETE')

        } while (packet && Date.now() - packet.created > 5000)

        if (packet)
            setTimeout(() => {
                if (this.suspended) {
                    this.updatePacketState(packet, 'DELETE')
                } else {
                    if (packet.destination === this.id)
                        this.openPacket(packet)
                    else
                        this.forwardPacket(packet)
                }
            }, 600);
    }

    clearPackets() {
        let packet = this.packets.shift()

        while (packet) {
            this.updatePacketState(packet, 'DELETE')
            packet = this.packets.shift()
        }
    }

    clearPeers() {
        for (const peer of Object.values(this.peers)) {
            delete peer.peers[this.id]
        }
    }

    suspend() {
        this.suspended = true
        clearInterval(this.mingle)
        this.clearPackets()
        this.clearPeers()
    }
}