import Row from "./row/row.jsx";
import {useEffect, useState} from "react";
import {useRef} from "react";

const Table = ({id}) => {
    const [tableData, setTableData] = useState({name: "", id:-1, color: "", currSelection: {rowId: -1, name: ""}, entries: []});
    const pendingSaves = useRef([]);
    const tableRef = useRef({});

    const getData = async () => {
        const result = await fetch(`http://localhost:3000/table/${id}`);
        const table = await result.json();
        setTableData({name: table.name, color: table.color, id: table.id, entries: table.entries, currSelection: {rowId: -1, name: ""}});
    }

    const startSaveLoop = () => {
        // TODO check if item fails, try 3 times, prompt user afterwards
        const interval = setInterval(async () => {
            try {
                let queue = pendingSaves.current;
                pendingSaves.current = [];
                if (queue.length < 1) return;
                for (let i = 0; i < queue.length; i++) {
                    let updatedObj = JSON.stringify(tableRef.current.entries[queue[i].rowId])
                    const result = await fetch(`http://localhost:3000/table/${id}/entry/${queue[i].id}`, {
                        method: "PUT",
                        body: updatedObj,
                        headers: [["Content-Type", "application/json"]]
                    });
                }
            } catch (e) { console.log(e); }

        }, 1000); //TODO change to 5 seconds, ask before unload if unsaved changes

        return () => clearInterval(interval);
    }

    useEffect(() => {
        tableRef.current = tableData;
    }, [tableData])

    useEffect( () => {
        getData();
        startSaveLoop();

    }, []);

    const onChange = (id, rowId, name, newValue) => {
        setTableData((prev) => {
            const newEntries = [...prev.entries];
            newEntries[rowId] = {
                ...newEntries[rowId],
                [name]: newValue
            }

            return {
                ...prev,
                entries: newEntries
            }
        });

        if (pendingSaves.current.find(n => n.rowId === rowId)) return;
        pendingSaves.current.push({id: id, rowId: rowId});
    }

    const onMenuSelection = (rowId, name) => {
        setTableData((prev) => {
            return {...prev, currSelection: {
               rowId: rowId,
               name: name
            }}
        });
    }

    return (
        <div className={"text-white flex flex-col"}>
            <p>Name: {tableData.name}</p>
            <p>Color: {tableData.color}</p>
            {tableData.entries.map((entry, index) => {
            return (<Row
                 rowId={index}
                 changeCB={onChange}
                 uiSelectionCB={onMenuSelection}
                 company={entry.company}
                 title={entry.title}
                 status={entry.status}
                 app_apply={entry.application_date}
                 app_open={entry.application_open}
                 app_close={entry.application_close}
                 notes={entry.notes}
                 preference={entry.preference}
                 id={entry.id}
                 currSelection={tableData.currSelection}
                         />)
        })}
        </div>
    )
}

export default Table;