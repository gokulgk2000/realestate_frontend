import React from "react";
import { Carousel } from "./Carousel";
import Category from "./Category";
import Property from "./Property";
import Search from "./Search";

const Landingpage = () => {
 

  return (
    <div>
      
      <div className="font ">
       

      
        {/* <Carousel/> */}
          {/* <div
            className="md:w-screen "
            style={{ backgroundImage: `url(${Image})` }}
          ></div> */}
     
  

        <div className=" px-4">
          {/* <Category /> */}
        </div>

        <div className=" drop-shadow-xl py-10 ">
          <Property />
        </div>
        <Category />
      </div>
    </div>
  );
};
export default Landingpage;
