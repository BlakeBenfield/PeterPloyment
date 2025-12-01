
const TextEntry = ({className, name, value, changeCB}) => {
    return (
        <>
            <input name={name} disabled={!changeCB} className={`text-white focus:outline-none bg-fieldColor text-lg border-gray-400 border-1 w-[var(--cellWidth)] h-7 ${className}`} type={"text"} value={value} maxLength={32} onChange={changeCB}/>
        </>
    );

}

export default TextEntry;