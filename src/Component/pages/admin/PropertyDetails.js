

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
 

const PropertyDetails = () => {
  const query = useQuery();
  const navigate = useNavigate();
// const id= query.get("id")
// console.log("id",id)
  const [modalOpen, setModalOpen, toggleModal] = useModal(false);
  const [modalOpen1, setModalOpen1, toggleModal1] = useModal(false);
  const [isEdit,setIsEdit]=useState(false)
  const [getProperty, setGetProperty] = useState({
    _id:"",
    category:"",
    Seller:"",
    location:"",
    layoutName:"",
    landArea:"",
    facing:"",
    approachRoad:"",
    builtArea:"",
    bedRoom:"",
    floorDetails:"",
    propertyStatus:"",
    nearTown:"",
    costSq:"",
    facilities:"",
    askPrice:"",
    propertyPic:"",
    Description:"",
  });
  const [rerender, setRerender] = useState(true);
  // const [getPayment, setGetPayment] = useState(null);
  // const [paymentData, setPaymentData] = useState([]);
console.log("getProperty",getProperty)
  const getPropertyId = async () => {
    const res = await getPropertyDetailsById({
      propertyId: query.get("id"),
    });
    if (res.success) {
      const{Property}=res;
      setGetProperty({
        id:Property?._id,
        category:Property?.category,
        Seller:Property?.Seller,
        location:Property?.location,
        layoutName:Property?.layoutName,
        landArea:Property?.landArea,
        facing:Property?.facing,
        approachRoad:Property?.approachRoad,
        builtArea:Property?.builtArea,
        bedRoom:Property?.bedRoom,
        floorDetails:Property?.floorDetails,
        propertyStatus:Property?.propertyStatus,
        nearTown:Property?.nearTown,
        costSq:Property?.costSq,
        facilities:Property?.facilities,
        askPrice:Property?.askPrice,
        propertyPic:Property?.propertyPic,
        Description:Property?.Description,
      });
      console.log("res", res);
    }
  };

  useEffect(() => {
    if(rerender){
    getPropertyId();

    setRerender(false)
  }}, [rerender]);
  

  // useEffect(() => {
  //   if(rerender){
  //     handleUpdatingProperty();
  //   setRerender(false)
  // }}, [rerender]);

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
  },[]);


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
  

  <Breadcrumbs >
      <a href="/admin/Dashboard" className="opacity-60 font">
        Dashboard
      </a>
      <a href="/admin/PropertyList" className="opacity-60 font">
        Properties
      </a>
      <a className=" text-amber-700 disabled font">
        PropertyDetails
      </a>
     
    </Breadcrumbs>
            <div class="grid  grid-cols-2 min-w-full py-5 max-w-sm bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="flex ml-5 flex-col items-left pb-10"  >
  <p className=' text-amber-700'> Seller :</p> 
    <Input

              type="text"
              name="Seller"
              placeholder="Enter the Seller "
              value={getProperty?.Seller}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,Seller:e.target.value})}
            />
            <p className=" text-amber-700"> CostSq :</p>

            <Input
              type="text"
              name="CostSq"
              placeholder="Enter the CostSq "
              value={getProperty?.costSq}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,costSq:e.target.value})}
            />
            <p className=" text-amber-700"> Location :</p>
            <Input
              type="text"
              name="Location"
              placeholder="Enter the Location "
              value={getProperty?.location}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,location:e.target.value})}
            />
            <p className=" text-amber-700"> LayoutName :</p>
            <Input
              type="text"
              name="LayoutName"
              placeholder="Enter the LayoutName "
              value={getProperty?.layoutName}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,layoutName:e.target.value})}
            />
            <p className=" text-amber-700"> LandArea :</p>
            <Input
              type="text"
              name="LandArea"
              placeholder="Enter the LandArea "
              value={getProperty?.landArea}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,landArea:e.target.value})}
            />
            <p className=" text-amber-700"> Facing :</p>

            <Input
              type="text"
              name="Facing"
              placeholder="Enter the Facing "
              value={getProperty?.facing}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,facing:e.target.value})}
            />
            <p className=" text-amber-700"> ApproachRoad :</p>

            <Input
              type="text"
              name="ApproachRoad"
              placeholder="Enter the ApproachRoad "
              value={getProperty?.approachRoad}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,approachRoad:e.target.value})}
            />
            <p className=" text-amber-700">BuiltArea :</p>

            <Input
              type="text"
              name="BuiltArea"
              placeholder="Enter the BuiltArea "
              value={getProperty?.builtArea}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,builtArea:e.target.value})}
            />
            <p className=" text-amber-700"> BedRoom :</p>

            <Input
              type="text"
              name="BedRoom"
              placeholder="Enter the BedRoom "
              value={getProperty?.bedRoom}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,bedRoom:e.target.value})}
            />
            <p className=" text-amber-700"> FloorDetails :</p>

            <Input
              type="text"
              name="FloorDetails"
              placeholder="Enter the FloorDetails "
              value={getProperty?.floorDetails}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,floorDetails:e.target.value})}
            />
            <p className=" text-amber-700"> NearTown :</p>

            <Input
              type="text"
              name="NearTown"
              placeholder="Enter the NearTown "
              value={getProperty?.nearTown}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,nearTown:e.target.value})}
            />
            <p className=" text-amber-700"> Facilities :</p>

            <Input
              type="text"
              name="Facilities"
              placeholder="Enter the Facilities "
              value={getProperty?.facilities}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,facilities:e.target.value})}
            />
            <p className=" text-amber-700">AskPrice :</p>

            <Input
              type="text"
              name="AskPrice"
              placeholder="Enter the AskPrice "
              value={getProperty?.askPrice}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,askPrice:e.target.value})}
            />
            <p className=" text-amber-700">Description :</p>

            <Input
              type="text"
              name="Description"
              placeholder="Enter the Description "
              value={getProperty?.Description}
              disabled={!isEdit}
              onChange={(e) => setGetProperty({...getProperty,Description:e.target.value})}
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
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setIsEdit(true)}
                // disabled={isDisabled(true)}
              >  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
                Edit
              </button>
            ) : (
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => handleUpdatingProperty(e)}
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clip-rule="evenodd" />
            </svg>
            
                Update Property
              </button>
            )}
           
       
           {getProperty?.status !=="approved"?   <button
              href="#"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white  bg-amber-700 rounded-lg hover:bg-amber-900  focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              onClick={()=>toggleModal1()}
            ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          
             Add
            </button>
           : <button  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white   bg-amber-700 rounded-lg hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
           onClick={()=>toggleModal()}
            ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          Remove 
          </button>}
        </div>   
        </div>

            

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
