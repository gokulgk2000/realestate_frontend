import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import image from "../assets/dummy/DummyData";
import { useModal } from "../helper/hook/useModal";
import RequestedModel from "../models/RequestedModel";

export const Carousel = () => {
  const [modalOpen, setModalOpen] = useModal(false);

  const [selectImage, setSelectImage] = useState(0);
  const carouselLength = image.length;
  console.log(carouselLength);
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
    }, 7000);
    return () => {
      clearTimeout(autoPlayFunction);
    };
  }, [selectImage]);

  return (
    <div>
      {modalOpen && (
        <RequestedModel
          show={modalOpen}
          onCloseClick={() => setModalOpen(false)}
          // currentUser={requestData?._id}
        />
      )}{currentUser && (
        <div className="pt-3 leading-relaxed absolute  left-5 inset-y-2/2 ">
          <button
            className="md:p-2 font text-gray-300 grad-btn "
            onClick={() => setModalOpen(true)}
          >
            New Request
          </button>
          <p className="text-xs text-gray-300">Click to Sent a New Request</p>
        </div>
      )}
      <img
        className="h-[90%] w-full"
        // src={`https://${images[selectedImageIndex].image.defaultHost}/i/${images[selectedImageIndex].image.endpoint}/${images[selectedImageIndex].image.name}`}
        src={image[selectImage]}
      />
    
      <div className="flex ">
        <button
          className="absolute  right-10 inset-y-2/3 h-8 w-8 text-white "
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
            class="w-16 h-10 grad-btn"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
            />
          </svg>
        </button>

        <button
          className="absolute  left-5 inset-y-2/3  h-8 w-8 text-white"
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
            class="w-16 h-10 grad-btn-x"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
            />
          </svg>
        </button>
      </div>  

      <div className="text-center">
        {image.map((i, j) => (
          <span
            key={j}
            className={`${
              selectImage === j ? "text-red-500" : "text-gray-300"
            } cursor-pointer px-0.5`}
            onClick={() => setSelectImage(j)}
          >
            ●
          </span>
        ))}
      </div>
    </div>
  );
};
