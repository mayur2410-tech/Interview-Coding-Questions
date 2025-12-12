import React from 'react'

const Pagination = ({currentPage, totalPages, onPageChange}) => {

const handlePrevios=()=>{
    if(currentPage> 1){
        onPageChange(currentPage - 1);
    }
}

const handleNext=()=>{
    if(currentPage < totalPages){
        onPageChange(currentPage + 1);
    }
}

const getPageNumber=()=>{
    let pages=[]
    for(let i=1;i<=totalPages;i++){
        pages.push(i)
}
return pages;
}

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px",marginTop:"20px"}}>
      {/* previous button  */}

      <button
       onClick={handlePrevios}
       disabled={currentPage===1}
      
      >Previous</button>

      {/* page numbers */}

      <div style={{display:'flex',gap:"5px"}}>
       {getPageNumber().map((page)=>(
        <button
        onClick={() => onPageChange(page)}
        key={page}
        style={{
            //here i want to highlist only current page
            fontWeight:currentPage===page ? 'bold' : 'normal',
            backgroundColor:currentPage===page ? 'none' : 'none'
        }}
        >
            {page}
        </button>
       ))}
      </div>

      {/* next button */}
      <button 
      onClick={handleNext}
      disabled={currentPage===totalPages}
      >Next</button>
    </div>
  )

}
export default Pagination
