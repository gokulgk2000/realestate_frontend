import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import image from "../assets/dummy/DummyData";
import { tab } from "../helper/constatnt/ScreenSize";
import useMediaQuery from "../helper/hook/useMediaQuery";
import { useModal } from "../helper/hook/useModal";
import RequestedModel from "../models/RequestedModel";
import Search from "./Search";
import Do from "../assets/images/yooo.jpg"

export const Carousel = () => {
  const [isBiggerthanTab] = useMediaQuery(tab);
  const [modalOpen, setModalOpen] = useModal(false);

  const [selectImage, setSelectImage] = useState(0);
  const carouselLength = image.length;
  // console.log(carouselLength);
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));
  const nextImageOnClick = () => {
    if (selectImage < carouselLength - 1) {
      setSelectImage(selectImage + 1);
    } else setSelectImage(0);
  };

  const prevImageOnClick = () => {
    if (selectImage > 0) {
      setSelectImage((prev) => prev - 1);
    } else setSelectImage(carouselLength - 1);
  };

  useEffect(() => {
    const autoPlayFunction = setTimeout(() => {
      nextImageOnClick();
    }, 5000);
    return () => {
      clearTimeout(autoPlayFunction);
    };
  }, [selectImage]);

  return (
    <div className="">
      {modalOpen && (
        <RequestedModel
          show={modalOpen}
          onCloseClick={() => setModalOpen(false)}
          // currentUser={requestData?._id}
        />
      )}
     
     <div className="flex  justify-end ">
    <div className="absolute">
    <div className="flex  justify-end pr-24 ">

       

          {currentUser && (
        <div className=" absolute hover:free  pt-3 leading-relaxed hidden md:block  "  onClick={() => setModalOpen(true)}>
       <div className="flex "> <svg className="md:h-7 md:w-7 " viewBox="0 0 122.88 106.91"><path d="M56,92.15a38.3,38.3,0,0,0,11.23,5.78c8.41,2.66,17.75,2.25,27.12-1.74a2.72,2.72,0,0,1,2-.08l12,4L107,90.36a2.78,2.78,0,0,1,1-2.53,28.41,28.41,0,0,0,6.31-6.8,17.53,17.53,0,0,0,2.73-12.47,27,27,0,0,0-6-12.5c-.6-.76-1.25-1.5-1.92-2.23h0a42.62,42.62,0,0,0,1.27-6.59,50,50,0,0,1,5,5.34,32.71,32.71,0,0,1,7.14,15.14A23,23,0,0,1,119.05,84a32.7,32.7,0,0,1-6.29,7.12l1.61,12.4a2.79,2.79,0,0,1-3.6,3.21l-15.24-5a43.85,43.85,0,0,1-30,1.53A45,45,0,0,1,47.47,92.16c.65,0,1.33.06,2.06.09,2.18.06,4.34,0,6.46-.1ZM72.11,35.22a6.39,6.39,0,1,1-6.38,6.39,6.39,6.39,0,0,1,6.38-6.39Zm-42.18,0a6.39,6.39,0,1,1-6.38,6.39,6.39,6.39,0,0,1,6.38-6.39Zm21.09,0a6.39,6.39,0,1,1-6.38,6.39A6.38,6.38,0,0,1,51,35.22ZM52.3,0h.05C66.29.46,78.79,5.42,87.74,13.09,96.89,20.93,102.37,31.6,102,43.26v0c-.36,11.66-6.48,22-16.1,29.3-9.41,7.14-22.22,11.36-36.16,11A62.05,62.05,0,0,1,38.5,82.2a58.64,58.64,0,0,1-9.43-2.87l-22.83,9,7.65-18.19a42.35,42.35,0,0,1-10-12.73A35.22,35.22,0,0,1,0,40.3C.37,28.63,6.49,18.28,16.11,11,25.53,3.83,38.33-.38,52.28,0Zm-.17,6.35h-.05C39.62,6,28.25,9.74,19.94,16,11.83,22.2,6.66,30.83,6.37,40.47A29.15,29.15,0,0,0,9.56,54.53,36.92,36.92,0,0,0,19.7,66.69l1.89,1.51-3.65,8.67,11.21-4.41,1.2.51a52.07,52.07,0,0,0,9.47,3A57,57,0,0,0,49.94,77.2c12.47.36,23.85-3.36,32.16-9.66,8.11-6.16,13.28-14.79,13.57-24.43v0C96,33.44,91.32,24.54,83.6,17.92c-7.91-6.78-19-11.16-31.45-11.54Z"/></svg>
  <button
            className="pl-2 bg-white rounded-lg px-2 animate-pulse w-24 hover:bg-amber-400"
            onClick={() => setModalOpen(true)}
          >

          Click Here
          </button></div>
          <div>New Request</div>
         
        </div>
      )}
      
   
      
      
      </div>
      {currentUser && (
        <div className=" flex justify-center  hover:free  pt-3 leading-relaxed md:hidden animate-pulse" >
          <button
            className=" "
            onClick={() => setModalOpen(true)}
          ><div className="flex items-center text-center p">
<svg className=" h-8 w-8 " viewBox="0 0 122.88 106.91"><path d="M56,92.15a38.3,38.3,0,0,0,11.23,5.78c8.41,2.66,17.75,2.25,27.12-1.74a2.72,2.72,0,0,1,2-.08l12,4L107,90.36a2.78,2.78,0,0,1,1-2.53,28.41,28.41,0,0,0,6.31-6.8,17.53,17.53,0,0,0,2.73-12.47,27,27,0,0,0-6-12.5c-.6-.76-1.25-1.5-1.92-2.23h0a42.62,42.62,0,0,0,1.27-6.59,50,50,0,0,1,5,5.34,32.71,32.71,0,0,1,7.14,15.14A23,23,0,0,1,119.05,84a32.7,32.7,0,0,1-6.29,7.12l1.61,12.4a2.79,2.79,0,0,1-3.6,3.21l-15.24-5a43.85,43.85,0,0,1-30,1.53A45,45,0,0,1,47.47,92.16c.65,0,1.33.06,2.06.09,2.18.06,4.34,0,6.46-.1ZM72.11,35.22a6.39,6.39,0,1,1-6.38,6.39,6.39,6.39,0,0,1,6.38-6.39Zm-42.18,0a6.39,6.39,0,1,1-6.38,6.39,6.39,6.39,0,0,1,6.38-6.39Zm21.09,0a6.39,6.39,0,1,1-6.38,6.39A6.38,6.38,0,0,1,51,35.22ZM52.3,0h.05C66.29.46,78.79,5.42,87.74,13.09,96.89,20.93,102.37,31.6,102,43.26v0c-.36,11.66-6.48,22-16.1,29.3-9.41,7.14-22.22,11.36-36.16,11A62.05,62.05,0,0,1,38.5,82.2a58.64,58.64,0,0,1-9.43-2.87l-22.83,9,7.65-18.19a42.35,42.35,0,0,1-10-12.73A35.22,35.22,0,0,1,0,40.3C.37,28.63,6.49,18.28,16.11,11,25.53,3.83,38.33-.38,52.28,0Zm-.17,6.35h-.05C39.62,6,28.25,9.74,19.94,16,11.83,22.2,6.66,30.83,6.37,40.47A29.15,29.15,0,0,0,9.56,54.53,36.92,36.92,0,0,0,19.7,66.69l1.89,1.51-3.65,8.67,11.21-4.41,1.2.51a52.07,52.07,0,0,0,9.47,3A57,57,0,0,0,49.94,77.2c12.47.36,23.85-3.36,32.16-9.66,8.11-6.16,13.28-14.79,13.57-24.43v0C96,33.44,91.32,24.54,83.6,17.92c-7.91-6.78-19-11.16-31.45-11.54Z"/></svg>

          New Request           <div className="text-xs  pl-2 text-gray-900">Click to Sent</div>
 </div>  
          </button>
        
        </div>
      )}
    
    {/* {isBiggerthanTab && 
  
  <div className="md:flex justify-between btn-width mt-44 px-32">
  <div className="  ">
    <button
         className=" "
         onClick={(e) => {
           e.stopPropagation();
           prevImageOnClick();
         }}
       >
         <svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           stroke-width="1.5"
           stroke="currentColor"
           class="w-16 h-10 "
         >
           <path
             stroke-linecap="round"
             stroke-linejoin="round"
             d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
           />
         </svg>
       </button></div><div className="">
      
<button
         className=" "
         onClick={(e) => {
           e.stopPropagation();
           nextImageOnClick();
         }}
       >
         <svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           stroke-width="1.5"
           stroke="currentColor"
           class="w-16 h-10 "
         >
           <path
             stroke-linecap="round"
             stroke-linejoin="round"
             d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
           />
         </svg>
       </button>
      
       </div> </div>} */}
       </div></div>
   
      {isBiggerthanTab ? (
        <img
          className="w-full aspect-[2/1] h-96 object-cover" 
          src={image[selectImage]}
        />
        // <div><img src={Do} className="aspect-[] h-96 w-screen object-cover " /></div>
      ) : (
        // <img
        //   className="w-full  "
        //   src={image[selectImage]}
        // />
        <div className=""><img src={Do} className="aspect-[]  w-screen object-cover " /></div>
      )}



      <div className="text-center">
        {image.map((i, j) => (
          <span
            key={j}
            className={`${
              selectImage === j ? "text-red-500" : "text-gray-300"
            } cursor-pointer px-0.5`}
            onClick={() => setSelectImage(j)}
          >
       
          </span>
        ))}   <div className="md:-mt-24 -mt-12 animate-bounce "> <Search/></div>
      </div>
      
     
    
    </div>
  );
};
