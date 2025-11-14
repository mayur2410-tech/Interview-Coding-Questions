import React from 'react'
import { useState } from 'react'
const ColorChange = () => {
const [color,setColor]=useState(false)
    function ChangeColor(){
        setColor(!color)
    }
  return (
    <div style={{backgroundColor: color ? "red" : "blue" }}>
        {/* <h1>ngkadb</h1> */}
      <button onClick={ChangeColor}>Click to chage color</button>
    </div>
  )
}

export default ColorChange
