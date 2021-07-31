export default function Bloop({ packet }) {
    return (
        <circle cx={packet.x} cy={packet.y} r="10" fill="orange" />
    )
}