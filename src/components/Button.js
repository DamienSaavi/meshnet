export default function Button({ onClick, title }) {
    return (
        <div className='border-2 border-t-0 rounded-lg border-gray-400'>
            <button
                title={title}
                className='flex shadow justify-center items-center font-bold text-white bg-blue-500 leading-none p-3 px-3 w-40 max-w-prose self-end border-b-4 border-blue-700 rounded-md hover:bg-blue-400 active:border-b-2 active:mt-0.5'
                onClick={onClick}
            >{title}</button>
        </div>
    )
}