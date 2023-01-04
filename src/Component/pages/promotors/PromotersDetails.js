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

  if(property?.length === 0){
    return(
      <div className="py-10">
         <Breadcrumbs>
            <Link to="/">
              <button className="opacity-60 font">Home</button>
            </Link>
            <Link to="/promotors">
              <button className="opacity-60 font underline"> Promotors</button>
            </Link>
          </Breadcrumbs>
         
    <p className=" flex justify-center py-10 font-semibold">
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
  </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
  </svg>
  
      No Properties Registered Yet...</p>
    </div>
    )
  }
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
    
    <div className="bg-gray-100  grid md:grid-cols-10">
      
      <div className="col-span-3">
        <div className="grid p-3 ">
      {getUser?.profilePic ? (
      <img className=" h-60 mx-auto rounded-md dark:bg-gray-500 aspect-[3/2] " 
      src={getUser?.profilePic} 
      alt=""/>):(
      <img className=" h-60 mx-auto rounded-md dark:bg-gray-500 aspect-[3/2] " 
      src={image} 
      alt=""/>
    )}
      </div>
      </div>
      <div  className="  col-span-4 leading-loose py-5 px-10" >
        <div className="text-gray-700 font-semibold  ">Name : {getUser?.firstname} {getUser?.lastname}  </div>
        <div className="text-gray-700 font-semibold">Email : {getUser?.email} </div>
        <div className="text-gray-700 font-semibold">Contact : {getUser?.phoneno} </div>
        <div className="fe  font-semibold text-amber-500">
          <h2 className="pt-5">Review </h2>
<button className="flex">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" hover:text-black w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="hover:text-black  w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="hover:text-black  w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="hover:text-black  w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" hover:text-black w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
</button>
        
        </div>
        
      </div>
      <div className="col-span-3 snap-proximity snap-x ">
        <h2 className="text-amber-500 font-semibold pt-5 px-2 ">Comments :</h2>
        <p className="text-xs text-gray-600 py-2 px-3 ">
          *Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          * Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br />
          * It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </div>
    {/* <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={userData.profile} alt="" />
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div> */}
    </div>
    {isLoading ? (
      <div className="flex justify-center py-5  "> Loading...</div>
      ) : (
    <div className="grid md:grid-cols-4 gap-x-6">
      
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