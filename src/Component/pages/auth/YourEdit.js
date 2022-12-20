import React, { useEffect, useState } from "react";
import {
  addProperty,
  getPropertyDetailsById,
  PropertyRegistration,
  removeProperty,
  updateProperty,
} from "../../helper/backend_helpers";
import { useQuery } from "../../helper/hook/useQuery";

import { useModal } from "../../helper/hook/useModal";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import RemoveModel from "../../models/RemoveModel";
import { Breadcrumbs, Input } from "@material-tailwind/react";
import AddModel from "../../models/AddModel";
import FileInput from "../../reusable/FileInput";
import { Link, NavLink } from "react-router-dom";
import { SERVER_URL } from "../../helper/configuration";
import axios from "axios";
import UpdateModel from "../../models/UpdateModel";

const YourEdit = () => {
  const query = useQuery();
  const [modalOpen, setModalOpen, toggleModal] = useModal(false);
  const [modalOpen1, setModalOpen1, toggleModal1] = useModal(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [PropertyUpdatedSuccess, setPropertyUpdatedSuccess] = useState("");
  const [propertyUpdatedError, setpropertyUpdatedError] =useState("");
  const [removeImages, setRemoveImages] = useState([]);
  const [addImages, setAddImages] = useState([]);
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

  const handleUpdatingProperty = async (e) => {
    e.preventDefault();
    const property = { ...getProperty, _id: query.get("id") };

    let picIds = [];
    let payloadData = property;
    if (addImages?.length > 0) {
      let formData = new FormData();
      for (var i = 0; i < addImages?.length; i++) {
        formData.append("file", addImages[i]);
      }
      const fileUploadRes = await axios.post(`${SERVER_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { data } = fileUploadRes;
      if (data?.success) {
        data.files?.map((file) =>
          picIds.push({
            type: file?.contentType,
            size: file?.size,
            id: file?.id,
            name: file?.originalname,
            dbName: file?.filename,
            aflag: true,
          })
        );
      }
    }
    payloadData.propertyPic = [...property.propertyPic, ...picIds];

    const res = await updateProperty(payloadData);
    if (res.success) {
      setGetProperty(res.propertyPic);
      setPropertyUpdatedSuccess(res.msg)
      toastr.success(`Property has been updated successfully`, "Success");
    setModalOpen1(false);

    }else{
      setpropertyUpdatedError(res.msg)
    }
  };
  useEffect(() => {
    if (rerender) {
      getPropertyId();
      setRerender(false);
    }
  }, [rerender]);

  const handleAddProperty = async () => {
    const payload = {
      PropertyID: query.get("id"),
    };
    const res = await addProperty(payload);

    if (res.success) {
      toastr.success(`Property has been activated successfully`, "Success");
      setRerender(true);
    } else {
      console.log("Error : ", res?.msg || "error");
    }
    setModalOpen1(false);
  };

  const propertyImageUpload = async (e) => {
    const target = e.target;
    const allImages = await Promise?.all(
      [...target.files].map(async (files) => {
        return await files;
      })
    );
    setAddImages([...addImages, ...allImages]);
  };
  const propertyImageRemove = (image) => {
    const filteredImages = getProperty?.propertyPic.filter(
      (img) => img !== image
    );
    setGetProperty({ ...getProperty, propertyPic: filteredImages });
  };
  return (
    <div>
      {modalOpen1 && (
        <UpdateModel
          show={modalOpen1}
          onUpdateClick={handleUpdatingProperty}
          confirmText="Yes,Active"
          cancelText="Cancel"
          onCloseClick={() => setModalOpen1(false)}
        />
      )}
      <Breadcrumbs>
        <NavLink
          to="/yourProperties"
          className={({ isActive }) =>
            isActive ? "opacity-75 " : "text-black underline hover:text-amber-700"
          }
        >
          Back to Properties
        </NavLink>
      </Breadcrumbs>
      <div className="">
        <div class="md:grid  md:grid-cols-2 gap-x-3 min-w-full max-w-sm bg-white border  border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div class="md:flex pl-5  md:flex-col items-left md:pb-10 py-2">
            <p className=" text-amber-700"> Title :</p>
            <Input
              type="text"
              name="Title"
              placeholder="Enter the Title "
              value={getProperty?.Title}
              sdsd
              disabled={!isEdit}
              onChange={(e) =>
                setGetProperty({ ...getProperty, Title: e.target.value })
              }
            />
            <p className=" text-amber-700"> Seller :</p>
            <Input
              type="text"
              name="Seller"
              placeholder="Enter the Seller "
              value={getProperty?.Seller}
              sdsd
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
          <p className="text-red-500 pt-3 text-sm">*Once update your Property,Admin will Approved!!!</p>

          </div>
          
          <div className="grid md:grid-cols-1 md:h-52 px-3`">
      
              <img
                className=" aspect-[2] md:h-96 w-full"
                src={`${SERVER_URL}/file/${
                  getProperty?.propertyPic
                    ? getProperty?.propertyPic[currentImage]?.id
                    : null
                }`}
              />
   
            <div className="grid grid-cols-3 py-3 gap-x-2 gap-y-3">
              {getProperty?.propertyPic?.length > 0 &&
                getProperty?.propertyPic?.map((image, j) => (
                  <button key={j}>
                    <div className="relative group ">
                      {isEdit && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          className="w-6 h-6 absolute right-12 hover:scale-110 hidden group-hover:block text-white hover:bg-amber-500 "
                          onClick={() => propertyImageRemove(image)}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}

                      <img
                        src={`${SERVER_URL}/file/${image.id}`}
                        className="aspect-[2] h-28 "
                        onClick={() => setCurrentImage(j)}
                      />
                    </div>
                  </button>
                ))}
             
            </div> <div className="grid grid-cols-3 py-3 gap-x-2 gap-y-3">
                {addImages?.length > 0 &&
                  addImages?.map((joke, i) => (
                    <>
                      <img
                        src={URL.createObjectURL(joke)}
                        className="aspect-[2] h-28"
                      />
                    </>
                  ))}
              </div>
          </div>{" "}
          
          <div class="flex justify-center  md:pl-5  pb-5">

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
            <div><div className="py-2">   
            {" "}      
              {PropertyUpdatedSuccess && (
                <alert className="text-bold text-green-600">
                  {PropertyUpdatedSuccess}
                </alert>
              )}
              {propertyUpdatedError && (
                <alert className="text-bold text-red-600">
                  {propertyUpdatedError}
                </alert>
              )}
         
         </div>
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => toggleModal1()}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourEdit;
