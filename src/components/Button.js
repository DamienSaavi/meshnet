import { useEffect } from "react"

export default function Button({ onClick, title, type }) {


    return (
        <div className='rounded-lg border-2 border-gray-400'>
            <button
                title={title}
                className='flex justify-center items-center font-bold text-white  leading-none rounded-md p-3 px-3 w-40 max-w-prose border-b-4 border-blue-800 hover:bg-blue-400 bg-blue-500 active:border-b-2 -mt-0.5 active:mt-0'
                onClick={onClick}
            >{title}</button>
        </div>
    )
}