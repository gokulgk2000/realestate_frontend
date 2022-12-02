import { Breadcrumbs } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { allPropertiesList } from '../../helper/backend_helpers';
import Pagination from '../../pagination/Pagination';
import Posts from '../../pagination/Post';

const PropertyList = () => {
    const [allProperties, setAllProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchText,setSearchText]=useState("")

  const propertySearch = (searched)=>{
 setSearchText(searched)
   
  }

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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Breadcrumbs >
      <a href="/admin/Dashboard" className="opacity-60 font">
        Dashboard
      </a>
      <a href="/admin/PropertyList" className=" text-amber-700 font">
        Properties
      </a>
    </Breadcrumbs>
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
    <div className="w-full flex justify-center items-center mt-2 pb-4  ">
        <input
          type="text"
          placeholder="Search Properties"
          name="search"
          className="md:w-96 px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0"
          onChange={(e) => propertySearch(e.target.value)}
        />

        <button
          type="submit"
          className=" grad1 px-3 py-2 -ml-1.5 bg-amber-700 hover:bg-amber-900 text-white rounded-tr-full rounded-br-full"
        >
          Search
        </button>
      </div>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6   text-amber-700">
                   Seller Name
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700">
                    <div className="flex items-center">
                    AskPrice
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700">
                    <div className="flex items-center">
                    location
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700">
                    <div className="flex items-center">
                    status
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700 ">
                    <span className="flex items-center">PropertyDetails</span>
                </th>
            </tr>
        </thead>
        <tbody>
            { allProperties?.filter(
          (item) =>
          item?.Seller
          .toString()
                .toLowerCase()
                .includes(searchText.toString().toLowerCase()) ||
              item?.location
              .toString()
              .toLowerCase()
              .includes(searchText.toString().toLowerCase()) ||
              item?.askPrice
              .toString()
              .toLowerCase()
              .includes(searchText.toString().toLowerCase()) ||
              item?.facing
              .toString()
              .toLowerCase()
              .includes(searchText.toString().toLowerCase()) ||
              item?. category
              .toString()
              .toLowerCase()
              .includes(searchText.toString().toLowerCase()) ||
              item?. landArea
              .toString()
              .toLowerCase()
              .includes(searchText.toString().toLowerCase()) ||
              item?.layoutName
              .toString()
              .toLowerCase()
              .includes(searchText.toString().toLowerCase()) 
        ).slice((currentPage -1)*10,(currentPage *10)).map((PropertyData,p)=>(
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={p}>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                {PropertyData?.Seller}
                </th>
                <td className="py-4 px-6 capitalize">
                {PropertyData?.askPrice}
                </td>
                <td className="py-4 px-6 capitalize">
                {PropertyData?.location}
                </td>
                <td className="py-4 px-6 capitalize">
                {PropertyData?.status}
                </td>
                <td className="py-4 px-6">
                    <Link to={`/admin/propertydetails?id=${PropertyData?._id}`} className="font-medium   text-amber-700  dark:text-blue-500 hover:underline">
                      View</Link>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
</div>
<div className='justify-content px-96 mt-2'>
    <nav aria-label="Page navigation example justify-center">
      <Pagination
        postsPerPage={postsPerPage }
        totalPosts={ allProperties?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </nav>
    </div>
    </div>
  )
}

export default PropertyList