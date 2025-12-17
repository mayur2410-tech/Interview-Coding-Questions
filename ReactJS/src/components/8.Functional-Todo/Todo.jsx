import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from "axios"

const Todo = () => {

    const[title,setTitle]=useState('');
    const[priority,setPriority]=useState('');
    const[todos,setTodos]=useState([]);

    const getTodo = async()=>{
        try{
                const res = await axios.get("http://localhost:3000/get/todos");
                setTodos(res.data.todos)
                // console.log("all todos",res.data.todos)
        }catch(error){
            console.log("error in fetching ",error)

        }
    }

    useEffect(()=>{
        getTodo();
    },[])


const addTodo = async()=>{

    try{

        if(!title || !priority) {
            alert("Boht are required")
        }

        await axios.post("http://localhost:3000/add/todo",
           { id:Date.now(),
            title,
            priority}

        )
        setTitle("");
        setPriority('')
        getTodo()

    }catch(error){
console.log("error in posting",error)
    }

}

const deleteTodo = async (id)=>{
    try{
        axios.delete(`http://localhost:3000/delete/todo/${id}`)
        getTodo()
    }catch(error){
        console.log("error in deleting todo",error)
    }

}

const updateStatus = async (id,newStatus)=>{
    try{
        await axios.put(`http://localhost:3000/update/todo/${id}`,{
            status:newStatus
        })
        getTodo();

    }catch(error){
        console.log("error in status updating",error)
    }
}


  return (
    <div style={{padding:"20px"}}>
        <h2>Todo App</h2>

        <div style={{display:"flex"}}>
            {/* <form action=""> */}
                <input type="text"
                value={title}
                placeholder='Todo Title'
                onChange={(e)=>setTitle(e.target.value)}
                />
                <select  
                onChange={(e)=>setPriority(e.target.value)}
                >
                    <option value="">Select the Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button  onClick={addTodo}>Add Todo</button>
            {/* </form> */}
        </div>

 <ul className="todo-list">
  {todos.map(item => (
    <li key={item.id} className="todo-item">
  <span className="title">{item.title}</span>
      <span className="title">Status:{item.status}</span>
      <span className="priority">Priority: {item.priority}</span>
      
        <select
        value={todos.status}
        onChange={(e)=>updateStatus(item.id,e.target.value)}
        >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
        </select>

      <button onClick={()=>deleteTodo(item.id)}>Delete</button>
    </li>
  ))}
</ul>



      
    </div>
  )
}

export default Todo



