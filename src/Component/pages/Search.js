import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  findCategory,
  getPropertiescategoryId,
} from "../helper/backend_helpers";
import ok from "../assets/images/wc.webp";
const Search = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState();
  const [category, setCategory] = useState();
  const [bedRoom, setBetRoom] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [betRoomCount, setBetRoomCount] = useState("0");
  const [allcategory, setAllCategory] = useState([]);
  const [showBedRoom, setShowBedRoom] = useState(true);
 
  const [property, setProperty] = useState([]);

  const categories = async () => {
    const res = await getPropertiescategoryId({
      id: category,
      searchText,
      bedRoom,
    });

    if (res.success) {
      setProperty(res.category);

      console.log("view", res);
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
  useEffect(() => {
    if (
      selectCategory === "637d5513f4dc56d8268ea2a4" ||
      selectCategory === "637d5520f4dc56d8268ea2a6" ||
      selectCategory === "637d48e6a66bc6fa095f9baa"
    ) {
      setShowBedRoom(true);
    } else {
      setBetRoomCount("0");
      setShowBedRoom(false);
    }
  }, [selectCategory]);

  return (
    // style={{ backgroundImage: `url(${ok})` }}
   
      <div className="  ">
        <div className="">
          ​
        
          <div className="items-center  lg:block md:pt-4  md:flex font md:pl-0 pl-8 md:rounded-full">
            <form className="md:flex justify-center grid grid-flow-row gap-y-1 py-2 opacity-100   rounded-full ">
             
              <div className="flex rounded-2xl shadow-lg">
                {" "}
                <svg
                  className="h-12 w-12 pt-3  bg-white rounded-bl-2xl rounded-tl-2xl"
                  viewBox="0 0 122.88 115.52"
                >
                  <path d="M119.2,111.86V3.66H57.86V41l-3.65-2.9V2.68A2.89,2.89,0,0,1,55.05.87h0A2.92,2.92,0,0,1,57.13,0h62.8A2.92,2.92,0,0,1,122,.86l.13.14a2.9,2.9,0,0,1,.74,1.94V31.15h0v80.71H104V87.1a1.67,1.67,0,0,0-1.67-1.67H90.44v30.09h32.44v-3.66ZM7.74,115.51V79.74a6.18,6.18,0,0,1-4.27.2A5.08,5.08,0,0,1,1.12,78.3,5.2,5.2,0,0,1,0,75.64a6.72,6.72,0,0,1,1.61-5h0a1.67,1.67,0,0,1,.23-.23l38.38-30a1.38,1.38,0,0,1,1.81-.07l38.47,29.9h0l.17.15a6.34,6.34,0,0,1,1.79,5.84,5.39,5.39,0,0,1-3.4,3.82,5.9,5.9,0,0,1-4.57-.3v35.59H70.77V78.18c0-.68-26.39-21.54-29.3-23.81-3.09,2.35-30,23-30,23.91v37.24ZM41.33,79.2A14.75,14.75,0,0,1,56,93.89v15.65H26.64V93.89A14.73,14.73,0,0,1,41.33,79.2Zm1.27,2.62V93.93H53.46v0A12.17,12.17,0,0,0,42.6,81.82Zm0,14.66V107H53.46V96.48ZM40.05,107V96.48H29.2V107Zm0-13.06V81.82A12.18,12.18,0,0,0,29.2,93.89v0ZM23.94,112.32H58.71v2.55H23.94v-2.55ZM66.68,12.87h9.85a.29.29,0,0,1,.28.28v11.4a.28.28,0,0,1-.28.27H66.68a.27.27,0,0,1-.28-.27V13.15a.28.28,0,0,1,.28-.28Zm33.86,0h9.85a.29.29,0,0,1,.28.28v11.4a.28.28,0,0,1-.28.27h-9.85a.28.28,0,0,1-.28-.27V13.15a.29.29,0,0,1,.28-.28Zm-16.93,0h9.85a.29.29,0,0,1,.28.28v11.4a.28.28,0,0,1-.28.27H83.61a.27.27,0,0,1-.28-.27V13.15a.28.28,0,0,1,.28-.28ZM66.68,35.76h9.85a.28.28,0,0,1,.28.27v11.4a.29.29,0,0,1-.28.28H66.68a.28.28,0,0,1-.28-.28V36a.27.27,0,0,1,.28-.27Zm33.86,0h9.85a.28.28,0,0,1,.28.27v11.4a.29.29,0,0,1-.28.28h-9.85a.29.29,0,0,1-.28-.28V36a.28.28,0,0,1,.28-.27Zm-16.93,0h9.85a.28.28,0,0,1,.28.27v11.4a.29.29,0,0,1-.28.28H83.61a.28.28,0,0,1-.28-.28V36a.27.27,0,0,1,.28-.27Zm16.93,22.88h9.85a.29.29,0,0,1,.28.28V70.31a.29.29,0,0,1-.28.28h-9.85a.29.29,0,0,1-.28-.28V58.92a.29.29,0,0,1,.28-.28Zm-16.93,0h9.85a.29.29,0,0,1,.28.28V70.31a.29.29,0,0,1-.28.28h-3V66.82l-7.11-5.64V58.92a.28.28,0,0,1,.28-.28Z" />
                </svg>
                <select
                  id="category"
                  name="category"
                  label="category"
                  className="px-4 border-l-0   text-black capitalize  md:-ml-1 w-48"
                  onChange={handleCategoryChange}
                >
                  <option value={""}>Property Type</option>
                  {allcategory.map((option, id) => (
                    <option value={option?._id} key={id} className="">
                      <div> {option?.name}</div>
                    </option>
                  ))}{" "}
                </select>
              </div>

              {showBedRoom && (
                <div className="flex rounded-lg md:rounded-none shadow-lg">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 pt-3  bg-white"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    viewBox="0 0 512 457.03"
                  >
                    <path
                      fill-rule="nonzero"
                      d="M69.24 0h373.51c11.67 0 22.29 4.78 29.96 12.45 7.68 7.68 12.46 18.31 12.46 29.97v194.86c3.52 2.4 6.78 5.07 9.73 8.01l.66.73c10.16 10.47 16.44 24.05 16.44 40.25v159.51c0 6.21-5.04 11.25-11.25 11.25h-19.74c-5.29 0-9.73-3.66-10.93-8.59-7.11-20.29-14.12-31.98-23.44-38.19-9.51-6.32-22.84-7.9-42.23-7.88l-313.54.46c-13.73-.31-22.56 3.56-28.85 10.57-7.19 8.01-12.17 20.58-17.26 35.9-1.54 4.7-5.93 7.68-10.62 7.68l-22.89.05C5.04 457.03 0 451.99 0 445.78V280.95c0-15.17 5.99-27.77 15.6-37.39l.74-.67c3.16-3.06 6.7-5.79 10.53-8.18L26.82 42c0-11.65 4.79-22.15 12.49-29.75A42.525 42.525 0 0 1 69.24 0zm-46.1 328.3-.65-.02v106.26h3.66c5.16-14.51 10.82-26.75 19.17-36.07 10.7-11.93 24.85-18.5 45.98-18.03l313.11-.47c23.76-.02 40.67 2.3 54.61 11.58 12.54 8.35 21.61 21.62 29.81 42.99h.68V328.28l-.66.02H23.14zm-.65-22.47.65-.02h465.71l.66.02v-19.56c0-9.86-3.81-18.14-9.96-24.55l-.56-.52c-4.92-4.92-11.22-8.79-18.31-11.49-12.78-2.73-25.26-5.22-37.48-7.48-13.79-2.15-27.16-4.07-40.18-5.76a11.163 11.163 0 0 1-4.83-.21l-5.04-1.04c-43.12-5.28-82.66-7.96-121.81-7.99-24.01-.02-47.96.96-72.6 2.94-43.39 4.33-88.49 12.09-138.25 23.13-.47.1-.95.18-1.41.22-2.58 1.59-4.96 3.39-7.05 5.39l-.52.56c-5.56 5.55-9.02 12.8-9.02 21.48v24.88zm32.6-81.73c22.5-4.01 43.9-7.38 64.59-10.14l-.03-45.02c0-15.1 6.18-28.85 16.12-38.78l.74-.67c9.89-9.55 23.31-15.44 38.04-15.44h162.9c15.11 0 28.84 6.18 38.77 16.12 9.94 9.94 16.13 23.68 16.13 38.77v45.36c10.97 1.68 22.12 3.55 33.48 5.63 8.4 1.31 16.94 2.7 25.66 4.17 3.81.65 7.55 1.52 11.19 2.61V42.42c0-5.45-2.26-10.44-5.87-14.06-3.61-3.61-8.6-5.87-14.06-5.87H69.24c-5.57 0-10.61 2.19-14.21 5.75-3.53 3.48-5.71 8.34-5.71 13.76v183.34c1.9-.47 3.83-.89 5.77-1.24zm206.77-20.65c29.94.14 59.19 1.78 85.13 4.96 7.55.79 15.18 1.7 22.86 2.7v-42.17c0-8.88-3.66-16.99-9.54-22.87-5.87-5.87-13.97-9.53-22.86-9.53h-162.9c-8.65 0-16.54 3.43-22.37 8.98l-.51.55c-5.87 5.87-9.52 13.98-9.52 22.87v42.15c36.75-5.25 78.88-7.84 119.71-7.64z"
                    />
                  </svg>
                  <select
                    id="bedRoom"
                    name="bedRoom"
                    label="BHK"
                    className="  px-4 border-l-0 border-r-0  text-black capitalize w-48 md:-ml-1"
                    onChange={handleBedsChange}
                  >
                    <option value="0">BHK</option>
                    <option value="1">1BHK</option>
                    <option className="  " value="2">
                      2BHK
                    </option>
                    <option className="  " value="3">
                      3BHK
                    </option>
                    <option className="  " value="4">
                      +4BHK
                    </option>
                  </select>
                </div>
              )}

            
              <div className="flex shadow-lg">
                {" "}
                <svg
                  className="h-12 w-12 pt-3  bg-white"
                  viewBox="0 0 118.43 122.88"
                >
                  <path
                    class="cls-1"
                    d="M11.1,56.77A9,9,0,0,1,5,57.06,7.3,7.3,0,0,1,.05,50.89a9.59,9.59,0,0,1,2.31-7.1h0a2.06,2.06,0,0,1,.33-.33L57.68.53a2,2,0,0,1,2.6-.1L115.4,43.27h0a1.31,1.31,0,0,1,.24.23,9.06,9.06,0,0,1,2.58,8.36,7.78,7.78,0,0,1-1.76,3.35,7.65,7.65,0,0,1-3.12,2.12,8.44,8.44,0,0,1-6.54-.43q0,22.79,0,45.56H85.64c.07-.34.13-.69.19-1a28.14,28.14,0,0,0,.32-2.91H101.4v-44c0-1-37.81-30.86-42-34.11-4.43,3.37-42.93,33-42.93,34.27V98.51h14.4a28.54,28.54,0,0,0,.33,2.88l.06.39c0,.23.08.45.13.68H11.09q0-22.83,0-45.69Zm49.48-16V53.62H72.13v0A13,13,0,0,0,60.58,40.75Zm0,15.59v9.23H72.13V56.34Zm-2.72,9.22V56.34H46.31v9.23H57.86Zm0-11.94V40.75A13,13,0,0,0,46.31,53.59v0ZM59.22,38A15.64,15.64,0,0,1,74.84,53.58v14.7H43.59V53.58A15.65,15.65,0,0,1,59.22,38Zm-.31,38.9A20,20,0,0,1,78.56,97.3a20.38,20.38,0,0,1-.94,5.71,20.06,20.06,0,0,1-2.13,4.57l7.6,8.61a1,1,0,0,1-.08,1.36l-5.81,5.09a1,1,0,0,1-1.35-.09l-7.26-8.3a20.28,20.28,0,0,1-4.64,2,20,20,0,0,1-19.88-5.4l0,0a20,20,0,0,1,14.89-33.9Zm11.14,9a16.19,16.19,0,0,0-5.13-3.58l0,0a16,16,0,0,0-21,8.28l0,0a16.08,16.08,0,0,0-.22,12.19A16.17,16.17,0,0,0,47,108a16,16,0,0,0,5.13,3.57,15.79,15.79,0,0,0,6.09,1.33,16,16,0,0,0,11.41-4.46,16.23,16.23,0,0,0,3.57-5.12,16.09,16.09,0,0,0,.24-12.24,16.06,16.06,0,0,0-3.37-5.26ZM90.36,3.42l16.55.68V26.45L90.36,15.53V3.42Z"
                  />
                </svg>
                <div className=" p md:-ml-1">
                  <input
                    type="text"
                    id="message"
                    value={searchText}
                    required
                    name="search"
                    placeholder="Search   Location"
                    className=" px-3  py-1 h-14 bg-white "
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>{" "}
                {searchText ? (
                  <button onClick={navigateToProperty}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-12 px-2 md:hidden bg-white"
                      viewBox="0 0 507 511.92"
                    >
                      <path d="M223.36 0c61.68 0 117.53 25 157.95 65.43 40.42 40.42 65.42 96.26 65.42 157.94 0 45.12-13.39 87.12-36.4 122.25L507 450.99l-66.66 60.93-93.23-102.59c-35.42 23.63-77.98 37.4-123.75 37.4-61.67 0-117.52-25-157.94-65.42C25 340.88 0 285.04 0 223.36c0-61.67 25-117.52 65.42-157.94S161.69 0 223.36 0zM152.6 201.55l47.29 45.86 90.66-102.01c5.05-5.11 8.22-9.22 14.43-2.81l15.15 15.63c6.62 6.55 6.29 10.4.04 16.5L211.42 292.63c-13.18 12.91-10.89 13.7-24.25.45l-63.51-63.24c-2.79-3.01-2.49-6.06.56-9.07l18.39-19.26c3.55-3.74 6.38-3.41 9.99.04zm211.09-118.5c-35.91-35.91-85.53-58.13-140.33-58.13-54.8 0-104.41 22.22-140.32 58.13-35.91 35.91-58.12 85.51-58.12 140.31s22.21 104.42 58.12 140.32c35.91 35.92 85.52 58.12 140.32 58.12s104.42-22.2 140.33-58.12c35.91-35.9 58.11-85.51 58.11-140.32 0-54.8-22.2-104.4-58.11-140.31z" />
                    </svg>
                  </button>
                ) : (
                  <button><svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-12 px-2 md:hidden bg-white"
                    viewBox="0 0 507 511.92"
                  >
                    <path d="M223.36 0c61.68 0 117.53 25 157.95 65.43 40.42 40.42 65.42 96.26 65.42 157.94 0 45.12-13.39 87.12-36.4 122.25L507 450.99l-66.66 60.93-93.23-102.59c-35.42 23.63-77.98 37.4-123.75 37.4-61.67 0-117.52-25-157.94-65.42C25 340.88 0 285.04 0 223.36c0-61.67 25-117.52 65.42-157.94S161.69 0 223.36 0zM152.6 201.55l47.29 45.86 90.66-102.01c5.05-5.11 8.22-9.22 14.43-2.81l15.15 15.63c6.62 6.55 6.29 10.4.04 16.5L211.42 292.63c-13.18 12.91-10.89 13.7-24.25.45l-63.51-63.24c-2.79-3.01-2.49-6.06.56-9.07l18.39-19.26c3.55-3.74 6.38-3.41 9.99.04zm211.09-118.5c-35.91-35.91-85.53-58.13-140.33-58.13-54.8 0-104.41 22.22-140.32 58.13-35.91 35.91-58.12 85.51-58.12 140.31s22.21 104.42 58.12 140.32c35.91 35.92 85.52 58.12 140.32 58.12s104.42-22.2 140.33-58.12c35.91-35.9 58.11-85.51 58.11-140.32 0-54.8-22.2-104.4-58.11-140.31z" />
                  </svg></button>
                )}
              </div>
<div className="hidden md:flex">
              {searchText ? (
              <div className="flex shadow-lg rounded-2xl">
<button className="rounded-br-2xl rounded-tr-2xl bg-white px-4" onClick={navigateToProperty}>Search Properties</button>
              </div>
              ) : (
                <div className="flex shadow-lg rounded-2xl">
                  {" "}
                 <button className="rounded-br-2xl rounded-tr-2xl bg-white px-4">Search Properties</button>
                </div>
              )}
              </div>
              </form>
          </div>
        </div>
       
      </div>
    
  );
};

export default Search;
