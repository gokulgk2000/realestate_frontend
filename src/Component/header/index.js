import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../App.css";
import useMediaQuery from "../helper/hook/useMediaQuery";
import Mobilenav from "./Mobilenav";
import { mobile } from "../helper/constatnt/ScreenSize";
// import Logo from "../assets/logo/logo.png";


const Header = () => {
  
  
  return (
    <div className="flex items-center  justify-start font-Rubik,sans-serif; bg-white pl-5">
        {/* <span className=" text-3xl font-semibold whitespace-nowrap text-teal-500 "><a href='/'> <img className="w-screen h-60 aspect-[5/1]" src={Logo}></img></a></span> */}
              {/* <span className=" text-3xl font-semibold whitespace-nowrap text-teal-500 pl-20"><Link to='/'> <img className="h-16" src={Logo}></img></Link></span> */}

    </div>
  );
};

export default Header;
