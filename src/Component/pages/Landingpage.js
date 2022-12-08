import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "./Carousel";
import Category from "./Category";
import Property from "./Property";
import Search from "./Search";

const Landingpage = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const navigateToProperty = (e) => {
    e.preventDefault();
    navigate(`/property?search=${searchText}`);
  };
  return (
    <div>
      <div className="  items-center  md:hidden  ">
        <form className="flex justify-center   h-11">
          <select className="px-2 border  ">
            <option>
              {" "}
              <button class="  py-1 px-2 bg-white text-gray-600 rounded absolute opcity-80   group-hover:block group-hover:  md:w-32 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
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
              </button>{" "}
            </option>
            <option value="" className=" border-0   ">
              Residential
            </option>

            <option value="" className=" border-0">
              Villa
            </option>

            <option value="" className=" border-0">
              Land
            </option>
            <option value="" className=" border-0">
              Appartment
            </option>

            <option value="" className=" border-0">
              Commercial
            </option>
          </select>
          <div className=" w-28 p- border-2 bg-slate-200">
            <input
              type="text"
              id="message"
              value={searchText}
              name="search"
              placeholder="Search "
              className=" px-3 py-2 bg-slate-200 rounded-full border-0 focus:outline-0 "
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="  px-4 pt-2 border-2  bg-white  ">
            {" "}
            <button
              className="px-3 grad-card text-black rounded hover:text-white"
              onClick={navigateToProperty}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="font ">
        <Carousel />
        {/* <div
            className="md:w-screen "
            style={{ backgroundImage: `url(${Image})` }}
          ></div> */}

        <div className=" px-4">
          <Category />
        </div>

        <div className=" drop-shadow-xl py-10 ">
          <Property />
        </div>
        {/* <Category /> */}
      </div>
    </div>
  );
};
export default Landingpage;
