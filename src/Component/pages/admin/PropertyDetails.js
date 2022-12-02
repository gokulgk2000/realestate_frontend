

import React, { useEffect, useState } from 'react'
import { addProperty, getPropertyDetailsById, removeProperty,updateProperty } from '../../helper/backend_helpers';
import { useQuery } from '../../helper/hook/useQuery';

import { useModal } from '../../helper/hook/useModal';
import toastr from "toastr"
import "toastr/build/toastr.min.css";
import RemoveModel from '../../models/RemoveModel';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Breadcrumbs, Input } from '@material-tailwind/react';
import FileInput from '../../reusable/FileInput';
import AddModel from '../../models/AddModel';




import { useModel } from "../../helper/hook/useModel"
import { map } from 'lodash';
const PropertyDetails = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen, toggleModal] = useModal(false);
  const [modalOpen1, setModalOpen1, toggleModal1] = useModal(false);
  const [getProperty, setGetProperty] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [seller, setSeller] = useState("");
  const [location, setLocation] = useState("");
  const [layoutName, setLayoutName] = useState("");
  const [landArea, setLandArea] = useState("");
  const [facing, setFacing] = useState("");
  const [approachRoad, setApproachRoad] = useState("");
  const [builtArea, setBuiltArea] = useState("");
  const [bedRoom, setBedRoom] = useState("");
  const [floorDetails, setFloorDetails] = useState("");
  const [nearTown, setNearTown] = useState("");
  const [costSq, setCostSq] = useState("");
  const [facilities, setFacilities] = useState("");
  const [askPrice, setAskPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setloading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [propertyPic, setPropertyPic] = useState("");
  const [isAdd ,setIsAdd]=useState("");
  const [rerender, setRerender] = useState(true);
  // const [getPayment, setGetPayment] = useState(null);
  // const [paymentData, setPaymentData] = useState([]);

  const getPropertyId = async () => {
    const res = await getPropertyDetailsById({
      propertyId: query.get("id"),
    });
    if (res.success) {
      setGetProperty(res.Property);
      // console.log("res", res);
    }
  };

  useEffect(() => {
    if(rerender){
    getPropertyId();

    setRerender(false)
  }}, [rerender]);


 
  const handleAddProperty = async () => {
    const payload = {
      PropertyID:query.get("id"),
    };
    const res = await addProperty(payload);

    if (res.success) {
      console.log("res", res);
      toastr.success(`Property has been activated successfully`, "Success");
      setRerender(true)
    
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
      console.log(res);
      
      toastr.success(`Property has been Deactivated successfully`, "Success");
      // navigate("/admin/PropertyList");
      setRerender(true)
    } else {
      console.log("Error : ", res?.msg || "error");
    }
    setModalOpen(false); 
  };
  const handleUpdatingProperty = async () => {
    setloading(true);
    const updateProperties = getProperty?.map((pro) => pro?.id);
    const payload = {
      id: query.get("id"),
      Seller: seller,
      location,
      layoutName,
      landArea,
      location,
      layoutName,
      landArea,
      facing,
      approachRoad,
      builtArea,
      bedRoom,
      floorDetails,
      nearTown,
      costSq,
      facilities,
      askPrice,
      Description: description,
      propertyPic,
      properties: updateProperties,
    };
    const id = query.get("id");
    console.log("id", id);
    const res = await updateProperty(payload);
    console.log("first", res);
    if (res.success) {
      toastr.success(`Property has been updated successfully`, "Success");

      await getPropertyDetailsById({
        id: query.get("id"),
      });
    } else {
      toastr.error(`Failed to update Property due to`, "Failed!!!");
    }
    setloading(false);
  };
  useEffect(() => {
    if (getProperty) {
      setPropertyId(getProperty?.id);
      setLocation(getProperty?.location);
      setSeller(getProperty?.Seller);
      setLocation(getProperty?.location);
      setSeller(getProperty?.Seller);
      setLayoutName(getProperty?.layoutName);
      setLandArea(getProperty?.landArea);
      setFacing(getProperty?.facing);
      setApproachRoad(getProperty?.approachRoad);
      setBuiltArea(getProperty?.builtArea);
      setBedRoom(getProperty?.bedRoom);
      setFloorDetails(getProperty?.floorDetails);
      setNearTown(getProperty?.nearTown);
      setCostSq(getProperty?.costSq);
      setFacilities(getProperty?.facilities);
      setAskPrice(getProperty?.askPrice);
      setDescription(getProperty?.Description);
      setPropertyPic(getProperty?.propertyPic[0]);
      setGetProperty();
    }
  });


  // console.log("getProperty : ",getProperty)

  }, []);
  console.log("getproperty", getProperty );  
  // const handleRemovingProperty = async () => {
  //   const payload = {
  //     PropertyID: [property?._id],
  //   };
  //   const res = await removeProperty(payload);
  //   if (res.success) {
  //     console.log(res);
  //     toastr.success(`Property has been Deactivated successfully`, "Success");
  //   } else {
  //     console.log("Error : ", res?.msg || "error");
  //   }
  //   setModalOpen(false);
  // };
 

  return (
    <React.Fragment>
    {modalOpen && <RemoveModel
      show={modalOpen}
      onDeleteClick={handleRemovingProperty}
      confirmText="Yes,DeActive"
      cancelText="Cancel"
      onCloseClick={()=>setModalOpen(false)}
    />}
     {modalOpen1 && (
        <AddModel
          show={modalOpen}
          onAddClick={handleAddProperty}
          confirmText="Yes,Active"
          cancelText="Cancel"
          onCloseClick={() => setModalOpen1(false)}
        />
      )}
  <div>

  <Breadcrumbs >
      <a href="/admin/Dashboard" className="opacity-60">
        Dashboard
      </a>
      <a href="/admin/PropertyList" className="opacity-60">
        Properties
      </a>
      <a className="text-rose-700 disabled">
        PropertyDetails
      </a>
     
    </Breadcrumbs>
            <div class="grid  grid-cols-2 min-w-full py-5 max-w-sm bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="flex ml-5 flex-col items-left pb-10"  >
  <p className='text-rose-700'> Seller :</p> 
    <Input

              type="text"
              name="Seller"
              placeholder="Enter the Seller "
              value={getProperty?.Seller}
              disabled={!isEdit}
              onChange={(e) => setSeller(e.target.value)}
            />
            <p className="text-rose-700"> CostSq :</p>

            <Input
              type="text"
              name="CostSq"
              placeholder="Enter the CostSq "
              value={getProperty?.costSq}
              disabled={!isEdit}
              onChange={(e) => setCostSq(e.target.value)}
            />
            <p className="text-rose-700"> Location :</p>
            <Input
              type="text"
              name="Location"
              placeholder="Enter the Location "
              value={getProperty?.location}
              disabled={!isEdit}
              onChange={(e) => setLocation(e.target.value)}
            />
            <p className="text-rose-700"> LayoutName :</p>
            <Input
              type="text"
              name="LayoutName"
              placeholder="Enter the LayoutName "
              value={getProperty?.layoutName}
              disabled={!isEdit}
              onChange={(e) => setLayoutName(e.target.value)}
            />
            <p className="text-rose-700"> LandArea :</p>
            <Input
              type="text"
              name="LandArea"
              placeholder="Enter the LandArea "
              value={getProperty?.landArea}
              disabled={!isEdit}
              onChange={(e) => setLandArea(e.target.value)}
            />
            <p className="text-rose-700"> Facing :</p>

            <Input
              type="text"
              name="Facing"
              placeholder="Enter the Facing "
              value={getProperty?.facing}
              disabled={!isEdit}
              onChange={(e) => setFacing(e.target.value)}
            />
            <p className="text-rose-700"> ApproachRoad :</p>

            <Input
              type="text"
              name="ApproachRoad"
              placeholder="Enter the ApproachRoad "
              value={getProperty?.approachRoad}
              disabled={!isEdit}
              onChange={(e) => setApproachRoad(e.target.value)}
            />
            <p className="text-rose-700">BuiltArea :</p>

            <Input
              type="text"
              name="BuiltArea"
              placeholder="Enter the BuiltArea "
              value={getProperty?.builtArea}
              disabled={!isEdit}
              onChange={(e) => setBuiltArea(e.target.value)}
            />
            <p className="text-rose-700"> BedRoom :</p>

            <Input
              type="text"
              name="BedRoom"
              placeholder="Enter the BedRoom "
              value={getProperty?.bedRoom}
              disabled={!isEdit}
              onChange={(e) => setBedRoom(e.target.value)}
            />
            <p className="text-rose-700"> FloorDetails :</p>

            <Input
              type="text"
              name="FloorDetails"
              placeholder="Enter the FloorDetails "
              value={getProperty?.floorDetails}
              disabled={!isEdit}
              onChange={(e) => setFloorDetails(e.target.value)}
            />
            <p className="text-rose-700"> NearTown :</p>

            <Input
              type="text"
              name="NearTown"
              placeholder="Enter the NearTown "
              value={getProperty?.nearTown}
              disabled={!isEdit}
              onChange={(e) => setNearTown(e.target.value)}
            />
            <p className="text-rose-700"> Facilities :</p>

            <Input
              type="text"
              name="Facilities"
              placeholder="Enter the Facilities "
              value={getProperty?.facilities}
              disabled={!isEdit}
              onChange={(e) => setFacilities(e.target.value)}
            />
            <p className="text-rose-700">AskPrice :</p>

            <Input
              type="text"
              name="AskPrice"
              placeholder="Enter the AskPrice "
              value={getProperty?.askPrice}
              disabled={!isEdit}
              onChange={(e) => setAskPrice(e.target.value)}
            />
            <p className="text-rose-700">Description :</p>

            <Input
              type="text"
              name="Description"
              placeholder="Enter the Description "
              value={getProperty?.Description}
              disabled={!isEdit}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <FileInput
              type="file"
              name="Property Picture"
              placeholder="Choose Your Property "
              multiple={true}
              value={getProperty?.propertyPic }
              disabled={!isEdit}
              onChange={e =>setPropertyPic(e.target.value)}
            /> */}
          </div>
          <img src={getProperty?.propertyPic} />

          <div class="flex ml-5 mt-4 space-x-3 md:mt-6">
            {!isEdit ? (
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setIsEdit(true)}
                // disabled={isDisabled(true)}
              >
                Edit
              </button>
            ) : (
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => handleUpdatingProperty()}
              >
                Update Property
              </button>
            )}
           
       
           {!isAdd?   <button
              href="#"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              onClick={()=>{toggleModal1()
                setIsAdd(true)}}
            >
             Add
            </button>
           : <button  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
           onClick={()=>{toggleModal()
            setIsAdd(false)}}
            >Remove </button>}
        </div>   </div>

            

            <div class="min-w-full py-5 max-w-sm bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    {/* <div class="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span class="sr-only">Open dropdown</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
        </button>

        <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
            <ul class="py-1" aria-labelledby="dropdownButton">
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
        </div>
    </div> */}
    {/* {getProperty?.map((prode,i)=>( */}
   
    <div class="flex  ml-5 flex-col items-left pb-10"  >
    {/* {map(getProperty,(pro,k)=>(
     <div propertyId={pro} key={"pro" + k} > <>{pro?.location} {pro?.Seller}</> </div> 
    
    ))} */}
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Seller : {getProperty?.Seller }</h5>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">AskPrice :  {getProperty?.askPrice }</h5>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">costSq :{getProperty?.costSq}</h5>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">location :{getProperty?.location }</h5>  
        
        <span class="text-sm text-gray-500 dark:text-gray-400"> </span>
        </div>
        {/* ))}  */}
        <div class="flex ml-5 mt-4 space-x-3 md:mt-6">
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</a>
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Remove </a>
        </div>
   
   

</div>
    </React.Fragment>
  );
};

export default PropertyDetails;
