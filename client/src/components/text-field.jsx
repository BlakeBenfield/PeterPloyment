import '../global.css'

const TextField = ({placeHolder}) => {
    return (
        <>
            <input className={"text-white text-2xl bg-[#333333] rounded-xl pl-5 pt-2 pb-2 w-80 ring-[#4a4a4a] ring-1 m-0"} id={"field"} type={"text"} placeholder={placeHolder}/>
        </>
    )
}

export default TextField