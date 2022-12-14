import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findCategory, getPropertiescategoryId } from "../helper/backend_helpers";
import Property from "./Property";
import {Carousel} from "./Carousel";


const Landingpage = () => {

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState();
  const [category, setCategory] = useState();
  const[bedRoom,setBetRoom]=('')
  const [selectCategory, setSelectCategory] = useState([]);
  const [betRoomCount, setBetRoomCount] = useState();
  const [allcategory, setAllCategory] = useState([]);
  const [property, setProperty] = useState([]);

  const categories = async () => {
    const res = await getPropertiescategoryId({
      id: category,
      searchText,
      bedRoom
    });

    if (res.success) {
      setProperty(res.category);

      console.log("first", res);
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
  }, [ ]);

  const navigateToProperty = (e) => {
    e.preventDefault(); 
    navigate(
      `/property?search=${searchText}&category=${selectCategory}&beds=${betRoomCount}`
    );
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
    <div>
      <div className="  items-center  md:hidden  ">
      <form className="flex justify-center  h-10 ">
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
          className="px-2 border w-24 text-black capitalize"
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
            className=" px-3  pt-2 pb-1 w-32 border-2"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className=" pb-1 border-2 w-20 bg-white grad-btn-x "  onClick={navigateToProperty}>
          {" "}
       {searchText?(<button
            className="pl- pb- pt-1  text-black  hover:text-white"
            onClick={navigateToProperty}
          >
            Search 
          </button>):(<button
            className="pl- pt-1  text-black  hover:text-white"
          
          >
            Search 
          </button>)}   
        </div>
      </form>
      </div>

      <div className="font ">
        <Carousel />

        <div className=" drop-shadow-xl pb-4">
          <Property />
        </div>
        {/* <Category /> */}
      </div>
    </div>
  );
};
export default Landingpage;
