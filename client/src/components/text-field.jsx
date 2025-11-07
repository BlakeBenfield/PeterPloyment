import '../global.css'

const TextField = ({fname, placeHolder, secret, fValue, submissionCB, changeCB}) => {
    return (
        <>
            <input className={"text-white text-2xl bg-fieldColor rounded-xl pl-5 pt-2 pb-2 w-80 ring-fieldRing ring-1 m-0"}
                   name={fname ? fname : placeHolder}
                   id={"field"}
                   type={secret ? "password": "text"}
                   placeholder={placeHolder}
                   value ={fValue}
                   onKeyUp={e => { if (e.key === 'Enter') submissionCB(e)}}
                   onChange={changeCB}
            />
        </>
    )
}

export default TextField