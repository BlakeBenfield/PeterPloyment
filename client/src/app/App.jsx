import { useState } from 'react';
import '../global.css';
import { Routes, Route } from "react-router-dom";
import Signup from "../features/signup/signup.jsx";
import Login from "../features/login/login.jsx";
import Home from "../features/home/home.jsx";
import Row from "../features/ppapp/components/row/row.jsx";
import Note from "../features/ppapp/components/row/components/note.jsx";
import Table from "../features/ppapp/components/table.jsx";
import TextEntry from "../features/ppapp/components/row/components/text-entry.jsx";
import DateEntry from "../features/ppapp/components/row/components/date-entry.jsx";
import SelectEntry from "../features/ppapp/components/row/components/select-entry.jsx";
import MultiTable from "../features/ppapp/components/multi-table.jsx";

function App() {

    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/login"} element={<Login />} />
            {<Route path={"/app"} element={<MultiTable />} />}
        </Routes>
    )
}

export default App