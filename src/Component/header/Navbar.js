import React from 'react';



function Navbar(){

 return(
    <div className='Navbar'>
<nav className="bg-gray-50 dark:bg-gray-700">
    <div className="py-3 px-1 mx-auto max-w-screen-xl md:px-6">
        <div className="flex justify-around items-center">
            <ul className="flex flex-row mt-0 space-x-8 text-sm font-medium ">
                <li>
                    <a href="/about" className="text-gray-900 dark:text-white hover:underline font-semibold" aria-current="page">About us</a>
                </li>
                {/* <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline font-semibold">Company</a>
                </li> */}
                {/* <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline font-semibold">Recent</a>
                </li> */}
                <li>
                    <a href="/featuredproperty" className="text-gray-900 dark:text-white hover:underline font-semibold">Featured Property</a>
                </li>
                <li>
                    <a href="/feedback" className="text-gray-900 dark:text-white hover:underline font-semibold">Feedback</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</div>
)}

export default Navbar;