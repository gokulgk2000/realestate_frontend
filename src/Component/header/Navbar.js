import React, { useEffect, useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { getPropertiescategoryId, getUserById } from "../helper/backend_helpers";
import { mobile } from "../helper/constatnt/ScreenSize";
import useMediaQuery from "../helper/hook/useMediaQuery";
import { useModal } from "../helper/hook/useModal";
import { useQuery } from "../helper/hook/useQuery";
import { isAuthenticated, logout } from "../pages/auth/Auth";
import Mobilenav from "./Mobilenav";
import Image from "../assets/images/avadar3.webp"

const NavItem = [
  { name: "HOME", link: "/" },
  { name: "SELL PROPERTY", link: "/sell" },
  { name: "CONTACT US ", link: "/about" },
  // { name: "", link: "/property" },
  // { name: "REQUESTED", link: "/request" },
  // { name: "About", link: "#" },
  // { name: "Contactus", link: "#" },
];
function Navbar() {
  const [searchText, setSearchText] = useState("");
  const [isMobileview] = useMediaQuery(mobile);
  const [user, setUser] = useState({});
  const [property, setproperty] = useState("");   

  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();
  const userFromStorage = JSON.parse(localStorage.getItem("authUser"));
// console.log("user",user)
  const getUserName = async () => {
    const res = await getUserById({
      userID: userFromStorage?.userID,
    });
    if (res.success) {
      setUser(res.User);
      // console.log("res", res);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  const categories = async () => {
    const res = await getPropertiescategoryId({
      id,
      searchText,
    });

    if (res.success) {
      setproperty(res.category);

      console.log("first",res)

    } else {
    }
  };
 

  useEffect(() => {
    categories();
  }, [searchText]);

  const navigateToProfile = (e) => {
    e.preventDefault();
    navigate(`/ProfileUpdate`);
  };

  const navigateToProperty = (e) => {
    e.preventDefault();
    navigate(`/property?search=${searchText}`);
  };
  
  const navigateToUserActivities = (e) => {
    // e.preventDefault();
    navigate(`/UserActivties?`);
    
  };
  
  const navigateToInterested = (e) => {
    e.preventDefault();
    navigate(`/request`);
  };

  return (
    <div className="Navbar uppercase grad1">
       
      <nav className=" ">
        <div className="py-3 px-1  mx-auto  ">
          <div className="flex justify-between items-center px-5">
            {isMobileview ? (
              <div className="flex items-center gap-4 lg:mt-0 text-black  font">
                {NavItem.map((Nav, k) => (
                  <NavLink key={k} to={Nav.link || "#"} className="">
                    <button class="text-black p-1 hover:shadow-none rounded shadow-sm flex items-center justify-center hover:text-amber-700">
                      {" "}
                      {Nav.name}
                    </button>
                  </NavLink>
                ))}
              </div>
            ) : (
              <Mobilenav navItem={NavItem} />
            )}

            <div className=" justify-center  items-center pr-28 -my-3 hidden lg:block">
              <form className="flex justify-center rounded-lg  ">
                <select className="px-4 border  ">
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
                <div className="  p-4 border-2 bg-slate-200">
               
                    <input
                      type="text"
                      id="message"
                      value={searchText}
                      name="search"
                      placeholder="Search Property...."
                      className=" px-3 py-2 bg-slate-200 rounded-full border-0 focus:outline-0 "
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  
                </div>
                <div className="  p-4 border-2  bg-white  ">
                  {" "}
                  <button
                    className="px-3 py-2 -ml-1.5 grad-card text-black rounded hover:text-white"
                    onClick={navigateToProperty}
                  >
                    Search Properties
                  </button>
                </div>
              </form>
            </div>

            {/* <ul  className="flex flex-row  mt-0  sm:space-x-8  space-x-2 text-sm font-medium ">
                <li>
                    <a href="/about" className="text-gray-900 dark:text-white hover:underline font-semibold" aria-current="page">About us</a>
                </li>
                {/* <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline font-semibold">Company</a>
                </li> */}
            {/* <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline font-semibold">Recent</a>
                </li> 
                <li>
                    <a href="/property" className="text-gray-900 dark:text-white hover:underline font-semibold">Property</a>
                </li>
                <li>
                    <a href="/feedback" className="text-gray-900 dark:text-white hover:underline font-semibold">Feedback</a>
                </li>
            </ul> */}
            <div className=" ">
              {isAuthenticated() ? (
                <div>
                  <div className=" relative  group">
                    <a>
                      {" "}
                      <div className="flex">
                        {" "}
                        <img
                          src={user?.profilePic||Image}
                          className="w-10 h-10 rounded-full"
                        />
                        {/* <span>   <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-amber-300  hover:text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg></span> */}
                        <span>
                          <div className="px-2 pt-1 text-slate-200 font hover:text-amber-300 hidden md:block lg:block border-t-0 border-l-0 grad1 hover:shadow-sm  rounded shadow-md">
                            {user?.firstname} {user?.lastname}
                          </div>
                        </span>
                      </div>
                    </a>
                    <ul className="absolute   bg-white rounded-tr-3xl  rounded-bl-3xl pl-2  opcity-80 hidden  group-hover:block group-hover:right-2 group-hover:shadow-md md:w-32">
                      <div>
                        <div className="flex   ">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 pt-2 text-teal-700"
                         onClick={navigateToProfile} >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                            />
                          </svg>
                          <button
                            className="  text-start font hover:text-amber-700 uppercase p-1 md:w-28 hover:shadow-none rounded shadow-sm"
                            onClick={navigateToProfile}
                          >
                            Profile
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="flex  border-t-0 border-black  ">
                          {" "}
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="1.5"
                              className="w-6 h-6 pt-2  text-teal-700 "
                              onClick={navigateToUserActivities} >
                              <g data-name="Layer ">
                                <g data-name="activity">
                                  <rect
                                    width="6"
                                    height="6"
                                    opacity="0"
                                    transform="rotate(90 12 12)"
                                  />
                                  <path d="M14.33 20h-.21a2 2 0 0 1-1.76-1.58L9.68 6l-2.76 6.4A1 1 0 0 1 6 13H3a1 1 0 0 1 0-2h2.34l2.51-5.79a2 2 0 0 1 3.79.38L14.32 18l2.76-6.38A1 1 0 0 1 18 11h3a1 1 0 0 1 0 2h-2.34l-2.51 5.79A2 2 0 0 1 14.33 20z" />
                                </g>
                              </g>
                            </svg>
                            
                          <button className=" text-start  p-1 md:w-28 font hover:text-amber-700 uppercase hover:shadow-none rounded shadow-sm" 
                          onClick={(e)=>
                            navigateToUserActivities(e)}
                          >
                           
                            Activities
                          </button>
                        </div>{" "}
                      </div>
                      {/* <div className="flex  border-t-0 border-black  ">
                        {" "}
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="1.5"
                              className="w-6 h-6 pt-2  text-teal-700 "
                            >
                              <g data-name="Layer ">
                                <g data-name="activity">
                                  <rect
                                    width="6"
                                    height="6"
                                    opacity="0"
                                    transform="rotate(90 12 12)"
                                  />
                                  <path d="M14.33 20h-.21a2 2 0 0 1-1.76-1.58L9.68 6l-2.76 6.4A1 1 0 0 1 6 13H3a1 1 0 0 1 0-2h2.34l2.51-5.79a2 2 0 0 1 3.79.38L14.32 18l2.76-6.38A1 1 0 0 1 18 11h3a1 1 0 0 1 0 2h-2.34l-2.51 5.79A2 2 0 0 1 14.33 20z" />
                                </g>
                              </g>
                            </svg>
                        <button
                          className=" text-start  p-1 md:w-28 font hover:text-amber-700 uppercase hover:shadow-none rounded shadow-sm"
                          onClick={navigateToInterested}
                        >
                         Interested
                        </button>
                      </div> */}
                      <div className="flex  border-t-0 border-black  ">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 pt-2 text-teal-700"
                          onClick={logout} >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                          />
                        </svg>
                        <button
                          className=" text-start  p-1 md:w-28 font hover:text-amber-700 uppercase hover:shadow-none rounded shadow-sm"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </div>
                    </ul>
                  </div>

                  {/* <button 
                   <div className="flex">   <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-teal-700  hover:text-rose-700"
                   
                  >
               <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg> <div  className="text-rose-700 font-serif hover:text-teal-700">{user?.firstname}{" "}{user?.lastname}</div></div> 
                </button>*/}
                </div>
              ) : (
                <button
                  type="button"
                  className="inline-block px-1 py-2 bg-amber-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-amber-500 hover:shadow-lg focus:bg-amber-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-700 active:shadow-lg transition duration-150 ease-in-out"
                >
                  <Link to="/login">Login</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
