import { map } from 'lodash';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { getPremiumProperty, getProById } from '../helper/backend_helpers';
import { useModal } from '../helper/hook/useModal';
import BuyerModal from '../models/BuyerModal';
import PropertyCard from './PropertyCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
  };const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  
  return (
    
     <div>    

<Carousel
  
  responsive={responsive}
 >
    

{map(property, (pro, i) => (
          <PropertyCard pro={pro} setModalOpen={setModalOpen} handleBook={handleBook} key={i}/>
        ))}



</Carousel>

    </div>
  )
}

export default TopProperties