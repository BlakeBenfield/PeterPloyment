
const TextEntry = ({name, value, changeCB}) => {
    return (
        <>
            <input name={name} className={"text-white focus:outline-none bg-fieldColor text-lg border-gray-400 border-1 w-60 h-7"} type={"text"} value={value} maxLength={32} onChange={changeCB}/>
        </>
    );

}

export default TextEntry;