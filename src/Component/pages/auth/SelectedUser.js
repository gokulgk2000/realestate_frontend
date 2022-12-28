import React from "react";
import { Link } from "react-router-dom";

const SelectedUser = () => {
  return (
    <section className="h-100">
      <div className="px-6 h-full text-gray-800 py-5">
        <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6  ">
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <div className="flex flex-row items-center justify-center lg:justify-center">
              <p className=" text-3xl text-teal-500 font-bold mb-0 mr-8">
                Sign Up
              </p>
            </div>
            <div className="flex justify-center mt-10 pr-16 gap-6">
              <Link to={"/buyerregister"}>
                <button className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  Buyer
                </button>
              </Link>
              <Link to={"/sellerregister"}>
                <button className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-teal-700 hover:shadow-lg focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  Seller
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedUser;
