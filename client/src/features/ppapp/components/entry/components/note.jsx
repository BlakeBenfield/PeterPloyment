import EditNoteIcon from '../../../../../assets/editnote.svg?react'
import XIcon from '../../../../../assets/x-symbol.svg?react'

const Note = ({value, isShown, changeCB, UIOpenedCB}) => {
    // value={value}
    return (
        <div>
            <div className={`${isShown ? "" : "hidden" } z-5 flex items-center justify-center w-screen h-screen`}>
                <div className={`w-4/5 h-4/5`}>
                    <div className={"relative"}>
                        <button className={"absolute w-full h-full cursor-pointer"} onClick={UIOpenedCB}>
                            <XIcon className={"w-5 h-5 fill-white absolute top-1 right-1 m-1"}/>
                        </button>
                    </div>
                    <textarea onChange={changeCB} placeholder={"Write a note..."} className={"w-full h-full resize-none bg-fieldColor text-white rounded-2xl p-6 focus:outline-none"} maxLength={6000} />
                </div>
            </div>
            <div>
                <button onClick={UIOpenedCB} title={"Notes"}>
                    <EditNoteIcon className={"w-8 h-8 fill-white border-gray-400 border-1 bg-fieldColor cursor-pointer"} />
                </button>
            </div>
        </div>
    );

}

export default Note;