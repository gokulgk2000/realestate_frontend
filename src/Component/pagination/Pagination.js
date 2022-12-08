import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='py-2 text-center'>
      <div>
        <p className='text-sm text-gray-700 '>
          Showing
          <span className='font-medium'>
            {" "}
            {currentPage * postsPerPage - 10}{" "}
          </span>
          to
          <span className='font-medium'> {currentPage * postsPerPage} </span>
          of
          <span className='font-medium'> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className='block'>
        <ul className='flex pl- rounded list-none flex-wrap justify-center'>
          <li>
            {pageNumbers.map((number) => (
              <button
                onClick={() => {
                  paginate(number);
                }}
                
                className={
                  currentPage === number
                    ? "bg-blue border-red-300 text-amber-700 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                }
              >
                {number}
              </button>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
}