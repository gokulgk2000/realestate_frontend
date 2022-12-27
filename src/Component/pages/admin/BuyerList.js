import React, { useEffect, useState } from "react";
import { allBuyerList, GETALLUSERSBYLIMIT } from "../../helper/backend_helpers";

import Pagination from "../../pagination/Pagination";
import { useQuery } from "../../helper/hook/useQuery";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const BuyerList = () => {
  const query = useQuery();

  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [buyerData, setBuyerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  const statusColor = {
    approved: "green",
    pending: "#e8bf09",
    rejected: "red",
  };

  const requestSearch = (searched) => {
    setSearchText(searched);
  };

  const getAllBuyers = async () => {
    setLoading(true);
    const res = await allBuyerList({});
    if (res.success) {
      setBuyerData(res.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllBuyers();
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
  console.log("posts", posts.length);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div> {isLoading ?(
      <div className="text-center p-5  "> 
     <button type="button" class="grad1 ">
<svg class="animate-spin h-5 w-5 mr-3 rounded-bl-full text-gray-700 bg-slate-200 " viewBox="0 0 24 24">
</svg>
Loading...
</button>
      </div>
      ):(
      <>
      <Breadcrumbs>
      <Link to="/admin/Dashboard">
          <button  className="opacity-60 font">
            Dashboard
          </button></Link>
          <Link to="/admin/buyerlist">
          <button  className="opacity-60 font">
            Buyers
          </button></Link>
      </Breadcrumbs>
      <div className=" md:overflow-x-auto  shadow-md sm:rounded-lg">
        <div className="w-full flex justify-center items-center mt-2 pb-4 ">
          <input
            type="text"
            placeholder="Search Buyers"
            name="search"
            className="md:w-96 px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0"
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
                <th scope="col" className="py-3 md:px-6 px-1   text-amber-700">
                  S.No
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700">
                  <div className="flex items-center">Name</div>
                </th>
                <th
                  scope="col"
                  className="py-3 px-6  hidden md:block text-amber-700"
                >
                  <div className="flex items-center">Email</div>
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700">
                  <div className="flex items-center">Status</div>
                </th>
                <th scope="col" className="py-3 px-6   text-amber-700">
                  <span className="">Buyer Details</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {buyerData
                ?.filter(
                  (item) =>
                    item?.name
                      .toString()
                      .toLowerCase()
                      .includes(searchText.toString().toLowerCase()) ||
                    item?.email
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
                      className="py-4 md:px-6 px-2  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {i + 1}
                    </th>
                    <td className="py-4 px-6 capitalize">
                      {Data?.name}
                    </td>
                    <td className="py-4 px-6 hidden md:block">
                      {Data?.email}</td>
                    <td
                      className="py-4 px-6 capitalize"
                      style={{ color: statusColor[Data?.status] }}
                    >
                      {Data?.status}
                    </td>
                    <td className="py-4 px-6 items-center">
                      <Link
                        to={`/admin/buyerdetails?id=${Data?._id}`}
                        className="font-medium   text-amber-700  dark:text-blue-500 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <nav aria-label="text-center">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={buyerData?.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </nav>
        </div>
      </div> </>
        )}
    </div>
  );
};

export default BuyerList;
