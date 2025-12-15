import Row from "./components/row.jsx";
import {useEffect, useState} from "react";
import {useRef} from "react";
import AddIcon from '../../../assets/add.svg?react'
import TrashIcon from '../../../assets/trash.svg?react'
import TextEntry from "./components/components/text-entry.jsx";

const Table = ({className, id}) => {
    const [tableData, setTableData] = useState({name: "", id:-1, color: "", currSelection: {rowId: -1, name: ""}, entries: []});
    const pendingSaves = useRef([]);
    const tableRef = useRef({});

    const getData = async () => {
        if (pendingSaves.current.length > 0) await saveChanges();
        const result = await fetch(`http://localhost:3000/table/${id}`);
        const table = await result.json();
        sortRows(table.entries);
        setTableData({name: table.name, color: table.color, id: table.id, entries: table.entries, currSelection: {rowId: -1, name: ""}});
    }

    const sortRows = (rows) => {
        rows.sort((a, b) => {
            if (a.company === b.company) {
                if (a.title === b.title) return a.id >= b.id ? -1 : 1;
                if (!a.title) return 1;
                if (!b.title) return -1;
                return a.title.toLowerCase() >= b.title.toLowerCase() ? 1 : -1;
            } else {
                if (!a.company) return 1;
                if (!b.company) return -1;
                return a.company.toLowerCase() >= b.company.toLowerCase() ? 1 : -1;
            }
        })
    }

    const saveChanges = async () => {
        try {
            let queue = pendingSaves.current;
            pendingSaves.current = [];
            if (queue.length < 1) return;
            for (let i = 0; i < queue.length; i++) {
                let updatedObj = JSON.stringify(tableRef.current.entries.find(n => n.id === queue[i]), (key, value) => {
                    if (value === '') return null;
                    return value;
                });

                const result = await fetch(`http://localhost:3000/table/${tableRef.current.id}/entry/${queue[i]}`, {
                    method: "PUT",
                    body: updatedObj,
                    headers: [["Content-Type", "application/json"]]
                });
            }
        } catch (e) { console.log(e); }
    }

    const startSaveLoop = () => {
        // TODO check if item fails, try 3 times, prompt user afterwards, NOT ON 400 res, client fault
        const interval = setInterval(async () => {
            await saveChanges();

        }, 1000);

        return () => {
            clearInterval(interval);
            saveChanges();
        }
    }

    useEffect(() => {
        getData();
    }, [id]);

    useEffect(() => {
        tableRef.current = tableData;
    }, [tableData])

    useEffect( () => {
        return startSaveLoop();
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

        if (pendingSaves.current.includes(id)) return;
        pendingSaves.current.push(id);
    }

    const onMenuSelection = (rowId, name) => {
        setTableData((prev) => {
            return {...prev, currSelection: {
               rowId: rowId,
               name: name
            }}
        });
    }

    const addRow = async () => {
        await fetch(`http://localhost:3000/table/${id}/entry`, {
            method: "POST",
            headers: [["Content-Type", "application/json"]],
            body: `{\"table_id\":${id}}`
        });
        await getData();
    }

    const deleteRow = async (e) => {
        await fetch(`http://localhost:3000/table/${id}/entry/${e.target.entryId}`, {
            method: "DELETE"
        });
        await getData();
    }

    const TableControlsFooter = () => {
        return (
            <div className={"flex w-full items-center"}>
                <div className={"flex flex-row items-start"} onClick={addRow}>
                    <AddIcon className={"fill-white w-7 h-7"}/>
                    <p> Add a new row</p>
                </div>
            </div>
        );

    }

    const TrashButtonIcon = ({className, entryId, CB}) => {
        const handleClick = (e) => {
            e.target.entryId = entryId;
            CB(e);
        }
        return (
            <TrashIcon className={className} onClick={handleClick}/>
        )
    }

    //TODO DRY exists for a reason
    return (
        <div className={"flex items-center justify-center w-full"}>
            <div className={"text-white flex flex-col w-full"}>
                <div className={"flex justify-start h-7"}>
                    <TextEntry className={"text-center font-bold text-[min(1.75cqw, var(--text-lg))]"} value={"Company"}/>
                    <TextEntry className={"text-center font-bold text-[min(1.75cqw, var(--text-lg))]"} value={"Title"}/>
                    <TextEntry className={"text-center font-bold text-[min(1.75cqw, var(--text-lg))]"} value={"Date Applied"}/>
                    <TextEntry className={"text-center font-bold text-[min(1.75cqw, var(--text-lg))]"} value={"Date Opened"}/>
                    <TextEntry className={"text-center font-bold text-[min(1.75cqw, var(--text-lg))]"} value={"Date Closed"}/>
                    <TextEntry className={"text-center font-bold text-[min(1.75cqw, var(--text-lg))]"} value={"Status"}/>
                    <TextEntry className={"text-center font-bold text-[min(1.75cqw, var(--text-lg))]"} value={"Preference"}/>
                </div>
                {tableData.entries.map((entry, index) => {
                return (
                    <div className={"flex row justify-start"} key={entry.id}>
                        <Row
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
                         />
                        <TrashButtonIcon className={"w-5 h-5 shrink-0"} entryId={entry.id} CB={deleteRow}/>
                    </div>
                        )
            })}
                <TableControlsFooter />
            </div>
        </div>
    )
}

export default Table;