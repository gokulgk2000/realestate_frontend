import React from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
import useMediaQuery from "../helper/hook/useMediaQuery";
import Mobilenav from "./Mobilenav";
import { mobile } from "../helper/constatnt/ScreenSize";

const NavItem = [
  { name: "Home", link: "/" },
  { name: "Sell", link: "/sell" },
  { name: "Property Agents", link: "#" },
  { name: "About", link: "#" },
  { name: "Contactus", link: "#" },
];

const Header = () => {
  const [isMobileview] = useMediaQuery(mobile);
  return (
    <div className="flex items-center  justify-between p-5 bg-blue-300  ">
        <span className=" text-3xl font-semibold whitespace-nowrap text-white "><a href='/'>Real Estate</a></span>
      {isMobileview ? (
        <div className="flex items-center gap-4  lg:mt-0 text-black font-semibold">        
          {NavItem.map((Nav, k) => (
            <NavLink key={k} to={Nav.link || "#"}>
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
