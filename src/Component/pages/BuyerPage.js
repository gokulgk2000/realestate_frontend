import { map } from 'lodash';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { getinterestbyId } from '../helper/backend_helpers';
import { useQuery } from '../helper/hook/useQuery';
import { useUser } from './contextProvider/UserProvider';
import PropertyCard from './PropertyCard';

const BuyerPage = () => {
  const query = useQuery();
  const { currentUser, setCurrentUser } = useUser();
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
    if (res.success) {
      setInterest(res?.Intrested)
      setInterestSuccess(res.msg);
    }else{
      setInterestError(res.msg);

    }
  console.log(res)
  } 
  handleFetchInterested()
},[])
  return (
    <div>
    <div >
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
      </div>
    <div className="grid md:grid-cols-4 gap-x-8">
      
        {interest
         ?.filter(
          (item) =>
            item?.propertyId?.location.includes(searchText.toString().toLowerCase()) ||
            item?.propertyId?.title.includes(searchText.toString().toLowerCase()) 
              )
              // .slice((currentPage - 1) * 10, currentPage * 10)
        .map((pro, i) => (
      
      <PropertyCard pro={pro?.propertyId}  key={i}/>

    ))}
    </div>
    </div>
  )
}

export default BuyerPage