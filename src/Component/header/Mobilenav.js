import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../header/MobileNav.css";
import { NavLink } from "react-router-dom";

const Mobile = [
  { name: "Home", link: "/" },
  { name: "Sell", link: "/sell" },
  { name: "Property", link: "/property" },
  { name: "Requested", link: "/request" },
  { name: "Contactus", link: "/about" },
];

const Mobilenav = (navItem) => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div>
      {isMobile && (
        <ul className="ul  py-10 space-y-4 leading-10 bg-blue-300 text-rose-700 font-serif">
          {Mobile.map((Mob, l) => (
            <NavLink
              key={l}
              to={Mob.link || "#"}
              className="hover:text-green-800"
              onClick={() => setIsMobile(false)}
            >
              <li> {Mob.name}</li>
            </NavLink>
          ))}
        </ul>
      )}
      <button className="" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? (
          <div className="burger-bar show "></div>
        ) : (
          <div className="burger-bar z-50 "></div>
        )}
      </button>
    </div>
  );
};

export default Mobilenav;
