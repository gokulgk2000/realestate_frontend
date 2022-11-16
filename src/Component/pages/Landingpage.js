import React from "react";
import FeaturedProperty from "./FeaturedProperty";
import Image from "../assets/images/2.jpg";
const Landingpage = () => {
  return (
    <div>
      <div>
        <form className="flex items-center px-5 py-5">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full ">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-teal-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required=""
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        <div className="flex md:justify-end px-4 "><button
                type="button"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                <a href="/login" >Login</a>
              </button></div>
              <br/>
        <div
          className=" drop-shadow-xl">
            <img  className="h-96 w-full rounded-lg " src={Image} />
            <h6 className="absolute text-xl text-gray-600 top-8 left-5"> Real Estate</h6>
            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-gray-800 opacity-70">
            <h3 className="text-l text-white font-bold">
                Hey, I Am The New Property</h3>
            <p className="mt-2 text-sm text-gray-300">
            Real estate cannot be lost or stolen, nor can it be carried away. ...
              </p>
        </div>
            <button className="absolute bg-teal-200 w-20 h-10 text-gray-500 top-8 right-8 rounded-2xl">
              <a href="/register" >
              For More
              </a>
              </button>
          </div>

        <div className="p-3 ">
        <h1 className="py-5 px-4 text-2xl font-bold ">
          Featured Properties 
          </h1>
          <FeaturedProperty />
        </div>
        <div
          className=" drop-shadow-xl py-28 h bg-slate-200">
           <h3 className="absolute text-l text-slate-800 font-bold top- left-1/2 -translate-x-1/2 -translate-y-full">
            We Have A Happy Clints
            </h3>
            <button className="absolute w-32 h-10 rounded-2xl bg-gray-900 text-white font-bold  top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="/">View More</a> 
            </button>
          </div>
      </div>
    </div>
  );
};
export default Landingpage;
