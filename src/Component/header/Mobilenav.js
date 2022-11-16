import React, { useState } from "react";
import "../header/MobileNav.css";

const Mobilenav = (navItem) => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <div>
      {isMobile && (
        <ul className="ul  py-5 space-y-4 font-semibold bg-teal-100 ">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            
            <a href="/sell">Sell</a>
          </li>
          <li>
            
            <a href="/propertyAgents">propertyAgents</a>
          </li>
        </ul>
      )}

      <button className="" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? (
          <div className="burger-bar show "></div>
        ) : (
          <div className="burger-bar z-50"></div>
        )}
      </button>
    </div>
  );
};

export default Mobilenav;
