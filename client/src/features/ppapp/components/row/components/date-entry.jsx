const DateEntry = ({value, changeCB}) => {
    return (
        <>
            <input className={"text-white focus:outline-none bg-fieldColor text-lg border-gray-400 border-1 w-60 h-7"} type={"date"} value={value} maxLength={32} onChange={changeCB}/>
        </>
    );

}

export default DateEntry;