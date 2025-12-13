import TabSVG from '../../../../assets/tab.svg?react'
import ColorWheelSVG from '../../../../assets/colorWheel.svg?react' //TODO credit: https://commons.wikimedia.org/wiki/File:Color_circle_(RGB).svg

//TODO Have text 'autofit' to tab. Some inspiration: https://sentry.engineering/blog/perfectly-fitting-text-to-container-in-react
const Tab = ({className, tableId, tableSelection, includeOverlap, zIndex, text, color, editMode, handleChangeCB, handleTabSelectCB, handleColorSelectCB}) => {
    if (tableSelection === tableId) zIndex += 10;

    const handleMouseEnter = (e) => {
        if (e.currentTarget.scrollWidth > e.currentTarget.clientWidth) {
            e.currentTarget.title = text;
        } else {
            e.currentTarget.removeAttribute("title");
        }
    }

    const handleColorSelect = (e) => {
        handleColorSelectCB(e, tableId);
    }

    return (
        <div className={`flex flex-col items-center relative w-[var(--tabWidth)] h-[var(--tabHeight)] cursor-pointer ${includeOverlap ? "-ml-[var(--tabOverlap)]" : ""}`} onClick={() => handleTabSelectCB(tableId)}
             style={{zIndex: zIndex, "--tabColor": color}}>
            <div className={"absolute w-3/5 h-full flex flex-col items-center justify-center"}>
                <div className={"flex justify-center"}>
                    <input name={"name"} id={tableId} value={text} readOnly={!editMode} type={"text"} className={`text-white truncate w-full text-center focus:outline-none ${editMode ? "cursor-text" : "cursor-default pointer-events-none"} `} style={{zIndex: zIndex+1}} onMouseEnter={handleMouseEnter} onChange={handleChangeCB} />
                    <ColorWheelSVG className={`w-5 ${editMode ? "" : "hidden"}`} onClick={handleColorSelect}/>
                </div>
            </div>
            <TabSVG className={`${className} stroke-[var(--tabColor)] fill-fieldColor w-full h-full`}/>
        </div>
    )
}

export default Tab;