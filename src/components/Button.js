export default function Button({ onClick, title }) {
    return (
        <div className='rounded-lg border-2 border-blue-200'>
            <button
                title={title}
                className='flex justify-center items-center font-bold text-white bg-blue-500 leading-none p-3 px-3 w-40 max-w-prose border-b-4  border-blue-600 rounded-md hover:bg-blue-400 active:border-b-2 -mt-0.5 active:mt-0'
                onClick={onClick}
            >{title}</button>
        </div>
    )
}