import React, { useState } from 'react'

const Search = () => {
    const users = [
        "Mayur",
        "Jeevan",
        "nagesh",
        "PRATHAMESH",
        "sir"

    ]
    const [search,setSearch]=useState("");

    const filteredUser = users.filter((user)=>                              //with {} it is explicit return in this return keyword is important
         user.toLowerCase().includes(search.toLowerCase())                  //wihtout {} it is implicait return j sretunr its value by its own
    );



  return (
    <div style={{display:'flex',justifyContent:"center",alignItems:'center',flexDirection:"column"}}>
      <h1>Search Users: </h1>
      <input type="text" 
      style={{height:"20px"}}
      placeholder='Search User'
      onChange={(e)=>setSearch(e.target.value)}
      />

      <ul>
        {filteredUser.length === 0 && <p>No users found</p>}

        {filteredUser.map((user,items)=>(
                <li key={items}>{user}</li>
        ))}
      </ul>
    </div>
  )
}

export default Search
