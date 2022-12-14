import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import {
  findCategory,

  getPropertiescategoryId,

} from "../helper/backend_helpers";

const Search = () => {
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
    <div className=" pt-2  items-center hidden lg:block  rounded-full md:flex font">
      <form className="flex justify-center  h-14">
        <select
          id="category"
          name="category"
          label="category"
          className="px-4 border rounded-bl-full rounded-tl-full grad-btn text-black capitalize"
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
          className="px-4 border  text-black capitalize"
          onChange={handleBedsChange}
        ><option value="0" >BHK</option>
          <option value="1" >1BHK</option>
          <option value= "2">2BHK</option>
          <option value= "3">3BHK</option>
          <option value= "4">+4BHK</option>
        </select>

        {/* <select className="px-4 border  grad-btn text-white  " >
        <option>
          {" "}
          <button class="  py-1 px-4 bg-white text-gray-600 rounded absolute opcity-80   group-hover:block group-hover:  disabled:opacity-50 inline-flex items-center">
            {" "}
            BHK
           
          </button>{" "}
        </option>
        <option value="" className=" border-0 text-black hover:text-black ">
          1BHK
        </option>

        <option value="" className=" border-0 text-black hover:text-black">
          2BHK
        </option>

        <option value="" className=" border-0 text-black hover:text-black">
          3BHK
        </option>
        <option value="" className=" border-0 text-black hover:text-black">
          +4BHK
        </option></select> */}
        <div className=" p ">
          <input
            type="text"
            id="message"
            value={searchText} 
            required
            name="search"
            placeholder="Search location"
            className=" px-3  py-1 h-14"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {searchText?(<button className=" pb-1 border-2  bg-white grad-btn-x rounded-br-full rounded-tr-full"   onClick={navigateToProperty} >
          {" "}
         <button
            className="px-3  pt-1   text-white rounded-full hover:text-white"
            onClick={navigateToProperty}
          >
            Search Properties
          </button>
        </button> ):(<button className=" pb-1 border-2  bg-white grad-btn-x rounded-br-full rounded-tr-full"  >
          {" "}
         <button
            className="px-3 pt-1  text-black rounded-full hover:text-white"
           
          >
            Search Properties
          </button>
        </button> )      } 
      </form>
    </div>
  );
};

export default Search;
