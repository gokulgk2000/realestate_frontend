import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/images/c.jpg";
import Category from "./Category";
const Landingpage = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const navigateToProperty = (e) => {
    e.preventDefault();
    navigate(`/property?search=${searchText}`);
  };

  return (
    <div>
      <div className="font-serif">
        <div className=" flex justify-center items-center mt-2 pb-4 ">
          <div className="flex justify-center rounded-lg ">
            <div className="p-4 border-2 ">
             
             
              <select className=" border-0 relative group:">
<option> <button class="  py-1 px-4 bg-white text-gray-600 rounded absolute     opcity-80   group-hover:block group-hover:  md:w-32 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
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
<option value="" className=" border-0">Residential</option>

<option value="" className=" border-0">Villa</option>

<option value="" className=" border-0">Land</option>
<option value="" className=" border-0">Appartment</option>

<option value="" className=" border-0">Commercial</option></select>     



            </div>
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
                className="px-3 py-2 -ml-1.5 bg-blue-500 hover:bg-teal-700 text-white rounded "
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
        <div className=" drop-shadow-xl px-5 -mt-2 scale-100   ">
          <img className="md:h-96 md:w-full " src={Image} />
          <h6 className="absolute text-xl text-gray-800 top-8 px-2 left-5">
            {" "}
            Real Estate
          </h6>
          <div className="absolute bottom-0 flex left-0 right-0  py-4">
            <h3 className="text-l text-black font-bold px-6 ">
              Hey, I Am The New Property
            </h3>
          </div>
          <button className="absolute bg-teal-200 w-20 h-10 text-gray-600 hover:bg-teal-600 hover:text-yellow-50 top-8 right-8 rounded-2xl">
            <a href="/register">For More</a>
          </button>
        </div>
        <div className="py-8 px-4">
          <h1 className="text-2xl text-gray-600 font-semibold mb-3">
            Categories :
          </h1>
          <Category />
        </div>
        {/* <div className="p-3 ">
          <h1 className="py-5 px-4 text-2xl font-bold ">Featured Properties</h1>
          <Property />
        </div> */}
        <div className=" drop-shadow-xl py-28  bg-slate-200">
          <h3 className="absolute text-lg text-slate-800 font-bold top- left-1/2 -translate-x-1/2 -translate-y-full">
            We Have A Happy Clints
          </h3>
          <button className="absolute w-32 h-10 rounded-2xl bg-gray-900 text-white hover:bg-teal-700 font-bold  top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to={`/property`}>View More</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Landingpage;
