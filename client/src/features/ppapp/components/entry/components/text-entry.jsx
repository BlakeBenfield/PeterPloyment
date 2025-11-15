
const TextEntry = ({value, changeCB}) => {
    return (
        <>
            <input className={"text-white focus:outline-none bg-fieldColor text-lg border-gray-400 border-1"} type={"text"} value={value} maxLength={32} onChange={changeCB}/>
        </>
    );

}

export default TextEntry;