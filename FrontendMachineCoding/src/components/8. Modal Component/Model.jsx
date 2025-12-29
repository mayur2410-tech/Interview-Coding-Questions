import React from 'react'
import { useEffect } from 'react'

const Model = ({isOpen,onClose,children}) => {

    useEffect(() => {

        function handleKey(e){
            if(e.key=='Escape'){
                onClose()
            }
        }


        if(isOpen){
            document.addEventListener("keydown",handleKey)
        }
      
    
      return () => {
        document.removeEventListener("keydown",handleKey)
      }
    }, [isOpen,onClose])
    

    if(!isOpen){
        return null
    }
  return (
    <div style={{position:"fixed",top:0,left:0,display:'flex',justifyContent:"center",alignItems:'center',height:"100vh",width:'100vw'}} onClick={onClose} >
        <div style={{border:"2px solid black",padding:"20px",borderRadius:"20px"}}  onClick={(e)=>e.stopPropagation()}>
            <button onClick={onClose} style={{float:'right'}}>
                ❌
            </button>
            {children}
        </div>
      
    </div>
  )
}

export default Model
