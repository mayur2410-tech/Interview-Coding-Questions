import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Pagination from './Pagination';

const Fetch = () => {

    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    const [limit,setLimit]=useState(5)
    const [search,setSearch]=useState('');
    const[sortOrder,setSortOrder]=useState('asc')

    // searching
const filterData = data.filter((user)=>{
    const fullName =`${user.firstName} ${user.lastName}`.toLowerCase() 
    return fullName.includes(search.toLowerCase())
})


// sort data asending or descending 
    const sortedUser = [...filterData].sort((a,b)=>{
        const nameA = a.firstName.toLowerCase();
        const nameB = b.lastName.toLowerCase();
        if(sortOrder=='asc'){
         return   nameA.localeCompare(nameB)
        }else{
           return nameB.localeCompare(nameA)
        }
    })



   

    const startIndex = (page-1) * limit
    const endIndex = startIndex + limit
    const currentUser = sortedUser.slice(startIndex,endIndex)

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
    },[limit,sortOrder])

    if(loading){
        return (
            <>
            <p>Loading</p>
            </>
        )
        
    }

  return (
    <div>

    <div style={{marginTop:"10px",marginLeft:"40%"}}>
        <label htmlFor="">Search By Name : </label>
        <input type="text"
        value={search}
        style={{borderRadius:"10px",height:"25px"}}
        onChange={(e)=>setSearch(e.target.value)}
        />
    </div>
            <div style={{display:'flex',flexDirection:"row",justifyContent:"space-between"}}>
        <h1>User Data</h1> 
        <select style={{borderRadius:"10px",height:'100%',marginTop:"20px"}}
        value={sortOrder}
        onChange={(e)=>setSortOrder(e.target.value)}
        >
            Sort By:
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            </select>  

            </div>
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
