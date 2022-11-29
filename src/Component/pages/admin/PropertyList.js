import { Breadcrumbs } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { allPropertiesList } from '../../helper/backend_helpers';
import Pagination from '../../pagination/Pagination';
import Posts from '../../pagination/Post';

const PropertyList = () => {
    const [allProperties, setAllProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);



    useEffect(() => {
        const getAllProperties = async () => {
          const res = await allPropertiesList({});
          // console.log("getAllProperties" ,res);
          if (res.success) {
            setAllProperties(res.properties);
          }
        };
        getAllProperties();
      }, []);
      const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Breadcrumbs >
      <a href="/admin/Dashboard" className="opacity-60">
        Dashboard
      </a>
      <a href="/admin/PropertyList" className="text-rose-700">
        Properties
      </a>
      {/* <a href="/admin/propertydetails" className="opacity-60">
        PropertyDetails
      </a> */}
     
    </Breadcrumbs>
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6  text-rose-700">
                   Seller Name
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                    AskPrice
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                    location
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                    status
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700 ">
                    <span className="flex items-center">PropertyDetails</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {allProperties.slice((currentPage -1)*10,(currentPage *10)).map((PropertyData,i)=>(
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {PropertyData?.Seller}
                </th>
                <td className="py-4 px-6">
                {PropertyData?.askPrice}
                </td>
                <td className="py-4 px-6">
                {PropertyData?.location}
                </td>
                <td className="py-4 px-6 capitalize">
                {PropertyData?.status}
                </td>
                <td className="py-4 px-6">
                    <a href={`/admin/propertydetails?id=${PropertyData?._id}`} className="font-medium  text-rose-700  dark:text-blue-500 hover:underline">
                      View</a>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
    
</div>
<div className='justify-content px-96 mt-2'>
    <nav aria-label="Page navigation example justify-center">
    {/* <Posts posts={currentPosts} /> */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={allProperties.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </nav>
    </div>
    </div>
  )
}

export default PropertyList