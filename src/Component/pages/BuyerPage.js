import { Breadcrumbs } from '@material-tailwind/react';
import { map } from 'lodash';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getinterestbyId } from '../helper/backend_helpers';
import { useQuery } from '../helper/hook/useQuery';
import { useUser } from './contextProvider/UserProvider';
import PropertyCard from './PropertyCard';

const BuyerPage = () => {
  const query = useQuery();
  const { currentUser, setCurrentUser } = useUser();
  const [isLoading, setLoading] = useState(true);
  const [interest,setInterest] = useState([])
  const [Interest, setInterestSuccess] = useState();
  const [interesterror,setInterestError] = useState([]);
  const [searchText, setSearchText] = useState("");
console.log("interest",interest)
  const propertySearch = (searched) => {
    setSearchText(searched);
  };


    useEffect(() => {
  const handleFetchInterested = async() =>{
    const payload = {
      userID:currentUser?.userID,
    }
    const res = await getinterestbyId(payload);
    setLoading(true)
    if (res.success) {
      setInterest(res?.Intrested)
      setInterestSuccess(res.msg);
    }else{
      setInterestError(res.msg);

    }
 setLoading(false)
  } 
  handleFetchInterested()
},[])
if(interest?.length===0){
  return(
    <div className="py-10">
       <Breadcrumbs >
          <Link to="/">
            <button className="opacity-60 font">Home</button>
          </Link>
        </Breadcrumbs>
       
  <p className=" flex justify-center py-10 font-semibold">
    
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
</svg>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
</svg>

    No interested Properties Found...</p>
  </div>
  )
}
  return (
    <div> {isLoading ? (
      <div className="flex justify-center py-5  "> Loading...</div>
      ) : (
    <div className='md:pl-32 md:pr-24 '>
       
    <div >
    <Breadcrumbs className='px-0'>
          <Link to="/">
            <button className="opacity-60 font p-1">Home</button>
          </Link>
          <Link to="/buyer">
            <button className="text-amber-700 font p-1 underline">Intrested List</button>
          </Link>
        </Breadcrumbs>  
    <div className="w-full flex justify-center items-center mt-5 pb-4  ">
          <input
            type="text"
            placeholder="Search Properties..."
            name="search"
            className="md:w-96 px-3 py-2 bg-slate-200 rounded-tl-full rounded-bl-full border-0 focus:outline-0"
            onChange={(e) => propertySearch(e.target.value)}
          />

          <button
            type="submit"
            className=" nav-color px-3 py-2  -ml-1.5 hover:bg-amber-900  text-black hover:text-white rounded-tr-full rounded-br-full"
          >
            Search
          </button>
        </div>
      </div>
    <div className="grid md:grid-cols-4 gap-x-2">
      
        {interest
         ?.filter(
          (item) =>
            item?.propertyId?.location?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) ||
            item?.propertyId?.title?.toString().toLowerCase().includes(searchText.toString().toLowerCase()) 
              )
              // .slice((currentPage - 1) * 10, currentPage * 10)
        .map((pro, i) => (
      
      <PropertyCard pro={pro?.propertyId}  key={i}/>

    ))}
    
    </div>
    </div>
  )}
    </div>
  )
}

export default BuyerPage