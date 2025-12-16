import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    const navigate = useNavigate();

    return (
        <div className={"flex w-full"}>
            <div className={"m-3 mb-5 ml-[8vw] w-1/2"}>
                <p className={"cursor-pointer text-5xl text-transparent bg-clip-text bg-gradient-to-r from-baseColor via-baseColor to-[#EC4E20]"} onClick={() => {navigate("/")}}>
                    Peterployment
                </p>
            </div>
            <div className={"w-1/2 m-3 mb-5 mr-[5vw] flex justify-end"}>
                <button onClick={() => { window.location.assign("/logout") }} type={"button"} className={"text-white underline text-xl justify-self-end cursor-pointer"}>Logout</button>
            </div>
        </div>
    )
}

export default NavBar;