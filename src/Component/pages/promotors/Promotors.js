import React, { useEffect, useState } from "react";
import {
  allPromotorsList,
  allUsersList,
  GETALLUSERSBYLIMIT,
} from "../../helper/backend_helpers";
import Pagination from "../../pagination/Pagination";
import { useQuery } from "../../helper/hook/useQuery";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import image from "../../assets/images/avadar1.jpg";

const Promotors = () => {
  const query = useQuery();
  const [isLoading, setLoading] = useState(false);
  const [setPosts] = useState([]);
  const [promoterData, setPromoterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  const statusColor = {
    approved: "green",
    Pending: "#e8bf09",
    rejected: "red",
  };

  const requestSearch = (searched) => {
    setSearchText(searched);
  };

  const getAllPromotors = async () => {
    setLoading(true);
    const res = await allPromotorsList({});
    if (res.success) {
      setPromoterData(res?.promotors);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllPromotors();
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className=" md:py-2 sm:py-2 md:pl-32 md:pr-24 bg-slate-50 px-5">
      {isLoading ? (
        <div className="flex justify-center py-5  ">  
         <svg
        viewBox="0 0 119.4 122.88 "
        className="w-7 h-7 animate-spin"
        fill="#deb11f"
      >
        <path d="M83.91,26.34a43.78,43.78,0,0,0-22.68-7,42,42,0,0,0-24.42,7,49.94,49.94,0,0,0-7.46,6.09,42.07,42.07,0,0,0-5.47,54.1A49,49,0,0,0,30,94a41.83,41.83,0,0,0,18.6,10.9,42.77,42.77,0,0,0,21.77.13,47.18,47.18,0,0,0,19.2-9.62,38,38,0,0,0,11.14-16,36.8,36.8,0,0,0,1.64-6.18,38.36,38.36,0,0,0,.61-6.69,8.24,8.24,0,1,1,16.47,0,55.24,55.24,0,0,1-.8,9.53A54.77,54.77,0,0,1,100.26,108a63.62,63.62,0,0,1-25.92,13.1,59.09,59.09,0,0,1-30.1-.25,58.45,58.45,0,0,1-26-15.17,65.94,65.94,0,0,1-8.1-9.86,58.56,58.56,0,0,1,7.54-75,65.68,65.68,0,0,1,9.92-8.09A58.38,58.38,0,0,1,61.55,2.88,60.51,60.51,0,0,1,94.05,13.3l-.47-4.11A8.25,8.25,0,1,1,110,7.32l2.64,22.77h0a8.24,8.24,0,0,1-6.73,9L82.53,43.31a8.23,8.23,0,1,1-2.9-16.21l4.28-.76Z" />
      </svg><p className="pl-3">Loading...</p></div>
      ) : (
        <div>
          <Breadcrumbs className="px-0">
            <Link to="/">
              <button className="opacity-60 font p-1">Home</button>
            </Link>
            <Link to="/promotors">
              <button className="primary-text font underline p-1">
                Promotors List
              </button>
            </Link>
          </Breadcrumbs>
          <div className="flex justify-end pl-20 "> 
              <p className="primary-text">Total Mediators :</p>
              <p  className="h-7 w-7 text-black rounded- pl-2">{promoterData?.length}</p> 
              </div>
          <div className="w-full flex justify-center items-center mt-2 pb-4 ">
            <input
              type="text"
              placeholder="Search Promotors..."
              name="search"
              className="md:w-96 px-5 py-2 bg-slate-200 font-normal rounded-tl-full rounded-bl-full border-0 focus:outline-0"
              onChange={(e) => requestSearch(e.target.value)}
            />
            <button
              type="submit"
              className=" primary-button px-6 py-2 -ml-1.5 font-semibold  border-[#f2a32b] hover:bg-[#f2a32b] hover:text-white  rounded-tr-full rounded-br-full"
            >
              Search
            </button>
          </div>
          <div className="grid md:grid-cols-4 gap-x-4 gap-y-3  ">
            {promoterData
              ?.filter(
                (item) =>
                  item?.firstname
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText.toString().toLowerCase()) ||
                  item?.lastname
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText.toString().toLowerCase()) ||
                  item?.email
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText.toString().toLowerCase()) ||
                  item?.phoneno?.toString()
                    .toLowerCase()
                    .includes(searchText.toString().toLowerCase())
              )
              .slice((currentPage - 1) * 12, currentPage * 12)

              .map((Data, i) => (
                <Link
                  to={`/promotorsDetails?id=${Data?._id}`}
                  className=" px-8 py-6 rounded-xl dark:bg-gray-900 dark:text-gray-100 bg-gray-50 shadow-xl "
                  key={i}
                >
                  
         { Data.profilePic?  (
        <img
          src={Data.profilePic}
          alt=""
          className="w-32 h-32 mx-auto rounded-md dark:bg-gray-500 aspect-square"
        />
        ):( 
         <img 
         className="w-32 h-32 mx-auto rounded-md dark:bg-gray-500 aspect-square"
         src={image}/>
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
                        {Data.firstname}{Data.lastname}
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
                        <p>{Data.phoneno}</p>
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
                        {Data.email}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="text-center ">
            <nav aria-label="text-center ">
              <Pagination
                postsPerPage={12}
                totalPosts={promoterData?.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promotors;
