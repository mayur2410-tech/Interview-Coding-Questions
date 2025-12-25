import React, { useState } from 'react'

const Counter = () => {
  const[count,setCount]=useState(0);
  let min = 0 ; 
  let max= 10;

  function Increment(){
    setCount(count+1)
  }
  function Decrement(){
       setCount(count-1)
  }
  function Reset(){
       setCount(0)
  }

  return (
    <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
      <div>
        <h1 style={{marginLeft:"40px"}}> Count:{count}</h1>
        <div style={{display:'flex',gap:"5px"}}>

        <button onClick={Increment} disabled={count===max}>Increment</button>
        <button onClick={Decrement} disabled={count===min}>Decrement</button>
        <button onClick={Reset}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Counter
