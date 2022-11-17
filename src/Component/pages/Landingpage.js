import React from "react";
import FeaturedProperty from "./FeaturedProperty";
import Image from "../assets/images/2.jpg";
const Landingpage = () => {
  return (
    <div>
      <div>
       
        <div className="flex justify-center mt-4">
          

        <div className="w-full flex justify-center items-center mb-3 pb-3">
            <form action="">
                <input type="text" placeholder="search" name="search"
                    className="md:w-96 px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0"/>
                <button type="submit" className="px-3 py-2 -ml-1.5 bg-blue-500 hover:bg-teal-700 text-white rounded-tr-full rounded-br-full">Search</button>
            </form>
       
    </div>
  {/* <div class="mb-3 ">
    <div className="flex w-screen justify-center">
      <input type="search" className="form-control relative max-w-96xl px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>
      <button class="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </button>
    </div>
  </div> */}
</div>
        <div className=" drop-shadow-xl px-5 -mt-2">
          <img className="h-96 w-full  " src={Image} />
          <h6 className="absolute text-xl text-gray-600 top-8 px-2 left-5">
            {" "}
            Real Estate
          </h6>
          <div className="absolute bottom-0 flex left-0 right-0  py-4">
            <h3 className="text-l text-white font-bold px-6 ">
              Hey, I Am The New Property
            </h3>
          </div>
          <button className="absolute bg-teal-200 w-20 h-10 text-gray-500 hover:bg-teal-700 hover:text-yellow-50 top-8 right-8 rounded-2xl">
            <a href="/register">For More</a>
          </button>
        </div>

        <div className="p-3 ">
          <h1 className="py-5 px-4 text-2xl font-bold ">Featured Properties</h1>
          <FeaturedProperty />
        </div>
        <div className=" drop-shadow-xl py-28 h bg-slate-200">
          <h3 className="absolute text-l text-slate-800 font-bold top- left-1/2 -translate-x-1/2 -translate-y-full">
            We Have A Happy Clints
          </h3>
          <button className="absolute w-32 h-10 rounded-2xl bg-gray-900 text-white hover:bg-teal-700 font-bold  top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="/">View More</a>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Landingpage;
