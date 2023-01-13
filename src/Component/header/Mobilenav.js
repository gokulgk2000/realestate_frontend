import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../header/MobileNav.css";
import { NavLink } from "react-router-dom";

const Mobile = [
  { name: "HOME", link: "/" },
  { name: "SELL", link: "/sellproperty" },
  // { name: "BUY", link: "/buyer" },
  { name: "PROMOTORS", link: "/promotors" },
  { name: "MEDIATORS", link: "/mediators" },
  { name: "CONTACT US ", link: "/contact" },
  // { name: "ABOUT US ", link: "/about" },
];

const Mobilenav = (navItem) => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div>
      {isMobile && (
        <ul className="ul py-9 space-y-2 text-white leading-10 bg-orange-500  font">
          {Mobile.map((Mob, l) => (
            <NavLink
              key={l}
              to={Mob.link || "#"}
              className=""
              onClick={() => setIsMobile(false)}
            >
              <li> {Mob.name}</li>
            </NavLink>
          ))}
        </ul>
      )}
      <button className="" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? (
          <div className=" burger-bar show "></div>
        ) : (
          <div className="burger-bar z-50  "></div>
        )}
      </button>
    </div>
  );
};

export default Mobilenav;
