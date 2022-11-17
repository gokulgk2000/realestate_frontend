import { map } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProperty, getPropertybyUserId, getPropertyCount } from "../helper/backend_helpers";


const Property = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [propertyCount, setpropertyCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const [property, setproperty] = useState([]);

  const loadProperty = async () => {
    const res = await getAllProperty({  limit, searchText });
    if (res.success) {
      setproperty(res.property);
      console.log("data",res)
    } else {
      console.log("Error while fetching property", res);
    }
  };

  // const loadPropertyCount = async () => {
  //   const res = await getPropertyCount({ searchText });
  //   if (res.success) {
  //     setpropertyCount(res.count);
  //   } else {
  //     console.log("Error while fetching propertyCount", res);
  //   }
  // };

  useEffect(() => {
    const handleLoad = async () => {
      setLoading(true);
      await loadProperty();
      setLoading(false);
    };
    handleLoad();
  }, [ limit]);


  useEffect(() => {
    console.log("searchText :", searchText);
    const handleLoad = async () => {
      setLoading(true);
      // await loadPropertyCount();
      await loadProperty();
      setLoading(false);
    };

    handleLoad();
  }, [searchText]);

  return (
    <div className="grid  auto-rows-fr md:grid-cols-2 xl:grid-cols-3 gap-4  px-5 py-5 row-span-3">
     {map(property, (pro, i) => (
      <div  user={pro} key={"pro" + i} >
          <div  className="bg-gray-50  rounded-2xl drop-shadow-lg ">
            <Link to={`/Detailspage?uid=${pro?._id}`}>
            <img
              className="w-full aspect-[1] object-cover rounded-2xl transform h-64  transition duration-500 hover:scale-95  "
              alt="coimbatore realestate"
              src={pro?. propertyPic[0] }
            />

            <div className=" font-semibold text-center py-5 aspect-[1]" >
              {" "}
              Details
              <div className="font-sans text-sm  text-left p-5 leading-loose">
                <h5>Seller :{pro?.Seller}</h5>
                <h5>location :{pro?.location}</h5>
                <h6>Askprice :{pro?.askPrice}</h6>
                <p>Description :{pro?.Description}</p>
              </div>
            </div>
            </Link>
          </div>
      </div>
      ))}
    </div>
  );
};

export default Property;