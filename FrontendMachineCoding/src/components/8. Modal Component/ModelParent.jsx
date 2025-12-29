import React, { useState } from 'react'
import Model from './Model'

const ModelParent = () => {
    const[open,setOpen]=useState(false)
  return (
    <div style={{display:'flex',justifyContent:"center",alignItems:'center',marginTop:"50px"}}>
      <button onClick={()=>setOpen(true)}>Open Model</button>
      <Model isOpen={open}  onClose={()=>setOpen(false)} >
        <h2>Model Title</h2>
        <p>Modle title desxiption</p>
      </Model>
    </div>
  )
}

export default ModelParent
