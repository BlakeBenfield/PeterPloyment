import Note from "./components/note.jsx";
import TextEntry from "./components/text-entry.jsx";
import DateEntry from "./components/date-entry.jsx";
import SelectEntry from "./components/select-entry.jsx";
import { statuses, preferences } from "./components/selectionOptions.jsx"

const Row = ({rowId, changeCB, uiSelectionCB, company, title, status, app_apply, app_open, app_close, notes, preference, id, currSelection, isLast}) => {

    const handleUIChange = (e) => {
        uiSelectionCB(rowId, e.target.name);
    }

    const handleChange = (e) => {
        changeCB(id, rowId, e.target.name, e.target.value);
    }

    return (
        <div className={"flex justify-center h-7"}>
            <TextEntry name={"company"} value={company} changeCB={handleChange} className={isLast ? "border-b" : ""}/>
            <TextEntry name={"title"} value={title} changeCB={handleChange} className={isLast ? "border-b" : ""}/>
            <DateEntry name={"application_date"} value={app_apply} changeCB={handleChange} className={isLast ? "border-b" : ""}/>
            <DateEntry name={"application_open"} value={app_open} changeCB={handleChange} className={isLast ? "border-b" : ""}/>
            <DateEntry name={"application_close"} value={app_close} changeCB={handleChange} className={isLast ? "border-b" : ""}/>
            <SelectEntry name={"status"} value={status} changeCB={handleChange} UIOpenedCB={handleUIChange} options={statuses} isShown={currSelection.rowId === rowId && currSelection.name === "status"} className={isLast ? "border-b" : ""}/>
            <SelectEntry name={"preference"} value={preference} changeCB={handleChange} UIOpenedCB={handleUIChange} options={preferences} isShown={currSelection.rowId === rowId && currSelection.name === "preference"} className={isLast ? "border-b" : ""}/>
            <Note name={"notes"} value={notes} changeCB={handleChange} UIOpenedCB={handleUIChange} isShown={currSelection.rowId === rowId && currSelection.name === "notes"} className={isLast ? "border-b" : ""}/>
        </div>
    );

}

export default Row;