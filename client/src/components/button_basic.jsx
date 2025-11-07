import '../global.css'

const Button_Basic = ({text, callback, modifiers}) => {
    return (
        <button type={"button"} onClick={callback} className={`bg-fieldColor pt-2 pb-2 rounded-xl ring-1 ring-fieldRing grow-inherit cursor-pointer ${modifiers}`}>{text}</button>
    )
}

export default Button_Basic;