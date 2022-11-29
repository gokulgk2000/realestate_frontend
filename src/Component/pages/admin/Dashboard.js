import { Breadcrumbs } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { allBuyerList, allUsersList } from '../../helper/backend_helpers';

const Dashborad = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);


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
    
  return (
    <div >
     <Breadcrumbs >
      <a href="/admin/Dashboard" className="text-rose-700">
        Dashboard
      </a>
         </Breadcrumbs>
      <div className=' grid grid-cols-3 px-3 mt-4 text-center  '>
        <div className=" rounded overflow-hidden shadow-lg  bg-stone-100 p-3">
          <div className='flex justify-center ' >
        <svg className="w-6 h-6   text-teal-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
  <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
  <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
</svg></div>

    <div className="px-6 py-4">
      <div className=" font-bold  text-rose-700  text-xl mb-2">Sellers</div>
      <p>All Sellers</p>
     
      <Link to = "/admin/userlist"><button  className='bg-blue-500 w-14 rounded-md text-white hover:hover:bg-teal-600'>View</button></Link>
    </div>
   
  </div>
        <div className=" rounded overflow-hidden shadow-lg  bg-stone-100 p-3">
          <div className='flex justify-center ' >
        <svg className="w-6 h-6   text-teal-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
  <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
  <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
</svg></div>

    <div className="px-6 py-4">
      <div className=" font-bold  text-rose-700  text-xl mb-2">Buyers</div>
      <p>All Buyers</p>
     
      <Link to = "/admin/buyerlist"><button  className='bg-blue-500 w-14 rounded-md text-white hover:hover:bg-teal-600'>View</button></Link>
    </div>
   
  </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg text-center p-3  bg-stone-100">
        <div className='flex justify-center'><svg className="w-6 h-6 flex justify-center  text-teal-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
</svg></div>


    <div className="px-6 py-4">
      <div className="  font-bold  text-rose-700  text-xl mb-2 ">Properties</div>
      <p>All Registered Properties</p>
      {/* {userData.map((lenght,i)=>())} */}
      <Link to = "/admin/propertylist"><button  className='bg-blue-500 w-14 rounded-md text-white hover:hover:bg-teal-600'>View</button></Link>
 
    </div>
   
  </div>
    
  </div>
  </div>
  )
}

export default Dashborad