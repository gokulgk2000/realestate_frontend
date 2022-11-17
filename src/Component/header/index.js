import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
import useMediaQuery from "../helper/hook/useMediaQuery";
import Mobilenav from "./Mobilenav";
import { mobile } from "../helper/constatnt/ScreenSize";
import Logo from "../assets/images/logo.png";

const NavItem = [
  //{ name: "Home", link: "/" },
  { name: "Sell", link: "/sell" },
  { name: "Property", link: "/property" },
  { name: "Contactus", link: "/about" },
  
  // { name: "About", link: "#" },
  // { name: "Contactus", link: "#" },
];

const Header = () => {
  const [isMobileview] = useMediaQuery(mobile);
  
  return (
    <div className="flex items-center  justify-between p-5 bg-teal-100  ">
        <span className=" text-3xl font-semibold whitespace-nowrap text-teal-500 "><a href='/'> <img src={Logo}></img></a></span>
      {isMobileview ? (
        <div className="flex items-center gap-4 lg:mt-0 text-blue-500 font-semibold">        
          {NavItem.map((Nav, k) => (
            <NavLink key={k} to={Nav.link || "#"} className="hover:text-green-800">
              {Nav.name}
            </NavLink>
          ))}
        </div>
      ) : (
        <Mobilenav navItem={NavItem} />
      )}
    </div>
  );
};

export default Header;
