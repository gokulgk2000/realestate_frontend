import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  findCategory,
  getPropertiescategoryId,
} from "../helper/backend_helpers";
import Property from "./Property";
import { Carousel } from "./Carousel";
import TopProperties from "./TopProperties";
import background from"../assets/images/eva.jpg"
const Landingpage = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState();
  const [category, setCategory] = useState();
  const [bedRoom, setBetRoom] = "";
  const [selectCategory, setSelectCategory] = useState([]);
  const [betRoomCount, setBetRoomCount] = useState();
  const [allcategory, setAllCategory] = useState([]);
  const [property, setProperty] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const categories = async () => {
    setLoading(true);
    const res = await getPropertiescategoryId({
      id: category,
      searchText,
      bedRoom,
    });

    if (res.success) {
      setProperty(res.category);
      setLoading(false);

      // console.log("first", res);
    } else {
    }
  };

  useEffect(() => {
    categories();
  }, [searchText]);

  useEffect(() => {
    const allcategory = async () => {
      const res = await findCategory();

      setAllCategory(res.category);

      // setAllCategory(res.category._id);

      return res;
    };

    allcategory();
  }, []);

  const navigateToProperty = (e) => {
    e.preventDefault();
    navigate(`/property`);
  };

  const handleCategoryChange = (event) => {
    console.log("view", event.target.value);
    setSelectCategory(event.target.value);
  };
  const handleBedsChange = (event) => {
    console.log("view", event.target.value);
    setBetRoomCount(event.target.value);
  };
  return (
    <div className=" md:pl-32 md:pr-24  ">
      {/* <div className="  items-center  md:hidden  ">
      <form className="flex justify-center  h-10 w-full ">
        <select
          id="category"
          name="category"
          label="category"
          className="px-2 border  grad-btn text-black capitalize w-28"
          onChange={handleCategoryChange}
        >
          <option value={""}> Category</option>
          {allcategory.map((option, id) => (
            <option value={option?._id} key={id}>
              {option?.name}
            </option>
          ))}{" "}
        </select>
        <select
          id="bedRoom"
          name="bedRoom"
          label="BHK"
          className="px-2 border w-20 text-black capitalize"
          onChange={handleBedsChange}
        ><option value="0" >BHK</option>
          <option value="1" >1BHK</option>
          <option value= "2">2BHK</option>
          <option value= "3">3BHK</option>
          <option value= "4">+4BHK</option>
        </select>
      
        <div className=" p ">
          <input
            type="text"
            id="message"
            value={searchText} 
            required
            name="search"
            placeholder="Search location"
            className=" px-3  pt- pb-1 w-32 border- py-2"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className=" pb-1 border-2 w-full bg-white grad-btn-x "  onClick={navigateToProperty}>
          {" "}
       {searchText?(<button
            className="pl-4 pb- pt-1  text-black  hover:text-white flex justify-center"
            onClick={navigateToProperty}
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

          </button>):(<button
            className="pl-4 pt-1  text-black  hover:text-white"
          
          ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        
          </button>)}   
        </div>
      </form>
      </div> */}

      <div className="font pt-1">
        <Carousel />
        {isLoading ? (
          <div className="text-center p-5  ">
            <button type="button" className=" text-amber-700 border border-amber-700 py-2 px-3 rounded-lg">
            
              Loading...
            </button>
          </div>
        ) : (
          <div className="shadow-2xl py-2 ">
            <TopProperties />
            <div className="flex justify-center py-2">
              <button
                className="text-amber-700 border border-amber-700 py-2 px-3 rounded-lg hover:bg-amber-700 hover:text-white"
                onClick={navigateToProperty}
              >
                View More
              </button>
            </div>
          </div>
        )}
        {/* <Category /> */}
      </div>
    </div>
  );
};
export default Landingpage;
