import { map } from 'lodash';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { getPremiumProperty, getProById } from '../helper/backend_helpers';
import { useModal } from '../helper/hook/useModal';
import BuyerModal from '../models/BuyerModal';
import PropertyCard from './PropertyCard';

const TopProperties = () => {
const[property,setProperty]=useState()
const [modalOpen, setModalOpen] = useModal();
const [propertyId, setPropertyId] = useState([]);


  const PremiumProperty = async () => {
    const res = await getPremiumProperty({});
   if(res){
    setProperty(res?.pro)
 
   }
  
  };


 
   
  useEffect(() => {
    PremiumProperty()
  }, []);const handleBook = async (proId) => {
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
  
  return (
    
    <div>     {modalOpen && (
      <BuyerModal
        show={modalOpen}
        onCloseClick={() => setModalOpen(false)}
        currentProperty={propertyId?._id}
      />
    )}
<div className=' grid md:grid-cols-4 gap-y-2 gap-x-2'>
{map(property, (pro, i) => (
          <PropertyCard pro={pro} setModalOpen={setModalOpen} handleBook={handleBook} key={i}/>
        ))}
<div>


</div>

</div>


    </div>
  )
}

export default TopProperties