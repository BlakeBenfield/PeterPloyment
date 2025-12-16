const DateEntry = ({className, name, value, changeCB}) => {
    return (
        <>
            <input name={name} className={`${className} text-white text-center focus:outline-none bg-fieldColor text-lg border-gray-400 border-t border-l w-[var(--cellWidth)] h-7`} type={"date"} value={value} maxLength={32} onChange={changeCB}/>
        </>
    );

}

export default DateEntry;