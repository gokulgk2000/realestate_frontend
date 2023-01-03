import React, { useEffect, useState } from "react";
import {
  allUsersList,
  getAllrequested,
  GETALLUSERSBYLIMIT,
  getrequested,
} from "../../helper/backend_helpers";
import Pagination from "../../pagination/Pagination";
import { useQuery } from "../../helper/hook/useQuery";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const RequestedList = () => {
  const query = useQuery();
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  // console.log("requestData", requestData);

  const requestSearch = (searched) => {
    setSearchText(searched);
  };

  const getAllRequested = async () => {
    setLoading(true);
    const res = await getAllrequested({});
    if (res.success) {
      setRequestData(res.requested);
    console.log("dsp:", res);

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
      {isLoading ? (
          <div className="text-center py-20   ">
            <button type="button" className=" text-amber-700 border border-amber-700 py-2 px-3 rounded-lg">
            
              Loading...
            </button>
          </div>
        ) : (
          <>
        <Breadcrumbs>
      <Link to="/admin">
        <button  className="opacity-60 font">
          Dashboard
        </button></Link>
      <Link to="/admin/requestedlist" disabled>
        <button  className="text-amber-700 font">
          Requested List
        </button></Link>
       
      </Breadcrumbs>
      <div className=" overflow-x-auto  shadow-md sm:rounded-lg">
        <div className="w-full flex justify-center items-center mt-2 pb-4 ">
          <input
            type="text"
            placeholder="Search Buyers"
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
        <div className="md:hidden">
          {" "}
          {requestData
            ?.filter(
              (item) =>
                item?.regUser?.firstname?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                item?.regUser?.lastname?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                item?.location?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                item?.expectedPrice?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                item?.landArea?.toString().toLowerCase().includes(searchText.toString().toLowerCase())
            )
            .slice((currentPage - 1) * 10, currentPage * 10)
            .map((Data, i) => (
              <div key={i}>
                <details
                  class=" open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-2 rounded-lg"
                  close
                >
                  <summary>
                    <span> {i + 1} .</span>{" "}
                    <span className="capitalize pl-2">
                      {" "}
                      {Data?.regUser?.firstname} {Data?.regUser?.lastname}{" "}
                    </span>
                  </summary>
                  <li className="pl-5 py-4 grid  gap-3 ">
                    <li>Location: {Data?.location}</li>
                    <li>Price:{Data?.expectedPrice}</li>
                    <li>Neartown : {Data?.nearTown}</li>

                    <li>Facing: {Data?.facing}</li>
                  </li>
                </details>
              </div>
            ))}
        </div>
        <div className="md:grid  hidden">
          {" "}
          <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6   text-amber-700">
                  S.No
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700">
                  <div className="flex items-center">User Name</div>
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
                  <div className="flex items-center">Land Area</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {requestData
                ?.filter(
                  (item) =>
                    item?.facing?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                    item?.location?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                    item?.expectedPrice?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                    item?.landArea?.toString().toLowerCase().includes(searchText.toString().toLowerCase())
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
                    <td className="py-4 px-6 capitalize">{Data?.expectedPrice}</td>
                    <td className="py-4 px-6 capitalize">{Data?.landArea}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="">
          <nav aria-label="">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={requestData?.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </nav>
        </div>
      </div>
      </>

        )}
    </div>
  );
};

export default RequestedList;
