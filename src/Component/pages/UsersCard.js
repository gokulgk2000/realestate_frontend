import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/images/avadar1.jpg";

const UsersCard = ({ pro }) => {
  return (
    <div className="px-2" >
    <Link
      to={`/promotorsDetails?id=${pro?._id}`}
      className=" px-8 py-6 rounded-xl dark:bg-gray-900 dark:text-gray-100 bg-gray-50 shadow-xl h-96 grid  gap-x-4 "
    >
      {pro?.profilePic ? (
        <img
          src={pro?.profilePic}
          alt=""
          className="w-32 h-32 mx-auto rounded-md dark:bg-gray-500 aspect-square"
        />
      ) : (
        <img
          className="w-32 h-32 mx-auto rounded-md dark:bg-gray-500 aspect-square"
          src={image}
        />
      )}
      <div className="space-y-4  divide-y divide-gray-300">
        <div className="my-2 space-y-1 capitalize">
          <h2 className=" text-sm flex text-gray-500 font-semibold ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Promotor's Name
          </h2>
          <p className=" text-xl font-semibold dark:text-gray-400">
            {" "}
            {pro?.firstname}
            {pro?.lastname}
          </p>
        </div>
        <div className="flex justify-start pt-2 space-x-4 align-center">
          <div className="font">
            {" "}
            <h2 className=" flex text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                />
              </svg>
              Contact{" "}
            </h2>
            <p>{pro?.phoneno}</p>
          </div>
        </div>
        <div className="my-2 space-y-1">
          <h2 className="text-sm  flex text-gray-500 font-semibold ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            Email{" "}
          </h2>
          <p className=" text-xs font-semibold dark:text-gray-400">
            {pro?.email}
          </p>
        </div>
      </div>
    </Link>
    </div>
  );
};

export default UsersCard;
