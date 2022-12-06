import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import Image from "../assets/images/cc.jpg";
import { getbuyerdetails, getuserdetails } from '../helper/backend_helpers';

const UserActivities = () => {
  const [user, setUser] = useState("");
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));
console.log("currentUser",user)
    const getuser = async () => {
        const payload = {
          userId: currentUser?.userID,
        };
        const res = await getbuyerdetails(payload);
        if (res.success) {
          setUser(res?.Buyer);
          console.log("User",res)
        } else {
          console.log("errors", res);
        }
      };
      useEffect(() => {
        getuser();
      }, []);

  return (
   <div className='flex flex-wrap gap-4 justify-center py-5 '>
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src={Image} alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Intrested of the Properties</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">“Home is a place you grow up wanting to leave, and grow old wanting to get back to.”</p>
       <Link to={`/request?id=${user?._id}`}> <button href="/request" class="inline-flex items-center px-3 py-2 text-sm grad-btn font-medium text-center text-white  rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Intrested
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button></Link>
    </div>
</div>

<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src={Image}  alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New Request for the property</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">"The magic thing about home is that it feels good to leave, and it feels even better to come back."</p>
        <Link to="/requestedpage"> <button href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white grad-btn rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Requested
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button></Link>
    </div>
</div>
</div>
  )
}

export default UserActivities