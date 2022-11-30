import React, { useEffect, useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { getUserById } from "../helper/backend_helpers";
import { mobile } from "../helper/constatnt/ScreenSize";
import useMediaQuery from "../helper/hook/useMediaQuery";
import { useQuery } from "../helper/hook/useQuery";
import { isAuthenticated, logout } from "../pages/auth/Auth";
import Mobilenav from "./Mobilenav";

const NavItem = [
  { name: "Home", link: "/" },
  { name: "Sell", link: "/sell" },
  { name: "Property", link: "/property" },
  { name: "Requested", link: "/request" },
  { name: "Contactus", link: "/about" },

  // { name: "About", link: "#" },
  // { name: "Contactus", link: "#" },
];
function Navbar() {
  const [isMobileview] = useMediaQuery(mobile);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const userFromStorage = JSON.parse(localStorage.getItem("authUser"));

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
  const navigateToProperty = (e) => {
    e.preventDefault()
    navigate(`/ProfileUpdate`);
  };

  return (
    <div className="Navbar font-serif">
      <nav className=" ">
        <div className="py-3 px-1  mx-auto  ">
          <div className="flex justify-between items-center px-5">
            {isMobileview ? (
              <div className="flex items-center gap-4 lg:mt-0 text-rose-700  font-semibold">
                {NavItem.map((Nav, k) => (
                  <NavLink
                    key={k}
                    to={Nav.link || "#"}
                    className="hover:text-teal-500 "
                  >
                    {Nav.name}
                  </NavLink>
                ))}
              </div>
            ) : (
              <Mobilenav navItem={NavItem} />
            )}

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
                  <div className=" relative group">
                    <a>
                      {" "}
                      <div className="flex">
                        {" "}
                        {/* <img src={user?.profilePic} className="w-10 h-10 rounded-full"/>  */}
                         <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-teal-700  hover:text-rose-700"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <div className="pl-2 text-rose-700 font-serif hover:text-teal-700 hidden md:block lg:block">
                            {user?.firstname} {user?.lastname}
                        </div>
                      </div>
                    </a>
                    <ul className="absolute   bg-white  opcity-80 hidden  group-hover:block group-hover:right-  md:w-32">
                      <div>
                        <div className="flex hover:text-white hover:bg-blue-600 text-rose-700 ">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 hover:text-white text-teal-700"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                            />
                          </svg>
                          <button className="  text-start  px-1 md:w-28" onClick={navigateToProperty}>
                            ProfileUpdate
                          </button>
                        </div>
                      </div>
                      <div className="flex hover:text-white hover:bg-blue-600 border-t-0 border-black text-rose-700 ">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 text-teal-700 hover:text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                          />
                        </svg>
                        <button
                          className=" text-start  px-1 md:w-28"
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
                  className="inline-block px-1 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-teal-500 hover:shadow-lg focus:bg-teal-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
