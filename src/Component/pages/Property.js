import { map } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProperty, getPropertybyUserId, getPropertyCount } from "../helper/backend_helpers";
const Property = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [propertyCount, setpropertyCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1)
  const [property, setproperty] = useState([]);
  const currentUser = JSON.parse(localStorage?.getItem("authUser"))
  console.log("Current : ",currentUser.userID)
  const loadProperty = async () => {
    const res = await getAllProperty({  searchText });
    if (res.success) {
      setproperty(res.property);
    } else {
    }
    console.log(res.property)
  };
  const loadPropertyCount = async () => {
    const res = await getPropertyCount({ searchText });
    if (res.success) {
      setpropertyCount(res.count);
    } else {
      console.log("getPropertyCount  ", res );
    }
  };
  useEffect(() => {
    const handleLoad = async () => {
      setLoading(true);
      await loadProperty();
      setLoading(false);
    };
    handleLoad();
  }, [ page,limit]);
  useEffect(() => {
    setPage(1)
  }, [searchText])
  useEffect(() => {
    const handleLoad = async () => {
      setLoading(true);
      await loadPropertyCount();
      await loadProperty();
      setLoading(false);
    };
    handleLoad();
  }, [searchText]);
  console.log("searchText :", searchText);
  return (
    <div>
    <div className="w-full flex justify-center items-center mt-2 pb-3">
    <form action="">
        <input type="text" placeholder="search" name="search"
            className="md:w-96 px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0" onChange={e => setSearchText(e.target.value)}
            />
        <button type="submit" className="px-3 py-2 -ml-1.5 bg-blue-500 hover:bg-teal-700 text-white rounded-tr-full rounded-br-full">Search</button>
    </form>
</div><div className="
">
{map(property, (pro, i) => (
  <div  user={pro} key={"pro" + i} className='grid md:grid-cols-3'>
      <div  className="col-span-2">
        <Link to={`/Detailspage?uid=${pro?._id}`} className="grid grid-cols-3 gap-3 bg-slate-200  capitalize my-5 md:mx-8">
       <div className="flex  justify-start "> <img className=" md:h-52 md:w-72"
          alt="coimbatore realestate"
          src={pro?. propertyPic[0] }
        /></div>
        <div className="col-span-2 leading-10" > 
         <div className="flex justify-between text-2xl font-semibold py-5 pr-3">
        <h3 >{pro?.location}</h3>           
            <h6>₹.{pro?.askPrice}</h6></div>
            <div className="flex  justify-between">
            <h6>{pro?.costSq}</h6>
          {/*  <h5>Seller :{pro?.Seller}</h5>
 <p>Description :{pro?.Description}</p> */}
</div>
         </div>     
        </Link>
       
      </div>
  </div>
  ))}</div>

    </div>
  );
};
export default Property;
