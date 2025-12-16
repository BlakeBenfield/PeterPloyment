import MultiTable from "./components/multi-table.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "./components/navbar.jsx";

const Ppapp = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await fetch("http://peterployment.com/auth/status");
            const isLoggedIn = (await data.json()).authenticated;
            if (!isLoggedIn) navigate("/login", { replace: true });
        })();
    }, []);

    return (
        <div className={"w-full h-full flex flex-col"}>
            <Navbar />
            <MultiTable />
        </div>
    )
}

export default Ppapp;