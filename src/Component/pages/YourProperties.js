import React, { useEffect, useState, useMemo } from "react";
import Pagination from "../pagination/Pagination";
import { useQuery } from "../helper/hook/useQuery";
import { getuserProperty } from "../helper/backend_helpers";
import { Link } from 'react-router-dom';
import { Breadcrumbs } from "@material-tailwind/react";
const Activities = () => {
  const query = useQuery();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [postsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));

  const requestSearch = (searched) => {
    setSearchText(searched);
  };

  useEffect(() => {
    const handleFetchUserProperty = async () => {
      setLoading(true);
      const res = await getuserProperty({
        userID: currentUser?.userID,
      });
      if (res.success) {
        setUserData(res?.property);
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

  return (
    <div>
      <Breadcrumbs>
      <Link to="/">
          <button  className="opacity-60 font underline">
           Home
          </button></Link>
         
      </Breadcrumbs>
      <div className=" overflow-x-auto  shadow-md sm:rounded-lg">
        <div className="w- flex justify-center items-center mt-2 pb-4  ">
          <input
            type="text"
            placeholder="search"
            name="search"
            className="md:w-96 px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0"
            onChange={(e) => requestSearch(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 py-2 -ml-1.5 grad-btn text-white rounded-tr-full rounded-br-full"
          >
            Search
          </button>
        </div>
       
        <div className="md:grid  ">
          {" "}
          <table className=" text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              <tr>
                <th scope="col" className="py-3 px-3  text-rose-700">
                  S.No
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700 hidden md:block">
                  <div className="flex items-center">
                    Facing
                    <a href="#"></a>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                  <div className="flex items-center">
                    Location
                    <a href="#"></a>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700 hidden md:block">
                  <div className="flex items-center">
                    askPrice
                    <a href="#"></a>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                  <div className="flex items-center">
                    nearTown
                    <a href="#"></a>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6  text-rose-700">
                  <div className="flex items-center">
                    Property Details
                    <a href="#"></a>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {userData
                ?.filter(
                  (item) =>
                    item?.facing
                      .toString()
                      .toLowerCase()
                      .includes(searchText.toString().toLowerCase()) ||
                    item?.location
                      .toString()
                      .toLowerCase()
                      .includes(searchText.toString().toLowerCase()) ||
                    item?.askPrice
                      .toString()
                      .toLowerCase()
                      .includes(searchText.toString().toLowerCase()) ||
                    item?.nearTown
                      .toString()
                      .toLowerCase()
                      .includes(searchText.toString().toLowerCase())
                )
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map((Data, i) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={i}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {i + 1}
                    </th>
                    <td className="py-4 px-6 capitalize hidden md:block">{Data?.facing}</td>
                    <td className="py-4 px-6">{Data?.location}</td>
                    <td className="py-4 px-6 capitalize hidden md:block">{Data?.askPrice}</td>
                    <td className="py-4 px-6">{Data?.nearTown}</td>
                    <td className="py-4 px-6 items-center">
                    <Link to={`/yourEdit?id=${Data?._id}`} className="font-medium   text-amber-700  dark:text-blue-500 hover:underline">View</Link>
                </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="">
          <nav aria-label="">
            {/* <Posts posts={currentPosts} /> */}
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={userData?.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Activities;
