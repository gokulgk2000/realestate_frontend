import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
import useMediaQuery from "../helper/hook/useMediaQuery";
import Mobilenav from "./Mobilenav";
import { mobile } from "../helper/constatnt/ScreenSize";
import Logo from "../assets/logo/logo.png";


const Header = () => {
  
  
  return (
    <div className="flex items-center  justify-start h-16 font-serif ">
        {/* <span className=" text-3xl font-semibold whitespace-nowrap text-teal-500 "><a href='/'> <img className="w-screen aspect-[5/1]" src={Logo}></img></a></span> */}
              <span className=" text-3xl font-semibold whitespace-nowrap text-teal-500 "><a href='/'> <img className="" src={Logo}></img></a></span>

    </div>
  );
};

export default Header;
