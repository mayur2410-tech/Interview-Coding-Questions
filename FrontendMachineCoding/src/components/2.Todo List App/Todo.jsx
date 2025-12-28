import React, { useState ,useEffect} from 'react'

const Todo = () => {
    const[input,setInput]=useState("")
    const[todo,setTodo]=useState([])

     //add todos to local storage
    useEffect(()=>{
      if(todo.length > 0){

        localStorage.setItem("todos", JSON.stringify(todo))
        console.log("Save to local storage : ",todo)
      }
    },[todo])


    //get from local storage 
    useEffect(()=>{
      const saveTodos = JSON.parse(localStorage.getItem("todos"))
      if(saveTodos){
        console.log("come from local storage:",saveTodos)
        setTodo(saveTodos)
      }
    },[])

   


     function addTodo() {
        if(!input){
            alert("Empty Todo plz add todo")
            return
            
        }
        console.log("runds")
        const newTodo = {
            id:new Date().getTime(),
            title:input,
            completed:false
        }
        setTodo([...todo,newTodo])
        setInput("")
        
    }
    function handleKey(e){
        if(e.key==="Enter"){
            addTodo()
        }
    }

    function toggleCompleted(id){
        const newTodo = todo.map((todo)=>{
            return {...todo}
        })
        newTodo.filter((todo)=>{
            if(todo.id===id){
                todo.completed=!todo.completed
            }
        })
        setTodo(newTodo)
    }

    function deleteTodo(id){
        const deleteTodo = todo.filter((todo)=>{
            return todo.id!==id
        })
        setTodo(deleteTodo)
    }
  return (
    <div>
      <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
        <div>
        <h1>Todo Application</h1>
        </div>
        <div>

        <input type="text" 
        value={input}
        onKeyDown={handleKey}
        onChange={(e)=>setInput(e.target.value)}
        placeholder='Add todo'
        />
        <button onClick={addTodo}>Add Todo</button>
        <ul>
            {todo.map((todo)=>(
            

                    <li style={{display:'flex',border:"2px solid grey",padding:"10px",width:"auto",borderRadius:"10px",justifyContent:"space-between"}}key={todo.id}>
                      <span
                      style={{
                        textDecoration: todo.completed ? "line-through":"none",
                        cursor:'pointer'
                      }}
                      >{todo.title}</span>
                      <div>

                    <button  onClick={()=>toggleCompleted(todo.id)}>✅</button>
                    <button onClick={()=>deleteTodo(todo.id)}>❌</button>
                      </div>
                    </li>
               
            ))}
        </ul>
        </div>


      </div>
    </div>
  )
}

export default Todo
