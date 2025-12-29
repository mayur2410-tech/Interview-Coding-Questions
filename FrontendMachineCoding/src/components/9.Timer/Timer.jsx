import React, { useRef, useState } from 'react'

const Timer = () => {
    const[time,setTime]=useState(0);
    const[isRunning,setIsRunning]=useState(false)
    const intervalRef = useRef(null)

function start(){
    if(isRunning) return;
     setIsRunning(true)
     intervalRef.current = setInterval(()=>{
        setTime((prev)=>prev+1)
     },1000)
    
}
function pause(){
    clearInterval(intervalRef.current)
    intervalRef.current=null
    setIsRunning(false)

}
function reset(){
clearInterval(intervalRef.current)
intervalRef.current=null
setIsRunning(false)
setTime(0)
}

  return (
    <div style={{display:'flex',justifyContent:"center",alignItems:"center",marginTop:"50px",flexDirection:"column"}}>
      <h2>Timer App</h2>
      <h1>{time}</h1>
      <div>

      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Stop</button>
      </div>
    </div>
  )
}

export default Timer
