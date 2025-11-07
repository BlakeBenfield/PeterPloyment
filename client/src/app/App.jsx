import { useState } from 'react'
import '../global.css'
import Signup from "../features/signup/signup.jsx";

const CounterButton = () => {
    const [count, setCount] = useState(0);
    return (
        <button className="text-4xl font-bold w-screen text-center" onClick={() => {
            setCount(count +1);
        }}>
            I've been clicked {count} times!
        </button>
    )
}

function App() {

  return (
      <>
          <Signup />
      </>
  )
}

export default App
