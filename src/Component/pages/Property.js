import { map } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const Property = () => {
  const query = useQuery();
  const id = query.get("id");
  const searchKey = query.get("search");

  const [searchText, setSearchText] = useState(searchKey);
  const [property, setproperty] = useState("");

  const [propertyId, setPropertyId] = useState([]);
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));
  const [user, setUser] = useState("");

  const [modalOpen, setModalOpen] = useModal(false);

  // console.log(id);

  const getuser = async () => {
    const payload = {
      userId: currentUser?.userID,
    };
    const res = await getuserdetails(payload);
    if (res.success) {
      setUser(res?.User);
    } else {
      console.log("errors", res);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  const categories = async () => {
    const res = await getPropertiescategoryId({
      id,
      searchText,
    });

    if (res.success) {
      setproperty(res.category);

      console.log("first",res)

    } else {
    }
  };
 

  useEffect(() => {
    categories();
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

      <div className="w-full flex justify-center items-center mt-2  scale-100  hover:scale-95 ease-in duration-500 grad1">
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
      <div className="md:grid  gap-2  grid-cols-2  md:px-5 gap-x-7 font uppercase ">
        {map(property, (pro, i) => (
          <div user={pro} key={"pro" + i}>
            <div className=" grad-card pl- shadow-sm shadow-gray-200 hover:shadow-md hover:shadow-gray-400 rounded-md">
          
              <div
            
               
                className="grid grid-cols-3   my-3 "  >
                <div className="flex  justify-start items-center"><Link     to={`/Detailspage?uid=${pro?._id}`}>
                  <img
                    className=" md:object-cover md:h-52  md:w-72 rounded-md"
                    alt="coimbatore realestate"
                    src={pro?.propertyPic[0]}
                  /></Link>
                </div>
                <div className="col-span-2 pl-2 leading-10">
                  <Link     to={`/Detailspage?uid=${pro?._id}`} className="sm:flex justify-between  text-xl  py-5 pr-">
                    
              <div className="flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg> <h3 className="flex-wrap text-black">
{pro?.location}</h3></div>     
                       <h6 className="pr-4">₹.{pro?.askPrice}</h6>
                    </Link>
                  <Link     to={`/Detailspage?uid=${pro?._id}`} className="flex  mr-3 justify-between shadow-sm shadow-blue-100 px-2 bg-white hover:shadow-md  hover:shadow-blue-200 rounded-md">
                    <p>
                      <div className="underline  text-sm">plot Area</div>
                      <div className="font-semibold">{pro?.costSq}.sq.ft</div>
                    </p>
                    <p>
                      <div className="underline text-sm">Possession</div>
                      <div className="font-semibold">{pro?.status}</div>
                    </p>
                    <p className="hidden sm:block">
                      <div className="underline text-sm ">Direction Facing</div>
                      <div className="font-semibold">{pro?.facing}</div>
                    </p>
                  </Link>
              
              <div className="flex justify-between items-center   pt-5 mr-3 mx-1">
                <p className=" text-sm  ">Agent:{pro?.Seller}</p>
                <div className="grid  px-1">
                  <div className="flex  justify-end">
                    <p>
                      <button
                        className="grad-btn hover:grad1 hover:text-white rounded-sm px-1"
                        onClick={() =>
                          handleBook(pro?._id) && setModalOpen(true)
                        }
                      >
                        Contact
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              {/*  <h5>Seller :{pro?.Seller}</h5>
 <p>Description :{pro?.Description}</p> */}
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
