import {useState, useEffect} from "react";
import Table from "./table.jsx";

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

    return (
        <div className={"w-screen flex flex-col justify-start items-center"}>
            <div className={"z-9 w-4/5"}>
                <Table id={tableSelection} />
            </div>
        </div>
    );
}

export default MultiTable;