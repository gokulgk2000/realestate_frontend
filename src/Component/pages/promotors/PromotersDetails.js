import React, { useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import { map, max, min } from "lodash";
import image from "../../assets/images/avadar1.jpg"
import { getUserById, getuserProperty } from "../../helper/backend_helpers";
import { useQuery } from "../../helper/hook/useQuery";
import PropertyCard from "../PropertyCard";
import { Breadcrumbs } from "@material-tailwind/react";
import Pagination from "../../pagination/Pagination";
const PromotersDetails = () => {

  const query = useQuery();

const[property,setProperty]=useState()

  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [postsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [getUser, setGetUser] = useState(null);
  const [rerender, setRerender] = useState(true);
// console.log("user: " ,property)
  const requestSearch = (searched) => {
    setSearchText(searched);
  };
  const getUserId = async () => {
    const res = await getUserById({
      userID: query.get("id"),
    });
    if (res.success) {
      setGetUser(res.User);
      // console.log("res", res);
    }
  };

  useEffect(() => {
    if (rerender) {
      getUserId();
      setRerender(false);
    }
  }, [rerender]);
  useEffect(() => {
    const handleFetchUserProperty = async () => {
      setLoading(true);
      const res = await getuserProperty({
        userID: query.get("id"),
      });
      if (res.success) {
        setProperty(res?.property)
        setLoading(false);
      } else {
        console.log("Error in fetching IntrestedData: ", res);
      }
    };
    handleFetchUserProperty();
    // return () => {}
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
   <div className="md:pl-32 md:pr-24 py-5">
  
    <Breadcrumbs>
            <Link to="/">
              <button className="opacity-60 font">Home</button>
            </Link>
            <Link to="/promotors">
              <button className="opacity-60 font underline"> Promotors</button>
            </Link>
          </Breadcrumbs>
    
    <div className="bg-gray-200 py grid md:grid-cols-10">
      
      <div className="col-span-2">
        <div className="grid p-3 ">
      {getUser?.profilePic ? (
      <img className=" h-48 mx-auto rounded-md dark:bg-gray-500 aspect-[3/2] " 
      src={getUser?.profilePic} 
      alt=""/>):(
      <img className=" h-48 mx-auto rounded-md dark:bg-gray-500 aspect-[3/2] " 
      src={image} 
      alt=""/>
    )}
      </div>
      </div>
      <div  className="col-span-6 leadind-loose" >
        <div className="">Name:{getUser?.firstname} {getUser?.lastname}  </div>
        <div className="flex flex-wrap">Email:{getUser?.email} </div>
        <div className="">Contact :{getUser?.phoneno} </div>
        
      </div>
      <div className="col-span-2">Comments</div>
    {/* <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={userData.profile} alt="" />
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div> */}
    </div>
    {isLoading ? (
      <div className="flex justify-center py-5  "> Loading...</div>
      ) : (
    <div className="grid md:grid-cols-4 gap-x-8">
      
      {map(property?.slice((currentPage - 1) * 10, currentPage * 10), (pro, i) => (
      
          <PropertyCard pro={pro}  key={i}/>
  
        ))}
       </div>)}
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
    </div>

  )
}

export default PromotersDetails