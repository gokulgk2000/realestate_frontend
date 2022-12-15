import React, { useEffect, useState } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  getPropertiescategoryId,
  getUserById,
  getuserdetails,
} from "../helper/backend_helpers";
import { mobile } from "../helper/constatnt/ScreenSize";
import useMediaQuery from "../helper/hook/useMediaQuery";
import { useModal } from "../helper/hook/useModal";
import { useQuery } from "../helper/hook/useQuery";
import { isAuthenticated, logout } from "../pages/auth/Auth";
import Mobilenav from "./Mobilenav";
import Image from "../assets/images/avadar3.webp";
import Search from "../pages/Search";
import Login from "../pages/auth/Login";

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
  // const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [isMobileview] = useMediaQuery(mobile);
  const [user, setUser] = useState({});
  const [rerender, setRerender] = useState(true);

  // const [property, setproperty] = useState("");
  // const [currentUser, setCurrentUser] = useState();
  // const query = useQuery();
  // const id = query.get("id");

  const userFromStorage = JSON.parse(localStorage.getItem("authUser"));

  // console.log("user",user)
  const getUserName = async () => {
    const res = await getUserById({
      userID: userFromStorage?.userID,
    });
    if (res.success) {
      setRerender(true);
      setUser(res.User);

      // console.log("res", res);
    }
  };
  useEffect(() => {
    if (rerender) {
      getUserName();
      setRerender(false);
    }
  }, [rerender]);
  // const categories = async () => {
  //   const res = await getPropertiescategoryId({
  //     id,
  //     searchText,
  //   });

  //   if (res.success) {
  //     setproperty(res.category);

  //     console.log("first", res);
  //   } else {
  //   }
  // };

  // useEffect(() => {
  //   categories();
  // }, [searchText]);

const AuthLogout=()=>{

  logout()
  navigate("/")
}

  const navigateToProfile = (e) => {
    e.preventDefault();
    navigate(`/ProfileUpdate`);
  };

  // const navigateToProperty = (e) => {
  //   e.preventDefault();
  //   navigate(`/property?search=${searchText}`);
  // };

  const navigateToUserActivities = (e) => {
    // e.preventDefault();
    navigate(`/UserActivties?`);
  };

  const navigateToInterested = (e) => {
    e.preventDefault();
    navigate(`/request`);
  };
  const navigateToYourActivities = (e) => {
    // e.preventDefault();
    navigate(`/yourProperties?`);
  };
  
  const handlepay = async () => {
    console.log(user,"user")
    const payload = {
      userId: userFromStorage?.userID,
    };
    
    const res = await getuserdetails(payload);
    if (res.success) {
      setUser(res?.User);
    } else {
      console.log("errors", res);
    } 
    navigate(`/payment?id=${user?._id}`)
  };
  return (
    <div className="Navbar  uppercase md:sticky top-0 bg-white  z-10  grad1 ">
      <nav className=" ">
        <div className="py-3 px-1  mx-auto  ">
          <div className="flex justify-between items-center px-5">
            {isMobileview ? (
              <div className="flex items-center gap-4 lg:mt-0 text-black  font">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "shadow-sm "
                      : "text-black p-1 hover:shadow-none rounded shadow-md flex items-center gap-4 justify-center "
                  }
                >
                  <div className="hover:text-amber-700">HOME</div>{" "}
                </NavLink>
                {userFromStorage ? (
                  <NavLink
                    to="/sellproperty"
                    className={({ isActive }) =>
                      isActive
                        ? "shadow-sm"
                        : "text-black p-1 hover:shadow-none rounded shadow-md flex items-center gap-4 justify-center "
                    }
                  >
                    {" "}
                    <div className="hover:text-amber-700">SELL PROPERTY</div>
                  </NavLink>
                ) : (
                  <Link to="/property"></Link>
                )}{" "}
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "shadow-sm"
                      : "text-black p-1 hover:shadow-none rounded shadow-md flex items-center gap-4 justify-center "
                  }
                >
                  <div className="hover:text-amber-700">CONTACT US</div>
                </NavLink> <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "shadow-sm"
                      : "text-black p-1 hover:shadow-none rounded shadow-md flex items-center gap-4 justify-center "
                  }
                >
                  <div className="hover:text-amber-700">ABOUT US</div>
                </NavLink>
              </div>
            ) : (
              <Mobilenav />
            )}
{/* <Search/> */}

            <div className=" ">
              {isAuthenticated() ? (
                <div>
                  <div className=" relative  group">
                    <a>
                      {" "}
                      <div className="flex">
                        {" "}
                        <img
                          src={user?.profilePic || Image}
                          className="w-10 h-10 rounded-full"
                           />
                        <span>
                          <div className="px-2 pt-1 text-slate-200 font hover:text-amber-300 hidden md:block lg:block border-t-0 border-l-0 grad1 hover:shadow-sm  rounded shadow-md">
                            {user?.firstname} {user?.lastname}
                          </div>
                        </span>
                      </div>
                    </a>
                    <ul className="absolute   bg-white rounded-tr-3xl  rounded-bl-3xl pl-2  opcity-80 hidden  group-hover:block group-hover:right-2 group-hover:shadow-md ">
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
                           
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                            />
                          </svg>
                          <button
                            className="  text-start font hover:text-amber-700 uppercase p-1  hover:shadow-none rounded shadow-sm"
                          
                          >
                            Profile
                          </button>
                        </div>
                      </div>
                      <div className="flex  border-t-0 border-black  ">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          onClick={(e) => navigateToYourActivities(e)}
                          className="w-6 h-6 pt-2  text-teal-700 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                          />
                        </svg>
                        <button
                          className=" text-start  p-1 font hover:text-amber-700 uppercase hover:shadow-none rounded shadow-sm"
                          onClick={(e) => navigateToYourActivities(e)}
                        >
                          your properties
                        </button>
                      </div>{" "}
                      <div>
                        {/* <div className="flex  border-t-0 border-black  ">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="1.5"
                            className="w-6 h-6 pt-2  text-teal-700 "
                            onClick={navigateToUserActivities}
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
                            className=" text-start  p-1  font hover:text-amber-700 uppercase hover:shadow-none rounded shadow-sm"
                            onClick={(e) => navigateToUserActivities(e)}
                          >
                            Activities
                          </button>
                        </div>{" "} */}
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
                            onClick={navigateToUserActivities}
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
                            className=" text-start  p-1  font hover:text-amber-700 uppercase hover:shadow-none rounded shadow-sm"
                            onClick={handlepay}
                          >
                           Payment
                          </button>
                        </div>{" "}
                      </div>
                      <div className="flex  border-t-0 border-black  ">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 pt-2 text-teal-700"
                          onClick={AuthLogout }
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                          />
                        </svg>
                        <button
                          className=" text-start  p-1  font hover:text-amber-700 uppercase hover:shadow-none rounded shadow-sm"
                          onClick={AuthLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </ul>
                  </div>
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
