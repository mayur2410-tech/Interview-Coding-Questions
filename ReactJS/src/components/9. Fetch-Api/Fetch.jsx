import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Pagination from './Pagination';

const Fetch = () => {

    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    const [limit,setLimit]=useState(5)
   

    const startIndex = (page-1) * limit
    const endIndex = startIndex + limit
    const currentUser = data.slice(startIndex,endIndex)

    const totalPage = Math.ceil(data.length/limit)
   


    const fetchApi = async ()=>{
        try{
            setLoading(true)
            const data = await axios.get("https://dummyjson.com/users");
            setData(data.data.users)
            // console.log(data.data.users)

        }catch(error){
            console.log("error occured",error)

        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchApi()
    },[])

    useEffect(()=>{
            setPage(1)
    },[limit])

    if(loading){
        return (
            <>
            <p>Loading</p>
            </>
        )
        
    }

  return (
    <div>

        <h1>User Data</h1>
        {currentUser.map((item)=>(
            <div key={item.id} style={{border:"2px solid black",borderRadius:"30px",padding:"10px" ,display:"flex",gap:"45px"}}>
                <p>Id:{item.id}</p>
                <p>Name: {item.firstName} {item.lastName}</p>
                <p>Email:{item.email}</p>
                <p>Address:{item.address.address}</p>
                </div>

        ))}
        <div style={{display:"flex"}}>
       

       
            <Pagination totalPage={totalPage} currentPage={page} onPageChange={setPage} limit={limit} onLimitChange={setLimit}/>
            {/* <button onClick={()=>setPage(page-1)} disabled={page===1}>Previous</button>
            {pages.map((p)=>(
                <button key={p} style={{color:page==p ? "red":'black'}} onClick={()=>setPage(p)}>
                    {p}
                </button>
            ))}
            <button onClick={()=>setPage(page+1)} disabled={page==totalPage }>Next</button> */}
        </div>
      
    </div>
  )
}

export default Fetch
