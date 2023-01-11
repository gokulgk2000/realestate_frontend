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

const TopProperties = ({found}) => {
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
      <div className='flex justify-center text-2xl py-8 uppercase'>
      <svg
                 
                 className="h-6 w-6 pt-"
                 viewBox="0 0 512 512"
               >
                 <polygon
                   fill="#ffd759"
                   points="102.6 494.1 137 320.1 6 200.5 182.1 179.5 255.3 17.9 329.7 178.9 506 198.6 375.9 319.2 411.6 492.9 256.8 406.4"
                 />
                 <polygon
                   fill="#fabd3b"
                   points="256 256 6 200.5 137 320.1"
                 />
                 <polygon
                   fill="#fabd3b"
                   points="256 256 102.6 494.1 256.8 406.4 411.6 492.9"
                 />
                 <polygon
                   fill="#fabd3b"
                   points="256 256 506 198.6 375.9 319.2"
                 />
                 <polygon
                   fill="#fabd3b"
                   points="255.3 17.9 256 256 329.7 178.9"  
                 />
               </svg>
               
                    <h1 className='pl-2 -mt-0.5 ml-3 text-black font-extrabold mr-5  '>Top Properties</h1>
                    <svg
                 
                 className="h-6 w-6 pt-"
                 viewBox="0 0 512 512"
               >
                 <polygon
                   fill="#ffd759"
                   points="102.6 494.1 137 320.1 6 200.5 182.1 179.5 255.3 17.9 329.7 178.9 506 198.6 375.9 319.2 411.6 492.9 256.8 406.4"
                 />
                 <polygon
                   fill="#fabd3b"
                   points="256 256 6 200.5 137 320.1"
                 />
                 <polygon
                   fill="#fabd3b"
                   points="256 256 102.6 494.1 256.8 406.4 411.6 492.9"
                 />
                 <polygon
                   fill="#fabd3b"
                   points="256 256 506 198.6 375.9 319.2"
                 />
                 <polygon
                   fill="#fabd3b"
                   points="255.3 17.9 256 256 329.7 178.9"  
                 />
               </svg>
</div>
<Carousel
  
  responsive={responsive}
 >  
    

{map(property, (pro, i) => (
          <PropertyCard pro={pro} setModalOpen={setModalOpen} showHeart={found(pro?._id)} handleBook={handleBook} key={i}/>
        ))}



</Carousel>

    </div>
  )
}

export default TopProperties