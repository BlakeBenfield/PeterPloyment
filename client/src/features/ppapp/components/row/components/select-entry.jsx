import XIcon from '../../../../../assets/x-symbol.svg?react';

const SelectEntry = ({name, value, options, isShown, changeCB, UIOpenedCB}) => {
    const handleSelection = (e) => {
        e.target.name = e.currentTarget.name;
        e.target.value = e.currentTarget.value;
        changeCB(e);
        handleUIClose(e);
    }

    const handleUIOpen = (e) => {
        e.target.name = name;
        UIOpenedCB(e);
    }

    const handleUIClose = (e) => {
        e.target.name = "close";
        UIOpenedCB(e);
    }

    const Option = ({value}) => {
        const element = options.find(n => n.text === value)
        const color = element ? element.color : "#646464"
        return (
            <h2 className={`text-white text-xl flex items-center justify-center cursor-pointer w-50 h-6 rounded-2xl`} style={{backgroundColor: color}}>
                {value}
            </h2>
        )
    }

    return (
        <div>
            <div>
                <button onClick={handleUIOpen} title={"Select"} className={"h-7 w-60 flex justify-center items-center bg-fieldColor border-gray-400 border-1"}>
                    <Option value={value}/>
                </button>
            </div>
            <div className={`${isShown ? "" : "hidden" } top-0 left-0 fixed z-5 flex items-center justify-center w-screen h-screen pointer-events-none`}>
                <div className={`w-75 pointer-events-auto`}>
                    <div className={"relative"}>
                        <button className={"absolute w-full h-full cursor-pointer"} onClick={handleUIClose}>
                            <XIcon className={"w-5 h-5 fill-white absolute top-1 right-1 m-1"}/>
                        </button>
                    </div>
                    <div className={"flex items-center justify-center gap-1 flex-col bg-fieldColor pt-10 pb-5 rounded-2xl"}>
                        {
                            options.map((element) => {
                                return (
                                    <button name={name} value={element.text} onClick={handleSelection}>
                                        <Option value={element.text}/>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SelectEntry;