export default class Packet {
    constructor(props) {
        this.data = props.data || 'Hi :)'
        this.destination = props.destination
        this.route = []
        this.station = null
    }

    get pos() { return this.station.pos}
    get x() { return this.station.pos.x }
    get y() { return this.station.pos.y }
}