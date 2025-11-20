const DateEntry = ({name, value, changeCB}) => {
    return (
        <>
            <input name={name} className={"text-white focus:outline-none bg-fieldColor text-lg border-gray-400 border-1 w-[var(--cellWidth)] h-7"} type={"date"} value={value} maxLength={32} onChange={changeCB}/>
        </>
    );

}

export default DateEntry;