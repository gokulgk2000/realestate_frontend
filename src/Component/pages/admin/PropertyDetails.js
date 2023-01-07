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
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../helper/configuration";
import axios from "axios";

const PropertyDetails = () => {
  const query = useQuery();
  const [modalOpen, setModalOpen, toggleModal] = useModal(false);
  const [modalOpen1, setModalOpen1, toggleModal1] = useModal(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isloadingUpdate, setIsloadingUpdate] = useState(false);
  const [PropertyUpdatedSuccess, setPropertyUpdatedSuccess] = useState("");
  const [propertyUpdatedError, setpropertyUpdatedError] =useState("");
  const [removeImages, setRemoveImages] = useState([]);
  const [addImages, setAddImages] = useState([]);
  const [getProperty, setGetProperty] = useState({
    _id: "",
    category: "",
    title:"",
    transactionType:"",
    Seller: "",
    yourName: "",
    location: "",
    layoutName: "",
    streetName: "",
    landArea: "",
    facing: "",
    approachRoad: "",
    builtArea: "",
    bedRoom: "",
    bathRoom: "",
    floor: "",
    floorDetails: "",
    propertyStatus: "",
    nearFacilities: "",
    costSq: "",
    facilities: "",
    bargainPrice: "",
    negotiablePrice: "",
    propertyPic: "",
    Description: "",
    status: "",phone:"",
  });
  console.log("getProperty",getProperty)
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
        title: Property?.title,
        transactionType: Property?.transactionType,
        Seller: Property?.Seller,
        yourName: Property?.yourName,
        location: Property?.location,
        layoutName: Property?.layoutName,
        landArea: Property?.landArea,
        streetName: Property?.streetName,
        facing: Property?.facing,
        approachRoad: Property?.approachRoad,
        builtArea: Property?.builtArea,
        bedRoom: Property?.bedRoom,
        bathRoom: Property?.bathRoom,
        floor: Property?.floor,
        floorDetails: Property?.floorDetails,
        propertyStatus: Property?.propertyStatus,
        nearFacilities: Property?.nearFacilities,
        costSq: Property?.costSq,
        facilities: Property?.facilities,
        bargainPrice: Property?.bargainPrice,
        negotiablePrice: Property?.negotiablePrice,
        propertyPic: Property?.propertyPic,
        Description: Property?.Description,
        status: Property?.status,
        phone: Property?.phone,
      });
    }
  };
console.log("first",getProperty)
  const handleUpdatingProperty = async (e) => {
    setIsloadingUpdate(true)
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
    payloadData.propertyPic = [...property.propertyPic,...picIds];


    const res = await updateProperty(payloadData);
    if (res.success) {
      setGetProperty(res.propertyPic)
      setPropertyUpdatedSuccess(res.msg)

    toastr.success(`Property has been updated successfully`, "Success");
    }else{
      setpropertyUpdatedError(res.msg)
    }
    setIsloadingUpdate(false)

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

  const handleRemovingProperty = async () => {
    const payload = {
      PropertyID: query.get("id"),
    };
    const res = await removeProperty(payload);
    if (res.success) {

      toastr.success(`Property has been Deactivated successfully`, "Success");
      setRerender(true);
    } else {
      console.log("Error : ", res?.msg || "error");
    }
    setModalOpen(false);
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
    <>
      {modalOpen && (
        <RemoveModel
          show={modalOpen}
          onDeleteClick={handleRemovingProperty}
          confirmText="Yes,DeActive"
          cancelText="Cancel"
          onCloseClick={() => setModalOpen(false)}
        />
      )}
      {modalOpen1 && (
        <AddModel
          show={modalOpen}
          onAddClick={handleAddProperty}
          confirmText="Yes,Active"
          cancelText="Cancel"
          onCloseClick={() => setModalOpen1(false)}
        />
      )}
      {loading ? (
        <div className="text-center">Loading....</div>
      ) : (
        <>
          <Breadcrumbs>
            <Link to="/admin">
              <button className="opacity-60 font">Dashboard</button>
            </Link>
            <Link to="/admin/PropertyList">
              <button className="opacity-60 font">Properties List</button>
            </Link>
            <Link to="/admin/PropertyList" disabled>
              <button className="text-amber-700 font">Properties Details</button>
            </Link>
          </Breadcrumbs>
          <div class="grid  grid-cols-2 min-w-full py-5 max-w-sm bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div class="flex ml-5 flex-col items-left pb-10">
              <p className=" text-amber-700"> Title :</p>
              <Input
                type="text"
                name="title"
                placeholder="Enter the Title "
                value={getProperty?.title}
                disabled={!isEdit}
                onChange={(e) =>
                  setGetProperty({ ...getProperty, title: e.target.value })
                }
              />
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
              <p className=" text-amber-700"> yourName :</p>
              <Input
                type="text"
                name="yourName"
                placeholder="Enter the yourName "
                value={getProperty?.yourName}
                disabled={!isEdit}
                onChange={(e) =>
                  setGetProperty({ ...getProperty, yourName: e.target.value })
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
              <p className=" text-amber-700"> streetName :</p>
              <Input
                type="text"
                name="streetName"
                placeholder="Enter the streetName "
                value={getProperty?.streetName}
                disabled={!isEdit}
                onChange={(e) =>
                  setGetProperty({ ...getProperty, streetName: e.target.value })
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
              <p className=" text-amber-700"> bathRoom :</p>

              <Input
                type="text"
                name="bathRoom"
                placeholder="Enter the bathRoom "
                value={getProperty?.bathRoom}
                disabled={!isEdit}
                onChange={(e) =>
                  setGetProperty({ ...getProperty, bathRoom: e.target.value })
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
              <p className=" text-amber-700"> floor :</p>

              <Input
                type="text"
                name="floor"
                placeholder="Enter the floor "
                value={getProperty?.floor}
                disabled={!isEdit}
                onChange={(e) =>
                  setGetProperty({
                    ...getProperty,
                    floor: e.target.value,
                  })
                }
              />
              <p className=" text-amber-700"> transactionType :</p>

              <Input
                type="text"
                name="transactionType"
                placeholder="Enter the transactionType "
                value={getProperty?.transactionType}
                disabled={!isEdit}
                onChange={(e) =>
                  setGetProperty({
                    ...getProperty,
                    transactionType: e.target.value,
                  })
                }
              />
             
              <p className=" text-amber-700"> nearFacilities :</p>

              <Input
                type="text"
                name="nearFacilities"
                placeholder="Enter the nearFacilities "
                value={getProperty?.nearFacilities}
                disabled={!isEdit}
                onChange={(e) =>
                  setGetProperty({ ...getProperty, nearFacilities: e.target.value })
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
              {/* <p className=" text-amber-700">bargainPrice :</p>

              <Input
                type="number"
                name="bargainPrice"
                placeholder="Enter the bargainPrice "
                value={getProperty?.bargainPrice}
                disabled={!isEdit}
                onChange={(e) =>
                  setGetProperty({ ...getProperty, bargainPrice: e.target.value })
                }
              /> */}
              <p className=" text-amber-700">Market Price :</p>

              <Input
                type="number"
                min={0}
                name="negotiablePrice"
                placeholder="Enter the negotiablePrice "
                value={getProperty?.negotiablePrice}
                disabled={!isEdit}
                onChange={(e) =>
                  setGetProperty({ ...getProperty, negotiablePrice: e.target.value })
                }
              />
              <p className=" text-amber-700">Description :</p> <Input
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
             
              <p className=" text-amber-700">Phone Number :</p>

              <Input
                type="number"
                min={0}
                name="phone"
                placeholder="Enter Your Phone Number "
                value={getProperty?.phone}
                disabled={!isEdit}
                onChange={(e) =>
                  setGetProperty({ ...getProperty, phone: e.target.value })
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
                      <div className="relative group">
                        {isEdit && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            className="w-6 h-6 absolute right-0 hover:scale-110 hidden group-hover:block text-white hover:bg-amber-500"
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
                          className="aspect-[2] h-28"
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
            </div><div className="py-2 col-span-2">   
            {" "}     <div className="flex justify-start pl-10">
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
         </div>
            <div class="flex justify-start pl-5 pt-4 space-x-3 md:mt-6">
              
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
              <div>
        
         {isloadingUpdate ?(
                 <button 
                type="button"
                className="border-2 rounded-md border-amber-800 hover:text-white  px-7 py-3 font text-amber-800  shadow-xl   hover:bg-yellow-900 hover:shadow-md">
               
                  Updating Property ...          
                   </button>
                ):(

                <button
                  type="button"
                  class="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                </button>)}</div>
              )}

              {getProperty?.status !== "approved" ? (
                <button
                  href="#"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white  bg-amber-700 rounded-lg hover:bg-amber-900  focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                  onClick={() => toggleModal1()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Approved
                </button>
              ) : (
                <button
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white   bg-amber-700 rounded-lg hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                  onClick={() => toggleModal()}
                >
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Rejected
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PropertyDetails;
