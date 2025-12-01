import {useState, useEffect} from "react";
import Table from "./table.jsx";
import TabSVG from '../../../assets/tab.svg?react'

const MultiTable = () => {
    const [tables, setTables] = useState([]);
    const [tableSelection, setTableSelection] = useState(-1);

    const init = async () => {
        const response = await fetch("http://localhost:3000/tables");
        const tables = await response.json();
        setTables(tables);
        if (tables.length > 0) setTableSelection(tables[0].id);
    }
    useEffect(() => {
        init();
    }, []);

    const handleTabSelect = (id) => {
        setTableSelection(id);
    }

    const Tab = ({className, tableId, includeOverlap, zIndex, text}) => {
        let fittedText = text;
        if (text.length > 8) fittedText = text.substring(0, 5) + '...';
        if (tableSelection === tableId) zIndex += 50;
        return (
            <div className={`relative w-[var(--tabWidth)] cursor-pointer ${includeOverlap ? "-ml-[calc(var(--tabWidth)*0.22)]" : ""}`} onClick={() => handleTabSelect(tableId)} style={{zIndex: zIndex}}>
                <div className={"absolute w-full h-full flex flex-col items-center"}>
                    <p className={"text-white"} style={{zIndex: zIndex+1}}>{fittedText}</p>
                </div>
                <TabSVG className={`${className}  stroke-fieldRing fill-fieldColor w-full h-full`}/>
            </div>
        )
    }

    const Tabs = () => {
        return (
            <div className={"flex w-full h-full"}>
                {tables.map((table, index) => {
                    if (index === 0) {
                        return (
                            <Tab includeOverlap={false} tableId={table.id} zIndex={8 - index} text={table.name}/>
                        )
                    } else {
                        return (
                            <Tab includeOverlap={true} tableId={table.id} zIndex={8 - index} text={table.name}/>
                        )
                    }
                    })}
            </div>
        )
    }

    return (
        <div className={"w-screen flex flex-col justify-start items-center"}>
            <div className={"flex w-4/5"}>
                <Tabs />
            </div>
            <div className={"z-9 w-4/5"}>
                <Table id={tableSelection} />
            </div>
        </div>
    );
}

export default MultiTable;