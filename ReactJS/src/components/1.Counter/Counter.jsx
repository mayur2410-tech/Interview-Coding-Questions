import React, { useState } from 'react'

const Counter = () => { 
    const [count,setCount]=useState(0);
    function Increment(){
        setCount(count + 1)
        if(count>=10){
            alert("Count cannot exceed 10" )
            setCount(10)
        }
    }
    function Decrement(){
        setCount(count - 1)
        if(count<=0){
            setCount(0)
            alert("Count cannot be negative" )
        }
    }
    function Reset(){
        setCount(0)
    }
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',justifyContent:'center'}}>
        <div>

      <h1>{count}</h1>
        </div>
        <div style={{display:'flex',gap:'10px'}}>
      <button onClick={Increment}>Increment</button>
      <button onClick={Decrement}>Decrement</button>
      <button onClick={Reset}>Reset</button>

        </div>
    </div>
  )
}

export default Counter
