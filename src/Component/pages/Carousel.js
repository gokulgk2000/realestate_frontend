import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import image from "../assets/dummy/DummyData";
import { tab } from "../helper/constatnt/ScreenSize";
import useMediaQuery from "../helper/hook/useMediaQuery";
import { useModal } from "../helper/hook/useModal";
import RequestedModel from "../models/RequestedModel";
import Search from "./Search";
import Do from "../assets/images/d3.jpg";
import { Link } from "react-router-dom";
import { getAdproperties } from "../helper/backend_helpers";
import { SERVER_URL } from "../helper/configuration";
import { isAuthAdmin } from "./admin/AuthAdmin";

export const Carousel = () => {
  const [isBiggerthanTab] = useMediaQuery(tab);
  const [modalOpen, setModalOpen] = useModal(false);
  const [loading, setLoading] = useState(false);

  const [adproperty, setAdProperty] = useState('');
  const [selectImage, setSelectImage] = useState(0);
  const carouselLength = adproperty?.adpic?.length;
  console.log("dey",carouselLength);
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));
  const nextImageOnClick = () => {
    if (selectImage < carouselLength - 1) {
      setSelectImage(selectImage + 1);
    } else setSelectImage(0);
  };
  const getAdProperty = async () => {
    const payload = {
      adminID: "639a70332f4955d07a4a7cb3",
    };

    const res = await getAdproperties(payload);
    if (res.success) {
      setAdProperty(res?.banner);
      setLoading(res?.banner)
    }
    console.log( "payload",adproperty);
  };
  useEffect(() => {
    getAdProperty();
  }, []);
  const prevImageOnClick = () => {
    if (selectImage > 0) {
      setSelectImage((prev) => prev - 1);
    } else setSelectImage(carouselLength - 1);
  };

  useEffect(() => {
    const autoPlayFunction = setTimeout(() => {
      nextImageOnClick();
    }, 4000);
    return () => {
      clearTimeout(autoPlayFunction);
    };
  }, [selectImage,loading]);

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
        {!isAuthAdmin() &&
        <div className=" flex md:ustify-center  hover:free  pt-3 leading-relaxed   animate-pulse md:animate-none fixed">
            {currentUser ? (
              <button
                className="md:bg-white   rounded-lg px-2 py-2 bg-transparent"
                onClick={() => setModalOpen(true)}
              >
                <div className="flex md:items-center md:text-center        text-orange-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-10 h-10"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                  Buyer Request
                </div>
              </button>
            ) : (
              <Link to="/login" className="bg-white rounded-lg px-4 py-2">
                <div className="flex items-center text-center text-orange-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                  Buyer Request
                </div>
              </Link>
            )}
          </div>} 
{/* prev ,next button */}
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
        </div>
      </div>
      {/* {adproperty?.adpic.map((i,j)=>{
        <img src={`${SERVER_URL}/file/${i?.id}`}/>
      })} */}
      {isBiggerthanTab ? (  
                   <img  src={`${SERVER_URL}/file/${adproperty?.adpic?.[selectImage]?.id}`} className="w-screen banner " />
             
                                             
                                           
    
      ) : (
        <img  src={`${SERVER_URL}/file/${adproperty?.adpic?.[selectImage]?.id}`} />

      
      )}

       {loading && <div className="text-center">
        {adproperty?.adpic?.map((i, j) => ( 
          <span
            key={j}
            className={`${
              selectImage?.id === j ? "text-red-500" : "text-gray-300"
            } cursor-pointer px-0.5`}
            onClick={() => setSelectImage(j)}
          ></span>
        ))}
      </div> }
    </div>
  );
};
