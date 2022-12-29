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
    <div className="grid md:grid-cols-4 gap-x-8">
        {interest?.length>0 && map(interest, (pro, i) => (
      
      <PropertyCard pro={pro?.propertyId}  key={i}/>

    ))}
    </div>
  )
}

export default BuyerPage