import { map } from "lodash";
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
} from "../helper/backend_helpers";
import { useQuery } from "../helper/hook/useQuery";
import { useModal } from "../helper/hook/useModal";
import BuyerModal from "../models/BuyerModal";
import { SERVER_URL } from "../helper/configuration";
const Property = () => {
  const query = useQuery();
  let location = useLocation();
  const id = query.get("category");
  const searchKey = query.get("search");
  const bed = query.get("beds");
  const [searchText, setSearchText] = useState(searchKey);
  const [property, setproperty] = useState("");
  const [bedRoom, setBedRoom] = useState(bed);
  const [propertyId, setPropertyId] = useState([]);
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));
  const [user, setUser] = useState("");
  const [modalOpen, setModalOpen] = useModal();
  // console.log(id);
  const getuser = async () => {
    const payload = {
      userId: currentUser?.userID,
    };
    const res = await getuserdetails(payload);
    if (res.success) {
      setUser(res?.User);
    } else {
    }
  };
  useEffect(() => {
    getuser();
  }, []);
  const searchPropertyByCategory = async () => {
    const res = await getPropertiescategoryId({
      id,
      searchText,bedRoom
    });
    if (res.success) {
      setproperty(res.category);
      console.log("show", res);
    } else {
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
    } else {
    }
  };
  //   const loadPropertyCount = async () => {
  //     const res = await getPropertyCount({ searchText });
  //     if (res.success) {
  //       setpropertyCount(res.count);
  //     } else {
  //      // console.log("getPropertyCount  ", res);
  //     }
  //   };
  //   useEffect(() => {
  //     const handleLoad = async () => {
  //       setLoading(true);
  //       await loadProperty();
  //       setLoading(false);
  //     };
  //     handleLoad();
  //   }, [page, limit]);
  //   useEffect(() => {
  //     setPage(1);
  //   }, [searchText]);
  return (
    <div>
      {modalOpen && (
        <BuyerModal
          show={modalOpen}
          onCloseClick={() => setModalOpen(false)}
          currentProperty={propertyId?._id}
        />
      )}
      <div className="w-full flex justify-center items-center mt-2  scale-100  hover:scale-95 ease-in duration-500 grad1 ">
      </div>
      <div className="md:grid  gap-  grid-cols-2  md:px-5  font uppercase  ">
        {map(property, (pro, i) => (
          <div user={pro} key={"pro" + i}>
            <div className="bg-transparent border-2 hover:border-0 shadow-sm pl-2 -py-2 hover:bg-amber-50 shadow-gray-200 hover:shadow-md hover:shadow-gray-400 rounded-md scale-90 hover:scale-95 ease-in duration-300">
              <div className="grid grid-cols-3   my-3 ">
                <div className="flex  justify-start items-center">
                  <Link to={`/Detailspage?uid=${pro?._id}`}>
                    <img
                      className=" object-cover md:h-52 md:w-72 rounded-md aspect-[1] "
                      alt="coimbatore realestate"
                      src={`${SERVER_URL}/file/${pro?.propertyPic[0]?.id}`}
                    />
                  </Link>
                </div>
                <div className="col-span-2 pl-2 leading-10">
                <Link   to={`/Detailspage?uid=${pro?._id}`} className="flex justify-start text-xl text-amber-700  text-shadow drop-shadow-2xl pt-4 pl-1">
                   {pro?.Title}
                   </Link>
                  <Link
                    to={`/Detailspage?uid=${pro?._id}`}
                    className="sm:flex justify-between  md:text-xl  py-5 "
                  >
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-4 :h-4 text-red-500 pb-5 "
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>{" "}
                      <h3 className="  text-amber-700 text-lg  text-shadow drop-shadow-2xl" >
                        {pro?.location},
                        <div className="text-sm bt-2 text-amber-600  " >{pro?.streetName}</div>
                      </h3>{" "}
                    </div>
                    <h6 className="pr-4 text-amber-700 shadow-black text-shadow drop-shadow-2xl">₹.{pro?.askPrice}<span className=" md:hidden pl-14">{pro?.bedRoom}BHK</span></h6>
                  </Link>
                  <Link
                    to={`/Detailspage?uid=${pro?._id}`}
                    className="md:flex border-x-2 border-t-3 mr-3 justify-between shadow-sm  hidden  shadow-blue-200 px-2 bg-white hover:shadow-md  hover:shadow-blue-200 rounded-md"
                  >
                    <p>
                      <div className="underline  text-sm ">plot Area</div>
                      <div className="font-semibold">₹.{pro?.costSq}.sq.ft</div>
                    </p>
                    <p className="  ">
                      <div className="underline text-sm ">BHK</div>
                      <div className="font-semibold">{pro?.bedRoom}BHK</div>
                    </p>
                    <p>
                      <div className="underline text-sm">Facing</div>
                      <div className="font-semibold">{pro?.facing}</div>
                    </p>
                  </Link>
                  <p className="lg:grid grid-cols-7 flex  justify-between mr-3 mx-1 pt-3">
                    <Link
                      to={`/Detailspage?uid=${pro?._id}`}
                      className="col-span-6"
                    >
                      {" "}
                      <p className=" text-sm  md:py-2 ">Agent:{pro?.Seller}</p>
                    </Link>
                    <div className=" pr-5 md:pt-2 ">
                      <button
                        className="grad-btn hover:grad1 hover:text-white rounded-sm px-1"
                        onClick={() =>
                          handleBook(pro?._id) && setModalOpen(true)
                        }
                      >
                        Contact
                      </button>
                    </div>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Property;