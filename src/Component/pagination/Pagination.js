import React, { useState } from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,

}) {
  const [currentPage, setCurrentPage] = useState(1);

      const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className='py-2'>
      <div>
        {/* <p className='text-sm text-gray-700'>
          Showing
          <span className='font-medium'>{currentPage * postsPerPage - 10}</span>
          to
          <span className='font-medium'> {currentPage * postsPerPage} </span>
          of
          <span className='font-medium'> {totalPosts} </span>
          results
        </p> */}
      </div>
      <nav className='block'></nav>
      <div>
        <nav
          className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
          aria-label='Pagination'
        >
          <li
            onClick={() => {
              paginateBack();
            }}
            // href='#'
            className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
          >
            <button>Previous</button>
          </li>

          <a
            onClick={() => {
              paginateFront();
            }}
            // href='#'
            className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
          >
            <button>Next</button>
          </a>
        </nav>
      </div>
    </div>
  );
}