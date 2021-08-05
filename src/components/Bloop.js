import { useEffect, useRef } from "react"

export default function Bloop({ pos,  }) {
    const ref = useRef()

    useEffect(() => {
    }, [])

    return (
        <circle ref={ref} r="8" cx={pos.x} cy={pos.y} fill="orange" className='packet transition-all duration-500 ease-out' />
    )
}