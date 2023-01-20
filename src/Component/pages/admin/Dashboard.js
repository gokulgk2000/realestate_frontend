import { Breadcrumbs } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  allUsersList, getAdminById } from "../../helper/backend_helpers";

const Dashborad = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  const [admin,setAdmin] = useState();
  const user = JSON.parse(localStorage?.getItem("authAdmin"));

 
  const getAllUsers = async () => {
    setLoading(true);
    const res = await allUsersList({});
    if (res.success) {
      setUserData(res.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return(
  <div className="hidden md:block">
    <Breadcrumbs>
    <Link to="/admin">
      <button className="text-amber-700 font">
        Dashboard
      </button></Link>
    </Breadcrumbs>
    <div className="grid grid-cols-3 px-3 mt-4 text-center gap-y-3 pb-3 ">
      <div className=" rounded overflow-hidden shadow-lg hover:bg-stone-100 bg-stone-200 p-3">
        <div className="flex justify-center ">
          <svg
            className="w-6 h-6   text-teal-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
              clip-rule="evenodd"
            />
            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
          </svg>
        </div>

        <div className="px-6 py-4 " >
          <div className=" font-light  text-amber-700  text-xl mb-2">
            Sellers
          </div>
          <p>All Sellers</p>

          <Link to="/admin/userlist" className="">
            <button className=" grad1 w-14 rounded-md text-white bg-amber-700 hover:bg-amber-900">
              View
            </button>
          </Link>
        </div>
      </div>
      <div className=" rounded overflow-hidden shadow-lg  bg-stone-200 p-3 hover:bg-stone-100">
        <div className="flex justify-center ">
          <svg
            className="w-6 h-6   text-teal-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
              clip-rule="evenodd"
            />
            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
          </svg>
        </div>

        <div className="px-6 py-4">
          <div className=" font-light  text-amber-700  text-xl mb-2">
            Buyers
          </div>
          <p>All Buyers</p>

          <Link to="/admin/buyerlist">
            <button className="grad1 w-14 rounded-md text-white bg-amber-700 hover:bg-amber-900">
              View
            </button>
          </Link>
        </div>
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg text-center p-3 hover:bg-stone-100 bg-stone-200">
        <div className="flex justify-center">
        <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 text-teal-700"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                    clip-rule="evenodd"
                  />
                </svg>

        </div>

        <div className="px-6 py-4">
          <div className=" font-light  text-amber-700  text-xl mb-2">
            Requested
          </div>
          <p>All Requested</p>

          <Link to="/admin/requestedlist">
            <button className="grad1 w-14 rounded-md text-white bg-amber-700 hover:bg-amber-900">
              View
            </button>
          </Link>
        </div>
      
      </div>
      {/* <div className="max-w-sm rounded overflow-hidden shadow-lg text-center p-3 hover:bg-stone-100 bg-stone-200">
        <div className="flex justify-center">
          <svg
            className="w-6 h-6 flex justify-center  text-teal-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        </div>

        <div className="px-6 py-4">
          <div className="  font-light text-amber-700  text-xl mb-2 ">
            Intrested
          </div>
          <p>All Buyer Intrested</p>
          <Link to="/admin/intrestedlist">
            <button className=" grad1 w-14 rounded-md text-white  bg-amber-700 hover:bg-amber-900">
              View
            </button>
          </Link>
        </div>
      
      </div> */}
      <div className="max-w-sm rounded overflow-hidden shadow-lg text-center p-3 hover:bg-stone-100 bg-stone-200">
        <div className="flex justify-center">
          <svg
            className="w-6 h-6 flex justify-center  text-teal-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        </div>

        <div className="px-6 py-4">
          <div className="  font-light text-amber-700  text-xl mb-2 ">
            Properties
          </div>
          <p>All Registered Properties</p>
          {/* {userData.map((lenght,i)=>())} */}
          <Link to="/admin/propertylist">
            <button className=" grad1 w-14 rounded-md text-white  bg-amber-700 hover:bg-amber-900">
              View
            </button>
          </Link>
        </div>
      
      </div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg text-center p-3 hover:bg-stone-100 bg-stone-200">
        <div className="flex justify-center">
          <svg
            className="w-6 h-6 flex justify-center  text-teal-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        </div>

        <div className="px-6 py-4">
          <div className="  font-light text-amber-700  text-xl mb-2 ">
            Ad Properties
          </div>
          <p>Advertisement Properties</p>
          {/* {userData.map((lenght,i)=>())} */}
          <Link to="/admin/adproperty">
            <button className=" grad1 w-14 rounded-md text-white  bg-amber-700 hover:bg-amber-900">
              View
            </button>
          </Link>
        </div>
      
      </div>
   
    </div>
  </div>)
};

export default Dashborad;
