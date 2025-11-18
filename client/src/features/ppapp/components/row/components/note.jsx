import EditNoteIcon from '../../../../../assets/editnote.svg?react'
import XIcon from '../../../../../assets/x-symbol.svg?react'

const Note = ({name, value, isShown, changeCB, UIOpenedCB}) => {
    const handleUIOpen = (e) => {
        e.target.name = name;
        UIOpenedCB(e);
    }

    const handleUIClose = (e) => {
        e.target.name = "close";
        UIOpenedCB(e);
    }

    return (
        <div>
            <div className={`${isShown ? "" : "hidden" } left-0 top-0 fixed pointer-events-none z-5 flex items-center justify-center w-screen h-screen`}>
                <div className={`w-4/5 h-4/5 pointer-events-auto`}>
                    <div className={"relative"}>
                        <button className={"absolute w-full h-full cursor-pointer"} onClick={handleUIClose}>
                            <XIcon className={"w-5 h-5 fill-white absolute top-1 right-1 m-1 "}/>
                        </button>
                    </div>
                    <textarea name={name} onChange={changeCB} placeholder={"Write a note..."} className={"w-full h-full resize-none bg-fieldColor text-white rounded-2xl p-6 focus:outline-none ring-1 ring-gray-400"} maxLength={6000} value={value} />
                </div>
            </div>
            <div>
                <button onClick={handleUIOpen} title={"Notes"}>
                    <EditNoteIcon className={"w-8 h-7 fill-white border-gray-400 border-1 bg-fieldColor cursor-pointer"} />
                </button>
            </div>
        </div>
    );

}

export default Note;