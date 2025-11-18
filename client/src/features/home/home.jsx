import { useNavigate } from 'react-router-dom';
import '../../global.css'

// Some help from https://stackoverflow.com/questions/71205457/how-to-add-a-linear-gradient-to-text-in-tailwind-css
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className={"flex justify-center items-center flex-col"}>
            <div className={"w-screen flex justify-end mr-50 mt-5"}>
                <button onClick={() => {navigate('/login')}} type={"button"} className={"text-white underline text-xl justify-self-end cursor-pointer"}>Login</button>
            </div>
            <h1 className={"text-9xl text-transparent bg-clip-text bg-gradient-to-r from-baseColor via-baseColor to-[#EC4E20]"}>
                Peterployment
            </h1>
            <h3 className={"text-white text-2xl mt-10"} >Helping you keep track of the job market trenches</h3>

        </div>
    );
}

export default Home;