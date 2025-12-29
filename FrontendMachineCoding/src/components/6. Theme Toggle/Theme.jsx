import React, { useState,useEffect } from 'react'

const Theme = () => {
    const[theme,setTheme]=useState('light')
    function toggleTheme(){
        setTheme(theme ==='light'?"dark":'light')
    }

    //get theme from localStorage
    useEffect(()=>{
        const saveTheme = localStorage.getItem('theme')
        if(saveTheme){
            setTheme(saveTheme)
        }
    },[])

    //set to localstorage
    useEffect(()=>{
        localStorage.setItem('theme',theme)
    },[theme])
  return (
    <div style={{display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center",height:'100vh',color:theme ==='light'?"white":"black",backgroundColor: theme==='light'?'black':"white"}}>
      <h1>{theme.toUpperCase()} MODE</h1>
      <button onClick={toggleTheme}>
        {theme==='light'?"Dark":"Light"}
      </button>
    </div>
  )
}

export default Theme
