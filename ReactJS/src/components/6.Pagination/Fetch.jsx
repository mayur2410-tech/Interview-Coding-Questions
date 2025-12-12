import React, { useState } from 'react'
import Pagination from './Pagination'

const Fetch = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);  // items per page

    // Generate 50 dummy items
    const allItems = []
    for(let i = 1; i <= 50; i++){
        allItems.push({
            id: i,
            name: `Item ${i}`,
            description: `This is description for item ${i}`
        });
    }

    const totalItems = allItems.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Calculate which items to show
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = allItems.slice(startIndex, endIndex);

    // Handle page change
    function handlePageChange(page) {
        console.log("Page changed to : ", page);
        setCurrentPage(page);
    }

    // Handle page size change
    function handlePageSizeChange(e) {
        setPageSize(Number(e.target.value));
        setCurrentPage(1); // Reset to page 1
    }

    return (
        <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
            
            <h1 style={{ textAlign: 'center' }}>Item List with Pagination</h1>

            {/* Page Size Selector */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
                    Items per page: 
                </label>
                <select 
                    value={pageSize} 
                    onChange={handlePageSizeChange}
                    style={{ padding: '5px 10px', fontSize: '14px' }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>

            {/* Display Current Items */}
            <div style={{ marginBottom: '30px' }}>
                {currentItems.map((item) => (
                    <div 
                        key={item.id} 
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            marginBottom: '10px',
                            backgroundColor: '#f9f9f9'
                        }}
                    >
                        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                            {item.name}
                        </h3>
                        <p style={{ margin: 0, color: '#666' }}>
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Pagination Info */}
            <div style={{ textAlign: 'center', marginBottom: '15px', color: '#666' }}>
                Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} items
            </div>

            {/* Current Page Display */}
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <strong>Current Page: {currentPage}</strong> of {totalPages}
            </div>

            {/* Pagination Component */}
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />  
        </div>
    )
}

export default Fetch