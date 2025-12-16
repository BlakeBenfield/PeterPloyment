import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../../global.css'
import TextField from "../../components/text-field.jsx";
import Button_Basic from "../../components/button_basic.jsx";


const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: "", password: "", password_confirmed: ""})
    const [statusMessage, setStatusMessage] = useState("Error");
    const [statusVisible, setStatusVisible] = useState(false);
    const [isStatusError, setIsStatusError] = useState(false);


    const handleSignup = async () => {
        // Local checks
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!emailRegex.test(formData.email)) {
            setStatusMessage("Invalid email");
            setStatusVisible(true);
            setIsStatusError(true);
            return;
        }

        if (formData.password !== formData.password_confirmed) {
            setStatusMessage("Passwords do not match!");
            setStatusVisible(true);
            setIsStatusError(true);
            return;
        }

        if (formData.password.length < 8) {
            setStatusMessage("Password must be at least 8 chars");
            setStatusVisible(true);
            setIsStatusError(true);
            return;
        }

        if (formData.password.length > 64) {
            setStatusMessage("Password can be a max of 64 characters long");
            setStatusVisible(true);
            setIsStatusError(true);
            return;
        }

        const response = await fetch("http://peterployment.com/signup", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        let data = (await response.json()).message;
        data += response.ok ? " Redirecting..." : "";
        setStatusMessage(data);
        setStatusVisible(true);
        setIsStatusError(!response.ok);

        setTimeout(() => navigate("/login", { replace: true }), 3000)
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
                <h2 className={"text-white text-6xl"}>Sign up</h2>
                <form className={"flex justify-center items-center flex-col gap-2"}>
                        <TextField fname={"email"} placeHolder={"Email"} secret={false} fValue={formData.email} submissionCB={handleSignup} changeCB={onChange}/>
                        <TextField fname={'password'} placeHolder={"Password"} secret={true} fValue={formData.password} submissionCB={handleSignup} changeCB={onChange}/>
                        <TextField fname={'password_confirmed'} placeHolder={"Confirm Password"} secret={true} fValue={formData.password_confirmed} submissionCB={handleSignup} changeCB={onChange}/>
                        <div className={"flex text-2xl text-white w-full justify-center "}>
                            <Button_Basic text={"Sign up"} modifiers={"grow"} callback={handleSignup} />
                            <Button_Basic text={"Log in"} modifiers={"grow"} callback={() => navigate("/login")} />
                        </div>
                        <h3 className={`${isStatusError ? 'bg-errorFill ring-errorRing' : 'bg-green-600 ring-green-500'} p-4 mt-3 rounded-2xl w-full text-center ring-2 text-gray-200 text-xl ${statusVisible ? '' : 'hidden'}`}>{statusMessage}</h3>
                </form>
            </div>
        </div>
    )
}

export default Signup