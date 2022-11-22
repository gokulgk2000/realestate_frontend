import React from "react";
import Image from "../assets/images/2.jpg";
const Landingpage = () => {
  return (
    <div>
      <div className="font-serif">
      <div className="w-full flex justify-center items-center mt-2 pb-4 ">
        <form action="">
          <input
            type="text"
            placeholder="search"
            name="search"
            className="md:w-96 px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0"
           // onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 py-2 -ml-1.5 bg-blue-500 hover:bg-teal-700 text-white rounded-tr-full rounded-br-full"
          >
            Search
          </button>
        </form>
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

        {/* <div className="p-3 ">
          <h1 className="py-5 px-4 text-2xl font-bold ">Featured Properties</h1>
          <Property />
        </div> */}
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
