export default function Toggle({ passRef, onChange, label1, label2 }) {
    return (
        <label className='flex check-whitespace gap-2 justify-between items-center text-xs' > {label2}
            <div className='relative overflow-hidden min-w-min'>
                <input
                    ref={passRef ? passRef : null}
                    type="checkbox"
                    class="sr-only"
                    onChange={(event) => onChange ? onChange(event.target.checked) : null} />
                <div class="toggle-bg block bg-gray-400 shadow-inner w-14 h-8 rounded-full transition"></div>
                <div class="toggle absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
            </div>{label1}</label>
    )
}