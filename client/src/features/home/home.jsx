import { useNavigate } from 'react-router-dom';
import '../../global.css'
import tableExample from '../../assets/tableexample.png'

// Some help from https://stackoverflow.com/questions/71205457/how-to-add-a-linear-gradient-to-text-in-tailwind-css
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className={"flex justify-center items-center flex-col gap-10"}>
            <div className={"z-20 w-screen flex gap-5 justify-end mr-25 mt-5"}>
                <button onClick={() => {navigate('/login')}} type={"button"} className={"text-white underline text-xl justify-self-end cursor-pointer"}>Login</button>
                <button onClick={() => {navigate('/app')}} type={"button"} className={"text-white underline text-xl justify-self-end cursor-pointer"}>Go to app</button>

            </div>
            <h1 className={"text-9xl text-transparent bg-clip-text bg-gradient-to-r from-baseColor via-baseColor to-[#EC4E20]"}>
                Peterployment
            </h1>
            <h3 className={"text-white text-2xl mt-10"} >Helping you keep track of the job market trenches</h3>

            <img className={"mt-35 w-300"} src={tableExample} />

            <h3 className={"text-white text-2xl mt-10"} >Stay organized with a convenient multi-table system</h3>
            <h3 className={"text-white text-2xl mt-30 mb-30"} >
                Find this app to be pretty barren? Yeah we are working on it.
                <br/>
                <br/>
                Upcoming features are:
                <br/>
                - AI Autofill
                <br/>
                - Update notifications
                <br/>
                - Email Scanning
                <br/>
                - Forgot password
                <br/>
                <br/>
                Upcoming Quality of life:
                <br/>
                - Row sorting and copying
                <br/>
                - Variable column widths
                <br/>
                - Better UI closure
                <br/>
            </h3>

            <h3 className={"text-white text-2xl mt-30 mb-30"}>
                If this app was useful to you
                <br/>
                please consider <button className={"cursor-pointer underline"} type={"button"} onClick={() => {window.location.assign("https://github.com/BlakeBenfield/PeterPloyment")}}>starring the repo on github</button>
            </h3>
        </div>
    );
}

export default Home;