import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/images/loan.jpeg";
import Category from "./Category";
import Property from "./Property";
const Landingpage = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const navigateToProperty = (e) => {
    e.preventDefault();
    navigate(`/property?search=${searchText}`);
  };

  return (
    <div>
      <div className="font ">
          {/* <img className=" md:w-full aspect-[2] " src={Image} /> */}
          <div className="bg grid grid-cols-1    " > 
          
         <div className="w-screen " style={{ backgroundImage:`url(${Image})` }}>
         
         <div className=" flex justify-center items-center py-4  " >
          <div className="flex justify-center rounded-lg  pt-72">
            <select className="p-4 border-2  ">
             
             
             
<option> <button class="  py-1 px-4 bg-white text-gray-600 rounded absolute   opcity-80   group-hover:block group-hover:  md:w-32 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
                {" "}
              category 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>{" "}
              </button> </option>
<option value="" className=" border-0   ">Residential</option>

<option value="" className=" border-0">Villa</option>

<option value="" className=" border-0">Land</option>
<option value="" className=" border-0">Appartment</option>

<option value="" className=" border-0">Commercial</option>    



            </select>
            <div className="  p-4 border-2 bg-slate-200">
              <form action="">
                <input
                  type="text"
                  id="message"
                  value={searchText}
                  name="search"
                  placeholder="Search Property...."
                  className=" px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0 "
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </form>
            </div>
            <div className="  p-4 border-2 ">
              {" "}
              <button
                className="px-3 py-2 -ml-1.5 grad-btn hover:bg-teal-700 text-white rounded "
                onClick={navigateToProperty}
              >
                Search Properties
              </button>
            </div>
          </div>

          {/* <form action="">
          
            <input
              type="text"
              id="message"
              value={searchText}
              name="search"
              placeholder="Search Property...."
              className=" px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0 "
              onChange = {(e)=>setSearchText(e.target.value)}
            />
            <button className="px-3 py-2 -ml-1.5 bg-blue-500 hover:bg-teal-700 text-white rounded-tr-full rounded-br-full " onClick={navigateToProperty} >
              Search 
            </button>
          </form> */}
        </div>
       </div> </div>
       

        
        <div className="py- px-4">
         
          <Category />
        </div>
        {/* <div className="p-3 ">
          <h1 className="py-5 px-4 text-2xl font-bold ">Featured Properties</h1>
          <Property />
        </div> */}
        <div className=" drop-shadow-xl py-10 bg-slate-200">
         
        <Property/>
        </div>
      </div>
    </div>
  );
};
export default Landingpage;
