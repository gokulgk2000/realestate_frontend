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
  let location = useLocation();
  const id = query.get("category");
  const searchKey = query.get("search");
  const bed = query.get("beds");

  const [searchText, setSearchText] = useState(searchKey);
  const [property, setproperty] = useState("");
  const [bedRoom, setBedRoom] = useState(bed);
  const [currentPage, setCurrentPage] = useState(1);
  const [setPosts] = useState([]);
  const [error, setError] = useState("");
  const [propertyId, setPropertyId] = useState([]);
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));
  const [isLoading, setLoading] = useState(false);


  const [modalOpen, setModalOpen] = useModal();

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
      console.log(res?.User);
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

    if (res.success) {
      setproperty(res.category);
      console.log("show", res);
    } else {
      console.log("errors", res.msg);
      setError(res.msg);
    }
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
      console.log("fmsg", res);
    } else {
      console.log("Failed to fetch message", res);
    }
  };

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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {modalOpen && (
        <BuyerModal
          show={modalOpen}
          onCloseClick={() => setModalOpen(false)}
          currentProperty={propertyId?._id}
        />
      )}
      <Breadcrumbs>
            <Link to="/">
              <button className="opacity-60 font">Home</button>
            </Link>
            {/* <Link to="/promotors">
              <button className="opacity-60 font"> Promotors List</button>
            </Link> */}
          </Breadcrumbs>

      <div className="w-full flex justify-center items-center mt-2  scale-100  hover:scale-95 ease-in duration-500 grad1 ">
        {/* <input
          type="text"
          placeholder="Search Your Dream House"
          name="search"
          className="look px-3 py-2 bg-gray-100 rounded-tl-full rounded-bl-full border-0  focus:outline-0"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          type="submit"
          className="px-3 py-2 -ml-1.5 bg-blue-500 hover:bg-teal-700 text-white rounded-tr-full rounded-br-full"
        >
          Search
        </button> */}
      </div>
      <div className="md:grid  gap-  grid-cols-4  font uppercase md:pl-32 md:pr-24 gap-x-5 gap-y-5 pb-3">
        {
        map( property .slice((currentPage - 1) * 12, currentPage * 12),(pro, i) => (
          <PropertyCard pro={pro} setModalOpen={setModalOpen} handleBook={handleBook} key={i}/>
        ))}
        
      </div>
      <div className="text-center">
          <nav aria-label="text-center ">
            <Pagination
              postsPerPage={12}
              totalPosts={property?.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </nav>
        </div>
      {/* <input type="range" label={true} onChange={rangechange} /> */}
    </div>
  );
};
export default Property;
