import React, { useEffect, useState ,useMemo } from 'react'
import { allUsersList, GETALLUSERSBYLIMIT } from '../../helper/backend_helpers';

import axios from 'axios';
import Pagination from '../../pagination/Pagination';
import Posts from '../../pagination/Post';
import { useQuery } from '../../helper/hook/useQuery';
const UserList = () => {
  const query = useQuery();
  
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);


  const pageOptions = {
    sizePerPage: 5,
    totalSize: userData.length, // replace later with size(customers),
    custom: true,
  };
    const getAllUsers = async () => {
      
        setLoading(true);
        const res = await allUsersList({});
        console.log("dsp:",res);
        if (res.success) {
          setUserData(res.users);
        }
        setLoading(false);
      };
    
      useEffect(() => {
        getAllUsers();
      }, []);
      // console.log("dsp112:",userData.length);
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
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    
      // Change page
  //     const paginateFront = () => setCurrentPage(currentPage + 1);
  // const paginateBack = () => setCurrentPage(currentPage - 1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
  return (
    <div >
            
<div className=" overflow-x-auto relative shadow-md sm:rounded-lg">
 <div className='md:grid  '>  <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr >
                <th scope="col" className="py-3 px-6">
                   S.No
                </th>
                <th scope="col" className="py-3 px-6">
                    <div className="flex items-center">
                       Name
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6">
                    <div className="flex items-center">
                    Email
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="py-3 px-6">
                    <div className="flex items-center">
                  status
                        <a href="#"></a>
                    </div>
                </th>
               
                <th scope="col" className="py-3 px-6">
                    <span className="sr-only">View</span>
                </th>
            </tr>
        </thead>
        <tbody>
        {userData.map((Data,i)=>(
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i+1}
                </th>
                <td className="py-4 px-6">
                    {Data?.firstname} {Data?.lastname}
                </td>
                <td className="py-4 px-6">
                {Data?.email}
                </td>
                <td className="py-4 px-6">
                {Data?.aflag}
                </td>
                <td className="py-4 px-6 text-right">
                    <a href={`/admin/userdetails?id=${Data?._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                </td>
            </tr>
            ))}
           
        </tbody>
    </table>
    
</div>
<div className='justify-content px-96 mt-2'>
    <nav aria-label="Page navigation example justify-center">
    <Posts posts={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate.pageOptions}
        currentPage={currentPage}
      />
    </nav>
    </div>
    </div> 
    </div>
  )
}

export default UserList