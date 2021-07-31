export default function Line({from,to, offset}) {
    return (<line x1={from.x + offset} y1={from.y + offset} x2={to.x + offset} y2={to.y + offset} className="line" />
    )
}