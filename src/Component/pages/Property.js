import { map, max, min } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  categoryId,
  getAllProperty,
  getPropertiescategoryId,
  getProById,
  getPropertybyUserId,
  getPropertyCount,
  getuserdetails,
  GETALLUSERSBYLIMIT,
} from "../helper/backend_helpers";
import { useQuery } from "../helper/hook/useQuery";
import { useModal } from "../helper/hook/useModal";
import BuyerModal from "../models/BuyerModal";
import { SERVER_URL } from "../helper/configuration";
import PropertyCard from "./PropertyCard";
import { Breadcrumbs } from "@material-tailwind/react";
import Pagination from "../pagination/Pagination";

const Property = () => {
  const query = useQuery();
  const id = query.get("category");
  const searchKey = query.get("search") || " ";
  const bed = query.get("beds");

  const [searchText, setSearchText] = useState(searchKey);
  const [property, setproperty] = useState([]);
  const [bedRoom, setBedRoom] = useState(bed);
  const [currentPage, setCurrentPage] = useState(1);
  const [setPosts] = useState([]);
  const [error, setError] = useState("");
  const [propertyId, setPropertyId] = useState([]);
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));
  const [isLoading, setLoading] = useState(false);


  const [modalOpen, setModalOpen] = useModal();
console.log("property",property)

const requestSearch = (searched) => {
  setSearchText(searched);

};
  // console.log(id);
  // const rangechange = () => {
  //   const product = [...property];
  //   const result = product.sort((a, b) => b.askPrice - a.askPrice);
  //   setproperty(result);
  // };

  const getuser = async () => {
    const payload = {
      userID: currentUser?.userID,
    };
    const res = await getuserdetails(payload);
    if (res.success) {
      // console.log(res?.User);
    } else {
      console.log("errors", res);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  const searchPropertyByCategory = async () => {
    const res = await getPropertiescategoryId({
      id,
      searchText,
      bedRoom,
    });
      setLoading(true)

    if (res.success) {
      setproperty(res.category);
     
      // console.log("show", res);
    } else {
      console.log("errors", res.msg);
      setError(res.msg);
    }
    setLoading(false);

  };

  useEffect(() => {
    searchPropertyByCategory();
  }, [searchText]);

  const handleBook = async (proId) => {
    const payload = {
      propertyId: proId,
    };
    const res = await getProById(payload);
    if (res.success) {
      setPropertyId(res.Property);
      // console.log("fmsg", res);
    } else {
      console.log("Failed to fetch message", res);
    }
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  if(property?.length===0){
    return(
      <div className="py-10">
         <Breadcrumbs className="">
            <Link to="/">
              <button className="opacity-60 font">Home</button>
            </Link>
          </Breadcrumbs>
          <div className="w-full flex justify-center items-center mt-2 pb-4 ">
          <input
            type="text"
            placeholder="Search Property"
            name="search"
            className="md:w-96 px-3 py-2 bg-slate-200 font-light rounded-tl-full rounded-bl-full border-0 focus:outline-0"
            onChange={(e) => requestSearch(e.target.value)}
          />
          <button
            type="submit"
            className="nav-color  px-3 py-2 -ml-1.5 bg-amber-700 hover:bg-amber-900 text-white rounded-tr-full rounded-br-full"
          >
            Search
          </button>
        </div>
    <p className=" flex justify-center py-10 font-semibold">
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
</svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
</svg>

      No Results Found...</p>
    </div>
    )
  }
  return (
    <div> 
      {isLoading ? (
      <div className="flex justify-center py-5  "> Loading...</div>
      ) : (
        <div>
      {modalOpen && (
        <BuyerModal
          show={modalOpen}
          onCloseClick={() => setModalOpen(false)}
          currentProperty={propertyId?._id}
        />
      )}
      <Breadcrumbs className="flex justify-start md:pl-32   ">
            <Link to="/">
              <button className="opacity-60 font">Home</button>
            </Link>
          </Breadcrumbs>

      <div className="w-full flex justify-center items-center mt-2  ">
      <div className="w-full flex justify-center items-center mt-2 pb-4 ">
          <input
            type="text"
            placeholder="Search Property"
            name="search"
            className="md:w-96 px-3 py-2 bg-slate-200 font-light rounded-tl-full rounded-bl-full border-0 focus:outline-0"
            onChange={(e) => requestSearch(e.target.value)}
          />
          <button
            type="submit"
            className="nav-color  px-3 py-2 -ml-1.5 bg-amber-700 hover:bg-amber-900 text-white rounded-tr-full rounded-br-full"
          >
            Search
          </button>
        </div>
      </div>
     <div className="md:grid  gap-  grid-cols-4  font uppercase md:pl-32 md:pr-24 gap-x-5 gap-y-5 pb-3">
            {property
              .filter(item => item?.title?.toString().toLowerCase().includes(searchText?.toString().toLowerCase()) ||
              item?.location?.toString().toLowerCase().includes(searchText?.toString().toLowerCase()) )
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((pro, i) => (
          <PropertyCard pro={pro} setModalOpen={setModalOpen} handleBook={handleBook} key={i}/>
          ))}
        
      </div>
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
        </div>)}
      {/* <input type="range" label={true} onChange={rangechange} /> */}
    </div>
  );
};

export default Property;
