import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { map, max, min } from "lodash";
import image from "../../assets/images/avadar1.jpg";
import { getUserById, getuserProperty } from "../../helper/backend_helpers";
import { useQuery } from "../../helper/hook/useQuery";
import PropertyCard from "../PropertyCard";
import { Breadcrumbs } from "@material-tailwind/react";
import Pagination from "../../pagination/Pagination";
const MediatorsDetails = () => {
  const query = useQuery();

  const [property, setProperty] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [postsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [getUser, setGetUser] = useState(null);
  const [rerender, setRerender] = useState(true);
  // console.log("user: " ,property)
  const requestSearch = (searched) => {
    setSearchText(searched);
  };
  const getUserId = async () => {
    const res = await getUserById({
      userID: query.get("id"),
    });
    if (res.success) {
      setGetUser(res.User);
      // console.log("res", res);
    }
  };

  useEffect(() => {
    if (rerender) {
      getUserId();
      setRerender(false);
    }
  }, [rerender]);
  useEffect(() => {
    const handleFetchUserProperty = async () => {
      setLoading(true);
      const res = await getuserProperty({
        userID: query.get("id"),
      });
      if (res.success) {
        setProperty(res?.property);
        setLoading(false);
      } else {
        console.log("Error in fetching IntrestedData: ", res);
      }
    };
    handleFetchUserProperty();
    // return () => {}
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // if(property?.length === 0){
  //   return(
  //     <div className="py-10">
  //        <Breadcrumbs>
  //           <Link to="/">
  //             <button className="opacity-60 font">Home</button>
  //           </Link>
  //           <Link to="/promotors">
  //             <button className="opacity-60 font underline"> Promotors</button>
  //           </Link>
  //         </Breadcrumbs>

  //   <p className=" flex justify-center py-10 font-semibold">

  //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  // <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
  // </svg>
  //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  // <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
  // </svg>

  //     No Properties Registered Yet...</p>
  //   </div>
  //   )
  // }
  return (
    <div className="md:pl-32 md:pr-24 py-10 ">
      <div>
        {" "}
        <Breadcrumbs className=" px-0">
          <Link to="/">
            <button className="opacity-60 font p-1">Home</button>
          </Link>
          <Link to="/mediators">
            <button className="opacity-60 font p-1"> Mediators List</button>
          </Link>
          <Link to="/mediatorsDetails">
            <button className="text-amber-700 font underline p-1">
              {" "}
              Mediators Details
            </button>
          </Link>
        </Breadcrumbs>
      </div>

      <div className="md:grid grid-cols-4 po ">
        <div className="mt-3">
          {getUser?.profilePic ? (
            <img
              className=" h-60 mx-auto rounded-md dark:bg-gray-500 aspect-[1] "
              src={getUser?.profilePic}
              alt=""
            />
          ) : (
            <img
              className=" h-60 mx-auto rounded-md dark:bg-gray-500 aspect-[3/2] "
              src={image}
              alt=""
            />
          )}
        </div>
        <div className="  ">
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
              Name :{" "}
            </h2>{" "}
            <p className="text-xl font-semibold dark:text-gray-400">
              {" "}
              {getUser?.firstname} {getUser?.lastname}{" "}
            </p>
          </div>
          <div className=" my-2 space-y-1 capitalize ">
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              Email :
            </h2>{" "}
            <p className="text-xl font-semibold dark:text-gray-400">
              {getUser?.email}{" "}
            </p>
          </div>
          <div className=" my-2 space-y-1 capitalize  ">
            <h2 className="text-sm flex text-gray-500 font-semibold">
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
              Contact :
            </h2>
            <p className="text-xl font-semibold dark:text-gray-400">
              {getUser?.phoneno}{" "}
            </p>
          </div>
          <div className="fe  font-bold text-amber-500">
            <h2 className="pt-5">Review </h2>
            <button className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className=" hover:text-black w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="hover:text-black  w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="hover:text-black  w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="hover:text-black  w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className=" hover:text-black w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="text-amber-500 pl-24  font-bold">About Us</div>
        <div className=" ">
          <h2 className="text-amber-500 font-semibold ">Comments :</h2>
          <p className="text-xs text-gray-600 py-2 px-3 ">
            *Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
            <br />
            * Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
            <br />* It has survived not only five centuries, but also the leap
            into electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
      </div>
      {/* <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={userData.profile} alt="" />
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div> */}

      <div className="mt-5">
        {property?.length > 0 ? (
          <div className="grid md:grid-cols-4 gap-x-6">
            {map(
              property?.slice((currentPage - 1) * 10, currentPage * 10),
              (pro, i) => (
                <PropertyCard pro={pro} key={i} />
              )
            )}
          </div>
        ) : (
          <p className=" flex justify-center py-10 font-semibold">
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
                d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
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
                d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            No Properties Registered Yet...
          </p>
        )}
      </div>

      {property?.length > 0 && (
        <div className="text-center">
          <nav aria-label="text-center ">
            <Pagination
              postsPerPage={10}
              totalPosts={property?.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </nav>
        </div>
      )}
    </div>
  );
};

export default MediatorsDetails;
