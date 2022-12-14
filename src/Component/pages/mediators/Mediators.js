import React, { useEffect, useState } from "react";
import {
  allFacilatorsList,
  allUsersList,
  GETALLUSERSBYLIMIT,
} from "../../helper/backend_helpers";
import Pagination from "../../pagination/Pagination";
import { useQuery } from "../../helper/hook/useQuery";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import image from "../../assets/images/avadar1.jpg";

const Mediators = () => {
  const [isLoading, setLoading] = useState(false);

  const [facilatorsData, setFacilatorsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  // console.log("promoters",promoterData)

  const statusColor = {
    approved: "green",
    Pending: "#e8bf09",
    rejected: "red",
  };

  const requestSearch = (searched) => {
    setSearchText(searched);
  };

  const getAllfacilators = async () => {
    setLoading(true);
    const res = await allFacilatorsList({});
    if (res.success) {
      setFacilatorsData(res?.facilatorslist);
      console.log(res, ":gokul");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllfacilators();
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className=" md:py-2 sm:py-2 md:pl-32 md:pr-24 bg-slate-50 px-5">
      {isLoading ? (
        <div className="flex justify-center py-5  "> Loading...</div>
      ) : (
        <div>
          <Breadcrumbs className="px-0">
            <Link to="/">
              <button className="opacity-60 font p-1">Home</button>
            </Link>
            <Link to="/mediators">
              <button className="text-amber-700 font underline p-1">
                Mediators List
              </button>
            </Link>
          </Breadcrumbs>

          <div className="w-full flex justify-center items-center mt-2 pb-4 ">
            <input
              type="text"
              placeholder="Search Mediators..."
              name="search"
              className="md:w-96 px-5 py-2 bg-slate-200 font-normal rounded-tl-full rounded-bl-full border-0 focus:outline-0"
              onChange={(e) => requestSearch(e.target.value)}
            />
            <button
              type="submit"
              className=" nav-color px-6 py-2 -ml-1.5 font-semibold text-white rounded-tr-full rounded-br-full"
            >
              Search
            </button>          <div className="h-7 w-7 bg-amber-800 text-white rounded-full pl-2">{facilatorsData?.length}</div>

          </div>
          <div className="grid md:grid-cols-4 gap-x-4 gap-y-3  ">
            {facilatorsData
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
                  item?.phoneno
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText.toString().toLowerCase()) ||
                  item?.email
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText.toString().toLowerCase())
              )
              .slice((currentPage - 1) * 12, currentPage * 12)
              .map((Data, i) => (
                <Link
                  to={`/mediatorsDetails?id=${Data?._id}`}
                  className=" px-8 py-6 rounded-xl dark:bg-gray-900 dark:text-gray-100 bg-gray-50 shadow-xl "
                  key={i}
                >
                  {Data.profilePic ? (
                    <img
                      src={Data.profilePic}
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
                        Facilator's Name
                      </h2>
                      <p className=" text-xl font-semibold dark:text-gray-400">
                        {" "}
                        {Data.firstname} {Data.lastname}
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
                        {Data?.email}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="text-center">
            <nav aria-label="text-center ">
              <Pagination
                postsPerPage={12}
                totalPosts={facilatorsData?.length}
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

export default Mediators;
