import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUserById, getuserdetails } from "../helper/backend_helpers";
import { mobile } from "../helper/constatnt/ScreenSize";
import useMediaQuery from "../helper/hook/useMediaQuery";
import RequestedModel from "../models/RequestedModel";
import { useModal } from "../helper/hook/useModal";

import { isAuthenticated, logout } from "../pages/auth/Auth";
import Mobilenav from "./Mobilenav";
import Image from "../assets/images/avadar3.webp";
import Search from "../pages/Search";
import Login from "../pages/auth/Login";
import { Carousel } from "../pages/Carousel";
import Yo from "../assets/logo/dvav.png";
import Logo from "../assets/logo/re.png";
// import Logo from "../assets/logo/logo.png";

import { useUser } from "../pages/contextProvider/UserProvider";
const NavItem = [
  { name: "HOME", link: "/" },
  { name: "SELL", link: "/sell" },
  { name: "CONTACT US ", link: "/about" },
  // { name: "", link: "/property" },
  // { name: "REQUESTED", link: "/request" },
  // { name: "About", link: "#" },
  // { name: "Contactus", link: "#" },
];
function Navbar() {
  const { currentUser: userFromStorage, setCurrentUser } = useUser();
  // console.log("userData", userData);
  // const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [isMobileview] = useMediaQuery(mobile);
  const [user, setUser] = useState({});
  const [modalOpen, setModalOpen] = useModal(false);

  // const [property, setproperty] = useState("");
  // const [currentUser, setCurrentUser] = useState();
  // const query = useQuery();
  // const id = query.get("id");

  // const userFromStorage = JSON.parse(localStorage.getItem("authUser"));

  // console.log("user",user)
  const getUserName = async () => {
    const res = await getUserById({
      userID: userFromStorage?.userID,
    });
    if (res.success) {
      setUser(res.User);

      console.log(user, "user");
    }
  };
  useEffect(() => {
    getUserName();
  }, [userFromStorage]);
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

  const AuthLogout = () => {
    logout();
    setCurrentUser(null);
    navigate("/");
  };

  const navigateToProfile = (e) => {
    e.preventDefault();
    navigate(`/ProfileUpdate`);
  };
  const naviagteToLogin = (e) => {
    e.preventDefault();
    navigate(`/login`);
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
    console.log(user, "user");
    const payload = {
      userId: userFromStorage?.userID,
    };

    const res = await getuserdetails(payload);
    if (res.success) {
      setUser(res?.User);
    } else {
      console.log("errors", res);
    }
    navigate(`/payment?id=${user?._id}&email=${user?.email}`);
  };

  const activeClass =
    "border-b-2  text-white border-orange-500 hover:text-white font";

  return (
    <div>
      {modalOpen && (
        <RequestedModel
          show={modalOpen}
          onCloseClick={() => setModalOpen(false)}
          // currentUser={requestData?._id}
        />
      )}

      <div className="Navbar  uppercase  sticky top-0 z-100 ">
        <nav className="">
          <div className="   mx-auto  ">
            <div className="flex justify-between items-center primary   shadow-md  py-5 px-2 md:px-0 lg:px-28 lg:justify-between ">
              <span className=" text-3xl font-semibold whitespace-nowrap text-teal-500 hidden md:block pl-5">
                <Link to="/">
                  {" "}
                  <img className="h-12" src={Yo}></img>
                </Link>
              </span>

              {isMobileview ? (
                <div className="flex items-center gap-6  lg:mt-0   text-md ">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? activeClass
                        : "text-white hover:text-orange-500 "
                    }
                  >
                    <div className=" hover:border-0 ">HOME</div>{" "}
                  </NavLink>
                  <NavLink
                    to="/sellproperty"
                    className={({ isActive }) =>
                      isActive
                        ? activeClass
                        : "text-white   hover:text-orange-500  "
                    }
                  >
                    {" "}
                    <div className="hover:border-0 ">SELL </div>
                  </NavLink>
                  <NavLink
                    to="/promotors"
                    className={({ isActive }) =>
                      isActive
                        ? activeClass
                        : "text-white   hover:text-orange-500"
                    }
                  >
                    <div className="hover:border-0 ">PROMOTORS</div>
                  </NavLink>{" "}
                  <NavLink
                    to="/mediators"
                    className={({ isActive }) =>
                      isActive
                        ? activeClass
                        : "text-white   hover:text-orange-500"
                    }
                  >
                    <div className="hover:border-0 ">MEDIATORS</div>
                  </NavLink>{" "}
                  {/* <NavLink
                    to="/mediators"
                    className={({ isActive }) =>
                      isActive
                        ? activeClass
                        : "text-white   hover:text-orange-500"
                    }
                  >
                    <div className="hover:border-0 ">PROJECTS</div>
                  </NavLink>{" "} */}
                  {/* <div className="pl-2 rounded-lg px-2 ">
                    {userFromStorage ? (
                      <button
                        onClick={() => setModalOpen(true)}
                        className=" uppercase text-md hover:text-black flex items-center gap-4 justify-center hover:border-b-2 hover:border-black"
                      >
                        Buyer Request
                      </button>
                    ) : (
                      <button onClick={naviagteToLogin} className=" uppercase text-md hover:text-black flex items-center gap-4 justify-center hover:border-b-2 hover:border-black">
                        Buyer Request
                      </button>
                    )}
                  </div> */}
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? activeClass
                        : "text-white   hover:text-orange-500"
                    }
                  >
                    <div className="hover:border-0 ">CONTACT US</div>
                  </NavLink>{" "}
                  {/* <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? activeClass
                        : "text-white   hover:text-orange-500"
                    }
                  >
                    <div className="hover:border-0 ">ABOUT US</div>
                  </NavLink> */}
                </div>
              ) : (
                <div className="flex">
                  {" "}
                  <div className="pt-">
                    <Mobilenav />
                  </div>
                  {/* <div>
                    {" "}
                    <Link to="/">
                      {" "}
                      <img className="h-16 w-16" src={Logo}></img>
                    </Link>
                  </div> */}
                </div>
              )}
              {/* <Search/> */}
              <div className=" md:-mr-3 ">
                {isAuthenticated() ? (
                  <div className=" flex justify-start gap-5">
                    <Link   to="/buyer" title="interested">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#f5190a"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="white"
                        className="w-7 h-7 text-red-600 "
                        
                       
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </Link>
                    <div>
                      <div className=" relative  group">
                        {" "}
                        <div className="flex">
                          {" "}
                          <img
                            src={user?.profilePic || Image}
                            className="w-7 h-7 rounded-full cursor-pointer"
                            rule="true"
                          />
                        </div>
                        <ul className="absolute   bg-white rounded-tr-3xl  rounded-bl-3xl pl-2  opcity-80 hidden  group-hover:block group-hover:right-2 group-hover:shadow-md ">
                          <div>
                            <div className="flex   ">
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 pt-2 text-teal-700"
                                onClick={navigateToProfile}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                />
                              </svg>
                              <button
                                className="  text-start font nav-txt p-1  hover:shadow-none rounded shadow-sm"
                                onClick={navigateToProfile}
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
                              strokeWidth="1.5"
                              stroke="currentColor"
                              onClick={(e) => navigateToYourActivities(e)}
                              className="w-6 h-6 pt-2  text-teal-700 "
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                              />
                            </svg>
                            <button
                              className=" text-start  p-1 font  nav-txt  hover:shadow-none rounded shadow-sm"
                              onClick={(e) => navigateToYourActivities(e)}
                            >
                              Manage properties
                            </button>
                          </div>{" "}
                          <div></div>
                          <div>
                            <div className="flex  border-t-0 border-black  ">
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
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
                                className=" text-start  p-1  font  nav-txt  hover:shadow-none rounded shadow-sm"
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
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 pt-2 text-teal-700"
                              onClick={AuthLogout}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                              />
                            </svg>
                            <button
                              className=" text-start  p-1  font nav-txt  hover:shadow-none rounded shadow-sm"
                              onClick={AuthLogout}
                            >
                              Logout
                            </button>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="inline-block px-6 py-2 bg-white text-[#a48641] font-semibold text-md leading-snug uppercase rounded-lg shadow-md tracking-wide hover:bg-black  hover:text-white hover:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    <Link to="/login">Login</Link>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
