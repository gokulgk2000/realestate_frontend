import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
}) {

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className=' py-2'>
      <nav>
        
      </nav>
     
      <div>
        <nav
          className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
          aria-label='Pagination'
        >
          <button
            onClick={() => {
              paginateBack();
            }}
           
            className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
          >
            
            <span>Previous</span>
          </button>
          <ul className='flex items-center text-sm text-gray-700'>
        
        <li className='font-medium'>{currentPage},</li>
       
        
      
        {/* <li className='font-medium'> {totalPosts} </li> */}
      
      </ul>
          <button
          
            onClick={() => {
              paginateFront();
            }}
           
            className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
          >
            <span>Next</span>
          </button>
          <div>TotalItems  {totalPosts}</div>
        </nav>
      </div>
    </div>
  );
}