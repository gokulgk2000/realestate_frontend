import { Breadcrumbs } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allPropertiesList, updateTopProperty } from "../../helper/backend_helpers";
import Pagination from "../../pagination/Pagination";
const PropertyList = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading]=useState(false);
  const statusColor = {
    approved: "green",
    pending: "#e8bf09",
    rejected: "red",
  };

  const propertySearch = (searched) => {
    setSearchText(searched);
  };
  const getAllProperties = async () => {
    setLoading(true);
    const res = await allPropertiesList();
   

    if (res.success) {
      setAllProperties(res.properties);
    }
    setLoading(false);
  };
  useEffect(() => {

    getAllProperties();
  }, []);
  const updatePremiumProperties = async (checked,propertyID)=>{
    console.log("checked : ",checked);
    const res = await updateTopProperty({propertyID,isPremium:checked});
    if(res.success){
await getAllProperties()
    }
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
       {isLoading ?(
        <div className="text-center py-20  "> 
       <button type="button" className=" text-amber-700 border border-amber-700 py-2 px-3 rounded-lg" disabled>
 
  Loading...
</button>
        </div>
        ):(
        <>
      <Breadcrumbs>
      <Link to="/admin" >
            <button className="opacity-60 font">
              Dashboard
            </button></Link>
            <Link to="/admin/PropertyList" disabled>
            <button className="text-amber-700 font">
              Properties List
            </button></Link>
      </Breadcrumbs>
      <div className="md:overflow-x-auto  shadow-md sm:rounded-lg">
        <div className="w-full flex justify-center items-center mt-2 pb-4  ">
          <input
            type="text"
            placeholder="Search Properties"
            name="search"
            className="md:w-96 px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0"
            onChange={(e) => propertySearch(e.target.value)}
          />

          <button
            type="submit"
            className=" grad1 px-3 py-2 -ml-1.5 bg-amber-700 hover:bg-amber-900 text-white rounded-tr-full rounded-br-full"
          >
            Search
          </button>
        </div>
       
        <table className="md:w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {" "}
              <th scope="col" className="py-3 md:px-6 px-1  text-amber-700">
                S.No
              </th>
              <th scope="col">
                <p className="py-3 px-6 invisible md:visible  text-amber-700">
                  {" "}
                  Seller Name
                </p>{" "}
                <p className="pb-10 px-6 md:hidden  text-amber-700">seller</p>
              </th>
              <th
                scope="col"
                className="py-3 px-6  hidden md:block text-amber-700"
              >
                <div className="flex items-center">AskPrice</div>
              </th>
           
              <th scope="col" className="py-3 px-6   text-amber-700">
                <div className="flex items-center">status</div>
              </th>
              <th scope="col" className="py-3 px-6   text-amber-700 ">
                <span className="flex items-center">upgrade</span>
              </th>
              <th scope="col" className="py-3 px-6   text-amber-700 ">
                <span className="flex items-center">Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {allProperties
              ?.filter(
                (item =>
                  item?.Seller?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                  item?.location?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                  item?.askPrice?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                  item?.facing?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                  item?.category?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                  item?.landArea?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
                  item?.layoutName?.toString().toLowerCase().includes(searchText.toString().toLowerCase()))
              )
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((PropertyData, p) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={p}
                >
                  <th
                    scope="row"
                    className="py-4 md:px-6 px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {p + 1}
                  </th>{" "}
                  <th
                    scope="row"
                    className="py-4 px-3 font-medium  whitespace-nowrap dark:text-white capitalize"
                  >
                    {PropertyData?.Seller} ,<p>{PropertyData?.location}</p>
                  </th>
                  <td className="py-4 px-6 capitalize hidden md:block">
                    {PropertyData?.askPrice}
                  </td>
                 
                  <td
                    className="py-4 px-6 capitalize"
                    style={{ color: statusColor[PropertyData?.status] }}
                  >
                    {PropertyData?.status}
                  </td>
                  <td
                    className="py-4 px-6 capitalize"
                    style={{ color: statusColor[PropertyData?.status] }}
                  >
                    <ul className=" text-sm font-medium text-gray-900 rounded-lg  dark:text-white">
    <li className="w-full ">
        <div className="flex items-center pl-3">
  {PropertyData?.status === "approved" &&        <input
             type="checkbox" 
            //  name="facilities"
            checked={PropertyData?.isPremium}
             className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
              onChange={(e)=>updatePremiumProperties(e.target.checked,PropertyData?._id)}
          />}  
        
            <label for="vue-checkbox" className="py-3 ml-2 w-full text-sm font-medium dark:text-gray-300" >premium</label>
        </div>
    </li>
</ul>           
                  </td>
                  <td className="py-4 px-6">
                    <Link
                      to={`/admin/propertydetails?id=${PropertyData?._id}`}
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
            totalPosts={allProperties?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </nav>
      </div> </>
        )}
    </div>
  );
};

export default PropertyList;
