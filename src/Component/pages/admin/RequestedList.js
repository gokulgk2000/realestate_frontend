import React, { useEffect, useState } from "react";
import {
  allUsersList,
  GETALLUSERSBYLIMIT,
  getrequested,
} from "../../helper/backend_helpers";
import Pagination from "../../pagination/Pagination";
import { useQuery } from "../../helper/hook/useQuery";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const RequestedList = () => {
  const query = useQuery();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  console.log("requestData", requestData);

  const requestSearch = (searched) => {
    setSearchText(searched);
  };

  const getAllRequested = async () => {
    setLoading(true);
    const res = await getrequested({});
    console.log("dsp:", res);
    if (res.success) {
      setRequestData(res.requested);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllRequested();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await GETALLUSERSBYLIMIT({
        userId: query.get("id"),
      });
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Breadcrumbs>
        <a href="/admin/Dashboard" className="opacity-60 font">
          Dashboard
        </a>
        <a href="/admin/userlist" className=" text-amber-700 font">
          Sellers
        </a>
      </Breadcrumbs>
      <div className=" overflow-x-auto  shadow-md sm:rounded-lg">
        <div className="w-full flex justify-center items-center mt-2 pb-4 ">
          <input
            type="text"
            placeholder="Search Sellers"
            name="search"
            className="md:w-96 px-3 py-2 bg-slate-200 font-light rounded-tl-full rounded-bl-full border-0 focus:outline-0"
            onChange={(e) => requestSearch(e.target.value)}
          />

          <button
            type="submit"
            className=" grad1 px-3 py-2 -ml-1.5 bg-amber-700 hover:bg-amber-900 text-white rounded-tr-full rounded-br-full"
          >
            Search
          </button>
        </div>
        <div className="md:grid  ">
          {" "}
          <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6   text-amber-700">
                  S.No
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700">
                  <div className="flex items-center">User Nmae</div>
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700">
                  <div className="flex items-center">Facing</div>
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700">
                  <div className="flex items-center">Location</div>
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700">
                  <div className="flex items-center">Price</div>
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700">
                  <div className="flex items-center">Near town</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {requestData
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
                    <td className="py-4 px-6 capitalize">
                      {Data?.regUser?.firstname} {Data?.regUser?.lastname}
                    </td>
                    <td className="py-4 px-6 capitalize">{Data?.facing}</td>
                    <td className="py-4 px-6 ">{Data?.location}</td>
                    <td className="py-4 px-6 capitalize">{Data?.askPrice}</td>
                    <td className="py-4 px-6 capitalize">{Data?.nearTown}</td>
                    {/* <td className="py-4 px-6 items-center">
                    <Link to={`/admin/userdetails?id=${Data?._id}`} className="font-medium   text-amber-700  dark:text-blue-500 hover:underline">View</Link>
                </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="justify-content px-96 mt-2">
          <nav aria-label="Page navigation example justify-center">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={requestData?.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </nav>
        </div>
      </div>

      {/* <nav aria-label="Page flex navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <a href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          </a>
        </li>
        <li>
          <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
        </li>
        <li>
          <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
        </li>
        <li>
          <a href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
        </li>
        <li>
          <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
        </li>
        <li>
          <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
        </li>
        <li>
          <a href="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
          </a>
        </li>
      </ul>
    </nav> 
    */}
    </div>
  );
};

export default RequestedList;
