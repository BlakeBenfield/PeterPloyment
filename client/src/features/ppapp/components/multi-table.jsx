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

    //TODO Have text 'autofit' to tab. Some inspiration: https://sentry.engineering/blog/perfectly-fitting-text-to-container-in-react
    const Tab = ({className, tableId, includeOverlap, zIndex, text}) => {
        if (tableSelection === tableId) zIndex += 10;

        const handleMouseEnter = (e) => {
            if (e.currentTarget.scrollWidth > e.currentTarget.clientWidth) {
                e.currentTarget.title = text;
            } else {
                e.removeAttribute("title");
            }
        }

        return (
            <div className={`flex flex-col items-center relative w-[var(--tabWidth)] h-[var(--tabHeight)] cursor-pointer ${includeOverlap ? "-ml-[var(--tabOverlap)]" : ""}`} onClick={() => handleTabSelect(tableId)} style={{zIndex: zIndex}}>
                <div className={"absolute w-3/5 h-full flex flex-col items-center justify-center"}>
                    <p className={"text-white truncate w-full text-center"} style={{zIndex: zIndex+1}} onMouseEnter={handleMouseEnter}>{text}</p>
                </div>
                <TabSVG className={`${className}  stroke-fieldRing fill-fieldColor w-full h-full`}/>
            </div>
        )
    }

    const Tabs = () => {
        const numTabs = Math.max(tables.length, 4);
        const overlapRatio = 0.22;
        return (
            <div className={"flex w-full h-full"}
            style={{
                "--tabWidth": `min(calc((100% - 5*0.25rem)/(${numTabs} - ${overlapRatio}*${numTabs - 1})), 15rem)`,
                "--tabHeight": "2rem",
                "--tabOverlap": `calc(var(--tabWidth)*${overlapRatio}`
            }}>
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
            <div className={"z-100 w-4/5 -mt-0.5"}>
                <Table id={tableSelection} />
            </div>
        </div>
    );
}

export default MultiTable;