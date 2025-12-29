import React from 'react'

const Pagination = ({totalPages,currentPage,updatePage}) => {
const pages = []
for(let i = 1  ;i <=totalPages ; i ++){
    pages.push(i)
}
// console.log(pages)


function handlePrev(){
    updatePage(currentPage-1)
}

function handleNext(){
    updatePage(currentPage+1)
}

  return (
    <div style={{marginTop:"20px",display:'flex',gap:"6px"}}>
      <button  onClick={handlePrev} disabled={currentPage==1}>Prev</button>
      
        {pages.map((p)=>(
          <button key = {p}  onClick={()=>updatePage(p)}  style={{color: currentPage==p ? 'red':'black'}}>
            {p}
          </button>
        ))}
      
      <button onClick={handleNext} disabled={currentPage==totalPages}>Next</button>
    </div>
  )
}

export default Pagination
