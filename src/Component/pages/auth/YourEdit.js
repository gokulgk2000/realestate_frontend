import React from 'react'
import {  Input } from "@material-tailwind/react";
import { useState } from 'react';
import { useEffect } from 'react';
import { getPropertyDetailsById, updateProperty } from '../../helper/backend_helpers';
import { useQuery } from '../../helper/hook/useQuery';

import toastr from "toastr";
import "toastr/build/toastr.min.css";
const YourEdit = () => {
    const query = useQuery();
  
    const [isEdit, setIsEdit] = useState(false);

    const [currentImage, setCurrentImage] = useState(0);

    const [getProperty, setGetProperty] = useState({
        _id: "",
        category: "",
        Seller: "",
        location: "",
        layoutName: "",
        landArea: "",
        facing: "",
        approachRoad: "",
        builtArea: "",
        bedRoom: "",
        floorDetails: "",
        propertyStatus: "",
        nearTown: "",
        costSq: "",
        facilities: "",
        askPrice: "",
        propertyPic: "",
        Description: "",
        status: "",
      });
      const [rerender, setRerender] = useState(true);
    const getPropertyId = async () => {
        const res = await getPropertyDetailsById({
          propertyId: query.get("id"),
        });
        if (res.success) {
          const { Property } = res;
          setGetProperty({
            id: Property?._id,
            category: Property?.category,
            Seller: Property?.Seller,
            location: Property?.location,
            layoutName: Property?.layoutName,
            landArea: Property?.landArea,
            facing: Property?.facing,
            approachRoad: Property?.approachRoad,
            builtArea: Property?.builtArea,
            bedRoom: Property?.bedRoom,
            floorDetails: Property?.floorDetails,
            propertyStatus: Property?.propertyStatus,
            nearTown: Property?.nearTown,
            costSq: Property?.costSq,
            facilities: Property?.facilities,
            askPrice: Property?.askPrice,
            propertyPic: Property?.propertyPic,
            Description: Property?.Description,
            status: Property?.status,
          });
        }
      };
      useEffect(() => {
        if (rerender) {
          getPropertyId();
          setRerender(false);
        }
      }, [rerender]);

      const handleUpdatingProperty = async (e) => {
        e.preventDefault();
        toastr.success(`Property has been updated successfully`, "Success");
    
        const property = { ...getProperty, _id: query.get("id") };
    
        const res = await updateProperty(property);
        if (res.success) {
          setGetProperty(res.propertyPic)
          console.log(res.propertyPic);
        } else {
        }window.location.reload()
    
      };
      useEffect(() => {
        if (rerender) {
          getPropertyId();
          setRerender(false);
        }
      }, [rerender]);
      const convertBase64 = async (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
    
      const propertyImageUpload = async (e) => {

        const target = e.target;
        const allImages = await Promise?.all(
          [...target.files].map(async (files) => {
            return await convertBase64(files);
          })
        );  
      
      setGetProperty({...getProperty,propertyPic:allImages});
      
      };
      
      console.log("getProperty",getProperty)    
  return (
    <div class="grid  grid-cols-2 min-w-full py-5 max-w-sm bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="flex ml-5 flex-col items-left pb-10">
      <p className=" text-amber-700"> Seller :</p>
      <Input
        type="text"
        name="Seller"
        placeholder="Enter the Seller "
        value={getProperty?.Seller}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({ ...getProperty, Seller: e.target.value })
        }
      />
      <p className=" text-amber-700"> CostSq :</p>

      <Input
        type="text"
        name="CostSq"
        placeholder="Enter the CostSq "
        value={getProperty?.costSq}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({ ...getProperty, costSq: e.target.value })
        }
      />
      <p className=" text-amber-700"> Location :</p>
      <Input
        type="text"
        name="Location"
        placeholder="Enter the Location "
        value={getProperty?.location}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({ ...getProperty, location: e.target.value })
        }
      />
      <p className=" text-amber-700"> LayoutName :</p>
      <Input
        type="text"
        name="LayoutName"
        placeholder="Enter the LayoutName "
        value={getProperty?.layoutName}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({ ...getProperty, layoutName: e.target.value })
        }
      />
      <p className=" text-amber-700"> LandArea :</p>
      <Input
        type="text"
        name="LandArea"
        placeholder="Enter the LandArea "
        value={getProperty?.landArea}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({ ...getProperty, landArea: e.target.value })
        }
      />
      <p className=" text-amber-700"> Facing :</p>

      <Input
        type="text"
        name="Facing"
        placeholder="Enter the Facing "
        value={getProperty?.facing}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({ ...getProperty, facing: e.target.value })
        }
      />
      <p className=" text-amber-700"> ApproachRoad :</p>

      <Input
        type="text"
        name="ApproachRoad"
        placeholder="Enter the ApproachRoad "
        value={getProperty?.approachRoad}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({
            ...getProperty,
            approachRoad: e.target.value,
          })
        }
      />
      <p className=" text-amber-700">BuiltArea :</p>

      <Input
        type="text"
        name="BuiltArea"
        placeholder="Enter the BuiltArea "
        value={getProperty?.builtArea}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({ ...getProperty, builtArea: e.target.value })
        }
      />
      <p className=" text-amber-700"> BedRoom :</p>

      <Input
        type="text"
        name="BedRoom"
        placeholder="Enter the BedRoom "
        value={getProperty?.bedRoom}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({ ...getProperty, bedRoom: e.target.value })
        }
      />
      <p className=" text-amber-700"> FloorDetails :</p>

      <Input
        type="text"
        name="FloorDetails"
        placeholder="Enter the FloorDetails "
        value={getProperty?.floorDetails}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({
            ...getProperty,
            floorDetails: e.target.value,
          })
        }
      />
      <p className=" text-amber-700"> NearTown :</p>

      <Input
        type="text"
        name="NearTown"
        placeholder="Enter the NearTown "
        value={getProperty?.nearTown}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({ ...getProperty, nearTown: e.target.value })
        }
      />
      <p className=" text-amber-700"> Facilities :</p>

      <Input
        type="text"
        name="Facilities"
        placeholder="Enter the Facilities "
        value={getProperty?.facilities}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({ ...getProperty, facilities: e.target.value })
        }
      />
      <p className=" text-amber-700">AskPrice :</p>

      <Input
        type="text"
        name="AskPrice"
        placeholder="Enter the AskPrice "
        value={getProperty?.askPrice}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({ ...getProperty, askPrice: e.target.value })
        }
      />
      <p className=" text-amber-700">Description :</p>

      <Input
        type="text"
        name="Description"
        placeholder="Enter the Description "
        value={getProperty?.Description}
        disabled={!isEdit}
        onChange={(e) =>
          setGetProperty({
            ...getProperty,
            Description: e.target.value,
          })
        }
      />
      <p className=" text-amber-700">Property Picture :</p>

      <input
        type="file"
        accept=".png, .jpg, .jpeg,.pdf,.webp"
        name="propertyPic"
        placeholder=" Choose the propertyPic"
        multiple={true}
        disabled={!isEdit}
        className="border-2 px-2 py-1  border-gray-300 rounded-md  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        onChange={(e) => propertyImageUpload(e)}
      />
    </div>
    <div className="grid grid-cols-1 h-52 px-3">
      <img
        className=" aspect-[2] h-60"
        src={
          getProperty?.propertyPic
            ? getProperty?.propertyPic[currentImage]
            : null
        }
      />
      <div className="grid grid-cols-3 py-3 gap-x-2 gap-y-3">
        {getProperty?.propertyPic?.length > 1 &&
          getProperty?.propertyPic?.map((image, j) => (
            <button key={j}>
              <img
                src={image}
                className="aspect-[2] h-28"
                onClick={() => setCurrentImage(j)}
              />
            </button>
          ))}
      </div>
    </div>
    <div class="flex ml-5 mt-4 space-x-3 md:mt-6">
      {!isEdit ? (
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setIsEdit(true)}
        >
          {" "}
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          Edit
        </button>
      ) : (
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => handleUpdatingProperty(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
              clip-rule="evenodd"
            />
          </svg>
          Update Property
        </button>
      )}

     
    </div>
  </div>
  )
}

export default YourEdit