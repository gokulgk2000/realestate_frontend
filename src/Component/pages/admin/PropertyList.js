import userEvent from '@testing-library/user-event';
import React, { useEffect, useMemo, useState } from 'react'
import { allPropertiesList } from '../../helper/backend_helpers';
import Pagination from '../../pagination/Pagination';

let PageSize = 10;

const PropertyList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [allProperties, setAllProperties] = useState([]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return allProperties.slice(firstPageIndex, lastPageIndex);
      }, [currentPage]);

    useEffect(() => {
        const getAllProperties = async () => {
          const res = await allPropertiesList({});
          console.log("getAllProperties" ,res);
          if (res.success) {
            setAllProperties(res.properties);
          }
        };
        getAllProperties();
      }, []);
  return (
    <div>
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                   Seller Name
                </th>
                <th scope="col" className="py-3 px-6">
                    <div className="flex items-center">
                    askPrice
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6">
                    <div className="flex items-center">
                    location
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6">
                    <div className="flex items-center">
                    status
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6">
                    <span className="sr-only">View</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {allProperties.map((PropertyData,i)=>(
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
                <td className="py-4 px-6">
                {PropertyData?.status}
                </td>
                <td className="py-4 px-6 text-right">
                    <a href={`/admin/propertydetails?id=${PropertyData?._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                </td>
            </tr>
            ))}
        </tbody>
        <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={currentTableData.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </table>
   
</div>

    </div>
  )
}

export default PropertyList