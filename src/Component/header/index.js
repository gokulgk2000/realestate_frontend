import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
import useMediaQuery from "../helper/hook/useMediaQuery";
import Mobilenav from "./Mobilenav";
import { mobile } from "../helper/constatnt/ScreenSize";
import Logo from "../assets/images/logo.png";


const Header = () => {
  
  
  return (
    <div className="flex items-center  justify-between p-5 bg-teal-100  ">
        <span className=" text-3xl font-semibold whitespace-nowrap text-teal-500 "><a href='/'> <img src={Logo}></img></a></span>
       
    </div>
  );
};

export default Header;
