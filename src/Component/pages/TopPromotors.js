import { map } from "lodash";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getPremiumPromotors, getPremiumProperty, getProById } from "../helper/backend_helpers";
import { useModal } from "../helper/hook/useModal";
import BuyerModal from "../models/BuyerModal";
import PropertyCard from "./PropertyCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Promotors from "./promotors/Promotors";
import PromotorsCard from "./PromotorsCard";

const TopPromotors = ({ found }) => {
  const [promotors, setPromotors] = useState();
  const [modalOpen, setModalOpen] = useModal();
  const [propertyId, setPropertyId] = useState([]);

  const PremiumPromotors = async () => {
    const res = await getPremiumPromotors({});
    if (res) {
        setPromotors(res?.pro);
    }
  };

  useEffect(() => {
    PremiumPromotors();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <div className="flex justify-center text-2xl  uppercase">
        <svg className="h-6 w-6 pt-" viewBox="0 0 512 512">
          <polygon
            fill="#ffd759"
            points="102.6 494.1 137 320.1 6 200.5 182.1 179.5 255.3 17.9 329.7 178.9 506 198.6 375.9 319.2 411.6 492.9 256.8 406.4"
          />
          <polygon fill="#fabd3b" points="256 256 6 200.5 137 320.1" />
          <polygon
            fill="#fabd3b"
            points="256 256 102.6 494.1 256.8 406.4 411.6 492.9"
          />
          <polygon fill="#fabd3b" points="256 256 506 198.6 375.9 319.2" />
          <polygon fill="#fabd3b" points="255.3 17.9 256 256 329.7 178.9" />
        </svg>

        <h1 className="pl-2 -mt-0.5 ml-3 text-black font-extrabold mr-5  ">
          Top Promotors
        </h1>
        <svg className="h-6 w-6 pt-" viewBox="0 0 512 512">
          <polygon
            fill="#ffd759"
            points="102.6 494.1 137 320.1 6 200.5 182.1 179.5 255.3 17.9 329.7 178.9 506 198.6 375.9 319.2 411.6 492.9 256.8 406.4"
          />
          <polygon fill="#fabd3b" points="256 256 6 200.5 137 320.1" />
          <polygon
            fill="#fabd3b"
            points="256 256 102.6 494.1 256.8 406.4 411.6 492.9"
          />
          <polygon fill="#fabd3b" points="256 256 506 198.6 375.9 319.2" />
          <polygon fill="#fabd3b" points="255.3 17.9 256 256 329.7 178.9" />
        </svg>
      </div>
      <Carousel responsive={responsive}>
        {map(promotors?.sort((a,b)=>{
          if(!a?.order && !b?.order){
            return -1;
          }
          else if(!a?.order){
            return 1;
          }
          else if(!b?.order){
            return -1;
          }
          return a?.order -b?.order
        }), (pro, i) => (
          <PromotorsCard
            pro={pro}
            setModalOpen={setModalOpen}
            
           
            key={i}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default TopPromotors;
