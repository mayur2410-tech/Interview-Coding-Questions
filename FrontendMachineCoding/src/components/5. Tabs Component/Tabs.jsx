import React from 'react'
import { useState } from 'react'
const Tabs = () => {
    const [activeTab,setActiveTab]=useState("home")
  return (
    <div style={{textAlign:'center'}}>
        <h1>Tabs Components</h1>

        <div >
            <button onClick={()=>setActiveTab("home")}>Home</button>
        
            <button onClick={()=>setActiveTab("Profile")}>Profile</button>
        
            <button onClick={()=>setActiveTab("Setting")}>Setting</button>
        </div>

        <div style={{marginTop:"20px"}}>
            {activeTab =="home" && <h3>Home Component</h3>}
            {activeTab =="Profile" && <h3>Profile Component</h3>}
            {activeTab =="Setting" && <h3>Setting Component</h3>}
        </div>
      
    </div>
  )
}

export default Tabs
