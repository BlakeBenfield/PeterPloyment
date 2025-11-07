import { useState } from 'react'
import './App.css'

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
          <p className="text-4xl font-bold text-center">
              Hello world!
          </p>
          <CounterButton />
      </>
  )
}

export default App
