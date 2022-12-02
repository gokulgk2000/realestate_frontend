import React, { useEffect, useState ,useMemo } from 'react'
import { allBuyerList, allUsersList, GETALLUSERSBYLIMIT } from '../../helper/backend_helpers';

import axios from 'axios';
import Pagination from '../../pagination/Pagination';
import Posts from '../../pagination/Post';
import { useQuery } from '../../helper/hook/useQuery';
import { Breadcrumbs } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
const BuyerList = () => {
  const query = useQuery();
  
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [buyerData, setBuyerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchText,setSearchText]=useState("")
// console.log(userData,"userData")
// console.log(searchText,"searchText")

const requestSearch = (searched)=>{
  setSearchText(searched)}
  
  const getAllBuyers= async () => {
    setLoading(true);
    const res = await allBuyerList({});
    console.log("dsp:",res);
    if (res.success) {
        setBuyerData(res.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllBuyers();
  }, []);

      console.log("dsp112:",buyerData.length);
      useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
          const res = await GETALLUSERSBYLIMIT ({ 
        userId: query.get("id"),})
          setPosts(res.data);
          setLoading(false);
        };
    
        fetchPosts();
      }, []);
      console.log("posts",posts.length)
 
      // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  return (
    <div >
     <Breadcrumbs >
      <a href="/admin/Dashboard" className="opacity-60">
        Dashboard
      </a>
      <a href="/admin/buyerlist" className="text-rose-700">
        Buyers
      </a>
     
    </Breadcrumbs>
<div className=" overflow-x-auto relative shadow-md sm:rounded-lg">
<div className="w-full flex justify-center items-center mt-2 pb-4  scale-100  hover:scale-95 ease-in duration-500">
        <input
          type="text"
          placeholder="Search Buyers"
          name="search"
          className="md:w-96 px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0"
          onChange={(e) => requestSearch(e.target.value)}
        />

        <button
          type="submit"
          className="px-3 py-2 -ml-1.5 bg-blue-500 hover:bg-teal-700 text-white rounded-tr-full rounded-br-full"
        >
          Search
        </button>
      </div>
 <div className='md:grid  '>  <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr >
                <th scope="col" className="py-3 px-6  text-rose-700">
                   S.No
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                       Name
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
                    Email
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <div className="flex items-center">
               Status
                        <a href="#"></a>
                    </div>
                </th>
               
                <th scope="col" className="py-3 px-6  text-rose-700">
                    <span className="">User Details</span>
                </th>
            </tr>
        </thead>
        <tbody>
          
        {( buyerData?.filter(
      (item) =>
      item?.firstname
      .toString()
            .toLowerCase()
            .includes(searchText.toString().toLowerCase()) ||
          item?.lastname
          .toString()
          .toLowerCase()
          .includes(searchText.toString().toLowerCase()) ||
          item?.email
          .toString()
          .toLowerCase()
          .includes(searchText.toString().toLowerCase()) 
         
    ).slice((currentPage -1)*10,(currentPage *10))).map((Data,i)=>(
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i+1}
                </th>
                <td className="py-4 px-6 capitalize">
                    {Data?.firstname} {Data?.lastname}
                </td>
                <td className="py-4 px-6">
                {Data?.email}
                </td>
                <td className="py-4 px-6 capitalize">
                {Data?.status}
                </td>
                <td className="py-4 px-6 items-center">
                    <Link to={`/admin/buyerdetails?id=${Data?._id}`} className="font-medium  text-rose-700  dark:text-blue-500 hover:underline">View</Link>
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
        totalPosts={buyerData?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </nav>
    </div>
    </div> 
    </div>
  )
}

export default BuyerList