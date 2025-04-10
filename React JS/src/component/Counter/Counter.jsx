import React, { useState } from 'react'

const Counter = () => {

    const [counter, setCounter] = useState(0);
    const [error, setError] = useState('');

    const Increment = () => {
        if (counter < 10) {

            setCounter(counter + 1)
            setError('');
        } else {
            setError("Counter Cannot greator than 10")
        }
    }
    const Decrement = () => {
        if (counter > 0) {

            setCounter(counter - 1)
            setError('');
        }
        else {
            setError("counter Cannnot go in Negative");
        }
    }
    const Reset = () => setCounter(0)

    return (
        <div >
            <div>

                <h1 >{counter}</h1>
                {error && <p>{error}</p>}
            </div>
            <div >

                <button onClick={Increment}>Increment</button>
                <button onClick={Decrement}>Decrement</button>
                <button onClick={Reset}>Reset</button>
            </div>
        </div>
    )
}

export default Counter
