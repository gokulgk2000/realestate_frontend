import React from 'react';
import { NavLink } from 'react-router-dom';
import { mobile } from '../helper/constatnt/ScreenSize';
import useMediaQuery from '../helper/hook/useMediaQuery';
import Mobilenav from './Mobilenav';


const NavItem = [
    { name: "Home", link: "/" },
    { name: "Sell", link: "/sell" },
    { name: "Property", link: "/property" },
    { name: "Contactus", link: "/about" },
    
    // { name: "About", link: "#" },
    // { name: "Contactus", link: "#" },
  ];

function Navbar(){
    

  const [isMobileview] = useMediaQuery(mobile);
 return(
    <div className='Navbar'>
<nav className="bg-gray-50 dark:bg-gray-700">
    <div className="py-3 px-1  mx-auto  ">
        <div className="flex justify-between items-center px-5">
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
       
            {/* <ul  className="flex flex-row  mt-0  sm:space-x-8  space-x-2 text-sm font-medium ">
                <li>
                    <a href="/about" className="text-gray-900 dark:text-white hover:underline font-semibold" aria-current="page">About us</a>
                </li>
                {/* <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline font-semibold">Company</a>
                </li> */}
                {/* <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline font-semibold">Recent</a>
                </li> 
                <li>
                    <a href="/property" className="text-gray-900 dark:text-white hover:underline font-semibold">Property</a>
                </li>
                <li>
                    <a href="/feedback" className="text-gray-900 dark:text-white hover:underline font-semibold">Feedback</a>
                </li>
            </ul> */}
            <div ><button
                type="button"
                className="inline-block px-1 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                <a href="/login" >Login</a>
              </button></div>
              </div> 
           </div>
  
</nav>
</div>
)}

export default Navbar;