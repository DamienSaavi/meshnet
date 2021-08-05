export default function Line({ from, to }) {
    return (<line x1={from.x} y1={from.y} x2={to.x} y2={to.y} className="line" />
    )
}