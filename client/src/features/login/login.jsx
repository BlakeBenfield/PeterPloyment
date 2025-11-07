import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../../global.css'
import TextField from "../../components/text-field.jsx";
import Button_Basic from "../../components/button_basic.jsx";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: "", password: ""})
    const [statusMessage, setStatusMessage] = useState("Error");
    const [statusVisible, setStatusVisible] = useState(false);
    const [isStatusError, setIsStatusError] = useState(false);


    const handleLogin = async () => {
        if (formData.email.length < 5 || formData.email.length > 255) {
            setStatusMessage("Enter a valid email");
            setStatusVisible(true);
            setIsStatusError(true);
            return;
        }

        if (formData.password.length < 1) {
            setStatusMessage("Enter a password");
            setStatusVisible(true);
            setIsStatusError(true);
            return;
        }

        if (formData.password.length > 255 ) {
            setStatusMessage("Enter a REAL password");
            setStatusVisible(true);
            setIsStatusError(true);
            return;
        }

        const urlEncodedData = new URLSearchParams({username: formData.email, password: formData.password}).toString();
        const response = await fetch("http://localhost:3000/login/password", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            body: urlEncodedData
        });
        if (!response.ok) {
            setStatusMessage("Invalid username or password");
            setStatusVisible(true);
            setIsStatusError(true);
        }

        setTimeout(() => navigate("/login"), 3000)
    }

    // 'inspired' by Mayank Shukla https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
    const onChange = e => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    return (
        <div className={"w-screen h-screen flex justify-center items-center"} >
            <div className="flex justify-center items-center flex-col bg-baseColor pl-12 pr-12 pt-25 pb-20 gap-15 ring-fieldRing ring-2 rounded-4xl">
                <h2 className={"text-white text-6xl"}>Log in</h2>
                <form className={"flex justify-center items-center flex-col gap-2"}>
                    <TextField fname={"email"} placeHolder={"Email"} secret={false} fValue={formData.email} submissionCB={handleLogin} changeCB={onChange}/>
                    <TextField fname={'password'} placeHolder={"Password"} secret={true} fValue={formData.password} submissionCB={handleLogin} changeCB={onChange}/>
                    <div className={"flex text-2xl text-white w-full justify-center "}>
                        <Button_Basic modifiers={"grow"} text={"Sign up"} callback={() => navigate("/signup")} />
                        <Button_Basic modifiers={"grow"} text={"Log in"} callback={handleLogin} />
                    </div>
                    <h3 className={`${isStatusError ? 'bg-errorFill ring-errorRing' : 'bg-green-600 ring-green-500'} p-4 mt-3 rounded-2xl w-full text-center ring-2 text-gray-200 text-xl ${statusVisible ? '' : 'hidden'}`}>{statusMessage}</h3>
                </form>
            </div>
        </div>
    )
}

export default Signup