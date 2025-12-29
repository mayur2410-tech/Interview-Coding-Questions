import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from './Pagination';
const Page = () => {
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(false)
    const[sort,setSort]=useState('asc')
    const[search,setSearch]=useState('')

    //pagination
    const[page,setPage]=useState(1)
    const limit = 4


    //search users 
    const filterData = [...users].filter((user)=>{
        const name = `${user.name}`.toLowerCase()
        return name.includes(search.toLowerCase())
    })

 //sorted users
   const sortUsers = [...filterData].sort((a,b)=>{
        if(sort === 'asc'){
           return  a.name.localeCompare(b.name)
        }else{
            return b.name.localeCompare(a.name)
        }
    })

    const startIndex = (page -1)*limit
    const endIndex = startIndex + limit
    const currentUser = sortUsers.slice(startIndex,endIndex)

    const totalPages = Math.ceil(users.length / limit)

   
 


    const fetchUsers = async()=>{
        try{
            setLoading(true)
            const response = await axios.get("https://api.escuelajs.co/api/v1/users");
            setUsers(response.data)
            console.log("users",users)

        }catch(error){
                console.log("error",error)
          
        }finally{
            setLoading(false)
        }
        
    }

    useEffect(()=>{
        setPage(1)
    },[sort])

    useEffect(()=>{
        fetchUsers()
    },[])
    if(loading){
        return <p style={{textAlign:'center'}}>Loading..</p>
    }

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:"column"}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:"center"}}>

      <h1>Users </h1>

      <div>
        <input type="text" name="" id=""  value={search} onChange={(e)=>setSearch(e.target.value)} />
      </div>

      <div>
       {/* Sort By: */}
      <select defaultValue="" style={{marginLeft:"30px"}} value={sort} onChange={(e)=>setSort(e.target.value)}>
        <option value="" disabled option>Sort By</option>
       <option value="asc">ASC</option>
       <option value="des">DES</option>
      </select>
      </div>
        </div>

        {filterData.length===0 && <p>No user Found</p>}

      {currentUser.map((user)=>(
        <div key={user.id}  style={{display:'flex',gap:"20px",border:'2px solid black',borderRadius:'10px',padding:'20px',width:"80vh",marginTop:"10px"}}>
            <p>Id: {user.id}</p>
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>Password: {user.password}</p>
            </div>
      ))}
      <Pagination  totalPages={totalPages} currentPage={page} updatePage={setPage}/>

    </div>
  )
}

export default Page
