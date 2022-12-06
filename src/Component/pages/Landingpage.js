import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/images/loan.jpeg";
import { useModal } from "../helper/hook/useModal";
import RequestedModel from "../models/RequestedModel";
import { Carousel } from "./Carousel";
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
        <div className="flex   md:hidden ">
          <div className="flex justify-center rounded-lg  ">
            <select className="px-2 border h-10 ">
              <option>
                {" "}
                <button class="  py-1 px-4 bg-white text-gray-600 rounded absolute opcity-80   group-hover:block group-hover:  md:w-32 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
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
            <div className="flex  p- border-2 h-10 bg-slate-200">
              <form action="">
                <input
                  type="text"
                  id="message"
                  value={searchText}
                  name="search"
                  placeholder="Search Property...."
                  className=" px-2 bg-slate-200 w-36  rounded-tl-full rounded-bl-full border-0 focus:outline-0 "
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </form>
            </div>
            <div className=" flex px-2 border-2 h-10 bg-white  ">
              {" "}
              <button
                className="px-3  text-black rounded hover:text-white"
                onClick={navigateToProperty}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="bg hidden  md:grid grid-cols-1  ">
      
        <Carousel/>
          {/* <div
            className="md:w-screen "
            style={{ backgroundImage: `url(${Image})` }}
          ></div> */}
        </div>
  

        <div className="py- px-4">
          <Category />
        </div>

        <div className=" drop-shadow-xl py-10 ">
          <Property />
        </div>
      </div>
    </div>
  );
};
export default Landingpage;
