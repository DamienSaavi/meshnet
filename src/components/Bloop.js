import { useEffect, useRef } from "react"

export default function Bloop({ pos, offset }) {
    const ref = useRef()

    useEffect(() => {
    }, [])

    return (
        <circle ref={ref} r="8" cx={pos.x+offset} cy={pos.y+offset} fill="orange" className='transition-all duration-500 ease-out' />
    )
}