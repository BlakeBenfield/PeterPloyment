import {useState, useEffect, useRef} from "react";
import Table from "./table.jsx";
import EditSVG from '../../../assets/edit.svg?react'
import Tab from "./components/tab.jsx";
import Sketch from '@uiw/react-color-sketch';
import TableAddSVG from '../../../assets/tableadd.svg?react'

const MultiTable = () => {
    const [tables, setTables] = useState([]);
    const [tableSelection, setTableSelection] = useState(-1);
    const [editMode, setEditMode] = useState(false);
    const [colorUIPos, setColorUIPos] = useState({x: 0, y:0});
    const [colorUISelection, setColorUISelection] = useState(-1);
    const [colorUIVisible, setColorUIVisible] = useState(false);
    const [color, setColor] = useState({h: 0, s: 0, v: 0, a:1});
    const pendingSaves = useRef([]);
    const tablesRef = useRef({});

    const numTabs = Math.max(tables.length, 4);
    const overlapRatio = 0.22;

    useEffect(() => {
        getData();
        startSaveLoop();
    }, []);

    useEffect(() => {
        tablesRef.current = tables;
    }, [tables])

    const getData = async () => {
        const response = await fetch("http://localhost:3000/tables");
        const tables = await response.json();
        setTables(tables);
        if (tables.length > 0) setTableSelection(tables[0].id);
    }

    const saveChanges = async () => {
        try {
            let queue = pendingSaves.current;
            pendingSaves.current = [];
            if (queue.length < 1) return;
            for (let i = 0; i < queue.length; i++) {
                let table = tablesRef.current.find(n => n.id == queue[i])
                let updatedObj = JSON.stringify(table);

                const result = await fetch(`http://localhost:3000/table/${table.id}`, {
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

    const handleTabSelect = (id) => {
        if (editMode) return;
        setTableSelection(id);
    }

    const handleTabChange = (e) => {
        setTables(prev => {
            let tableIndex = -1;
            let table = prev.find((element, index) => {
                if (element.id == e.target.id) { // The one time I like type coercion
                    tableIndex = index;
                    return true;
                }
            });

            if (tableIndex === -1) return prev;

            let newTables = [...prev];
            newTables[tableIndex] = {...table, [e.target.name]: e.target.value};

            if (!pendingSaves.current.includes(e.target.id)) {
                pendingSaves.current.push(e.target.id);
            }
            return newTables;
        });
    }

    const handleTableEditToggle = () => {
        setEditMode(prev => {
            return !prev;
        });
        setColorUIVisible(false);

    }

    const handleColorUI = (e, id) => {
        setColorUIPos({x: e.clientX, y: e.clientY + 15});
        if (colorUISelection === -1 || colorUISelection === id) {
            setColorUIVisible(prev => { return !prev});
        }
        setColorUISelection(id);

        setColor(tables.find(value => value.id === id).color);

    }

    const handleColorChange = (color) => {
        setColor(color.hex);
        (tables.find(value => value.id === colorUISelection)).color = color.hex;
        let event = {target: {id: colorUISelection, name: "color", value: color.hex}};
        handleTabChange(event);
    }

    const handleTableDelete = async (id, name) => {
        //TODO make in-app window
        const ok = window.confirm(`Are you sure you want to delete table ${name}? This CANNOT be undone`);
        if (!ok) return;

        const result = await fetch(`http://localhost:3000/table/${id}`, {
            method: "DELETE"
        });

        getData();
    }

    const handleTableAdd = async () => {
        //TODO On max tables, notify user
        const result = await fetch(`http://localhost:3000/table`, {
            method: "POST",
            body: "{}",
            headers: [["Content-Type", "application/json"]]
        });

        getData();
    }

    return (
        <div className={"w-screen flex flex-col justify-start items-center"}>
            <div className={"flex w-[85%]"}>
                <div className={"flex w-full h-full"}
                     style={{
                         "--tabWidth": `min(calc((100% - ((5 + 8)*0.25rem))/(${numTabs} - ${overlapRatio}*${numTabs - 1})), 15rem)`,
                         "--tabHeight": "2rem",
                         "--tabOverlap": `calc(var(--tabWidth)*${overlapRatio}`
                     }}>
                    {tables.map((table, index) => {
                        return (
                            <Tab key={table.id}
                                 includeOverlap={index !== 0}
                                 tableId={table.id}
                                 zIndex={8 - index}
                                 text={table.name}
                                 color={table.color}
                                 colorUIEnabled={index === 0}
                                 tableSelection={tableSelection}
                                 editMode={editMode}
                                 handleChangeCB={handleTabChange}
                                 handleTabSelectCB={handleTabSelect}
                                 handleColorSelectCB={handleColorUI}
                                 handleTableDeleteCB={handleTableDelete}
                            />
                        )
                    })}
                    <div className={"flex"} >
                        <TableAddSVG className={`w-6 ${editMode ? '' : 'hidden'} fill-white `} onClick={handleTableAdd}/>
                        <EditSVG className={"w-6 cursor-pointer fill-white"} onClick={handleTableEditToggle}/>
                    </div>
                </div>
            </div>
            <div className={"z-30 w-[85%] -mt-0.5"}>
                <Table id={tableSelection} />
            </div>
            <div className={`fixed z-50 ${colorUIVisible ? '' : 'hidden'} `} style={{left: colorUIPos.x, top: colorUIPos.y}}>
                <Sketch color={color} disableAlpha={true} onChange={handleColorChange}/>
            </div>
        </div>
    );
}

export default MultiTable;