import Note from "./components/note.jsx";
import TextEntry from "./components/text-entry.jsx";
import DateEntry from "./components/date-entry.jsx";
import SelectEntry from "./components/select-entry.jsx";
import { statuses, preferences } from "./components/selectionOptions.jsx"

const Row = ({rowId, changeCB, uiSelectionCB, company, title, status, app_apply, app_open, app_close, notes, preference, id, currSelection}) => {

    const handleUIChange = (e) => {
        uiSelectionCB(rowId, e.target.name);
    }

    const handleChange = (e) => {
        changeCB(id, rowId, e.target.name, e.target.value);
    }

    return (
        <div className={"flex w-screen justify-center h-7"}>
            <TextEntry name={"company"} value={company} changeCB={handleChange}/>
            <TextEntry name={"title"} value={title} changeCB={handleChange}/>
            <DateEntry name={"application_date"} value={app_apply} changeCB={handleChange}/>
            <DateEntry name={"application_open"} value={app_open} changeCB={handleChange}/>
            <DateEntry name={"application_close"} value={app_close} changeCB={handleChange}/>
            <SelectEntry name={"status"} value={status} changeCB={handleChange} UIOpenedCB={handleUIChange} options={statuses} isShown={currSelection.rowId === rowId && currSelection.name === "status"}/>
            <SelectEntry name={"preference"} value={preference} changeCB={handleChange} UIOpenedCB={handleUIChange} options={preferences} isShown={currSelection.rowId === rowId && currSelection.name === "preference"}/>
            <Note name={"notes"} value={notes} changeCB={handleChange} UIOpenedCB={handleUIChange} isShown={currSelection.rowId === rowId && currSelection.name === "notes"}/>
        </div>
    );

}

export default Row;