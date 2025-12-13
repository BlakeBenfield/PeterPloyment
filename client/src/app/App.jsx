import { useState } from 'react';
import '../global.css';
import { Routes, Route } from "react-router-dom";
import Signup from "../features/signup/signup.jsx";
import Login from "../features/login/login.jsx";
import Home from "../features/home/home.jsx";
import Ppapp from "../features/ppapp/ppapp.jsx";

function App() {

    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/login"} element={<Login />} />
            {<Route path={"/app"} element={<Ppapp />} />}
        </Routes>
    )
}

export default App