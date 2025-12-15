import MultiTable from "./components/multi-table.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Ppapp = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const data = await fetch("http://localhost:3000/auth/status");
            const isLoggedIn = (await data.json()).authenticated;
            if (!isLoggedIn) navigate("/login", { replace: true });
        })();
    }, []);

    return (
        <div>
            <NavBar />
            <MultiTable />
        </div>
    )
}

export default Ppapp;