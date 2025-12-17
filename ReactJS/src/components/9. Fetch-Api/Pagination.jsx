import React from 'react'

const Pagination = ({totalPage,currentPage,onPageChange,limit,onLimitChange}) => {
     const pages = [];
    for(let i = 1 ; i <= totalPage;i++){
        pages.push(i)
    }
  return (
    <div>
        <div style={{display:"flex"}}>

        
             <p>Per Page:</p>
                <select value={limit} onChange={(e)=>onLimitChange(Number(e.target.value))}>
                    Users per Page:
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
        
        
                </select>
                </div>


        <button onClick={()=>onPageChange(currentPage-1)} disabled={currentPage===1}>Previous</button>
            {pages.map((p)=>(
                <button key={p} style={{color:currentPage==p ? "red":'black'}} onClick={()=>onPageChange(p)}>
                    {p}
                </button>
            ))}
            <button onClick={()=>onPageChange(currentPage+1)} disabled={currentPage==totalPage }>Next</button> 
    </div>
  )
}

export default Pagination
