import React, { useEffect, useState } from 'react'
import { getPropertyDetailsById, removeProperty,updateProperty } from '../../helper/backend_helpers';
import { useQuery } from '../../helper/hook/useQuery';
import { useModal } from '../../helper/hook/useModal';
import toastr from "toastr"
import "toastr/build/toastr.min.css";
import RemoveModel from '../../models/RemoveModel';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Breadcrumbs, Input } from '@material-tailwind/react';
import FileInput from '../../reusable/FileInput';


const PropertyDetails = () => {
  const query = useQuery();
  const navigate = useNavigate()

  const [modalOpen, setModalOpen, toggleModal] = useModal(false);
  const [getProperty, setGetProperty] = useState("");
  const [propertyId,setPropertyId] =useState("");
  const [seller,setSeller] =useState("");
  const [location,setLocation] =useState("");
  const [layoutName,setLayoutName] =useState("");
  const [landArea,setLandArea] =useState("");
  const [facing,setFacing] =useState("");
  const [approachRoad,setApproachRoad] =useState("");
  const [builtArea,setBuiltArea] =useState("");
  const [bedRoom,setBedRoom] =useState("");
  const [floorDetails,setFloorDetails] =useState("");
  const [nearTown,setNearTown] =useState("");
  const [costSq,setCostSq] =useState("");
  const [facilities,setFacilities] =useState("");
  const [askPrice,setAskPrice] =useState("");
  const [description,setDescription] =useState("");
  const [loading, setloading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const[propertyPic,setPropertyPic] = useState("")
  
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
    getPropertyId();
  }, []);
 

  const handleRemovingProperty = async () => {
    const payload = {
      PropertyID: query.get("id"),
    };
    const res = await removeProperty(payload);
    if (res.success) {
      
      console.log(res);
      toastr.success(`Property has been Deactivated successfully`, "Success");
      navigate("/admin/PropertyList")
    } else {
      console.log("Error : ", res?.msg || "error");
    }
    setModalOpen(false);
  };
const handleUpdatingProperty = async () => {
setloading(true)
const updateProperties = getProperty?.map(pro =>pro?.id)
const payload ={
  id:query.get("id"),
  Seller:seller,
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
  Description:description,
  propertyPic,
  properties:updateProperties

}
const id=query.get("id")
console.log("id",id)
const res = await updateProperty(payload)
console.log("first",res)
if (res.success) {
  toastr.success(
    `Property has been updated successfully`,
    "Success"
  )
 
  await getPropertyDetailsById({ 
   id: query.get("id")
   })
   
 
} else {
  toastr.error(`Failed to update Property due to`, "Failed!!!")
}
setloading(false)
}
useEffect(()=>{
  if(getProperty){
    setPropertyId(getProperty?.id)
    setLocation(getProperty?.location)
    setSeller(getProperty?.Seller)
    setLocation(getProperty?.location)
    setSeller(getProperty?.Seller)
    setLayoutName(getProperty?.layoutName)
    setLandArea(getProperty?.landArea)
    setFacing(getProperty?.facing)
    setApproachRoad(getProperty?.approachRoad)
    setBuiltArea(getProperty?.builtArea)
    setBedRoom(getProperty?.bedRoom)
    setFloorDetails(getProperty?.floorDetails)
    setNearTown(getProperty?.nearTown)
    setCostSq(getProperty?.costSq)
    setFacilities(getProperty?.facilities)
    setAskPrice(getProperty?.askPrice)
    setDescription(getProperty?.Description)
    setPropertyPic(getProperty?.propertyPic[0])
    setGetProperty()
  }
})

// console.log("getProperty : ",getProperty)
  return (
    <React.Fragment>
    {modalOpen && <RemoveModel
      show={modalOpen}
      onDeleteClick={handleRemovingProperty}
      confirmText="Yes,DeActive"
      cancelText="Cancel"
      onCloseClick={()=>setModalOpen(false)}
    />}
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
              value={getProperty?.Seller }
              disabled={!isEdit}
              onChange={e=>setSeller(e.target.value)}
            /> 
            <p  className="text-rose-700"> CostSq :</p>
             
    <Input
              type="text"
              name="CostSq"
              placeholder="Enter the CostSq "
              value={getProperty?.costSq}
              disabled={!isEdit}
              onChange={e=>setCostSq(e.target.value)}
            />
           <p  className="text-rose-700"> Location :</p>
    <Input
              type="text"
              name="Location"
              placeholder="Enter the Location "
              value={getProperty?.location }
              disabled={!isEdit}
              onChange={e =>setLocation(e.target.value)}
            />
            <p  className="text-rose-700"> LayoutName :</p>
    <Input
              type="text"
              name="LayoutName"
              placeholder="Enter the LayoutName "
              value={getProperty?.layoutName }
              disabled={!isEdit}
              onChange={e =>setLayoutName(e.target.value)}
            />
             <p  className="text-rose-700"> LandArea :</p>
    <Input
              type="text"
              name="LandArea"
              placeholder="Enter the LandArea "
              value={getProperty?.landArea }
              disabled={!isEdit}
              onChange={e =>setLandArea(e.target.value)}
            />
             <p  className="text-rose-700">  Facing :</p>
          
    <Input
              type="text"
              name="Facing"
              placeholder="Enter the Facing "
              value={getProperty?.facing }
              disabled={!isEdit}
              onChange={e =>setFacing(e.target.value)}
            />
             <p  className="text-rose-700"> ApproachRoad :</p>
            
    <Input
              type="text"
              name="ApproachRoad"
              placeholder="Enter the ApproachRoad "
              value={getProperty?.approachRoad }
              disabled={!isEdit}
              onChange={e =>setApproachRoad(e.target.value)}
            />
             <p  className="text-rose-700">BuiltArea :</p>
            
    <Input
              type="text"
              name="BuiltArea"
              placeholder="Enter the BuiltArea "
              value={getProperty?.builtArea }
              disabled={!isEdit}
              onChange={e =>setBuiltArea(e.target.value)}
            />
             <p  className="text-rose-700"> BedRoom :</p>
           
    <Input
              type="text"
              name="BedRoom"
              placeholder="Enter the BedRoom "
              value={getProperty?.bedRoom }
              disabled={!isEdit}
              onChange={e =>setBedRoom(e.target.value)}
            />
             <p  className="text-rose-700"> FloorDetails :</p>
            
    <Input
              type="text"
              name="FloorDetails"
              placeholder="Enter the FloorDetails "
              value={getProperty?.floorDetails }
              disabled={!isEdit}
              onChange={e =>setFloorDetails(e.target.value)}
            />
             <p  className="text-rose-700"> NearTown :</p>
            
    <Input
              type="text"
              name="NearTown"
              placeholder="Enter the NearTown "
              value={getProperty?.nearTown }
              disabled={!isEdit}
              onChange={e =>setNearTown(e.target.value)}
            /> 
             <p  className="text-rose-700"> Facilities :</p>
            
    <Input
              type="text"
              name="Facilities"
              placeholder="Enter the Facilities "
              value={getProperty?.facilities }
              disabled={!isEdit}
              onChange={e =>setFacilities(e.target.value)}
            />
             <p  className="text-rose-700">AskPrice :</p>
            
    <Input
              type="text"
              name="AskPrice"
              placeholder="Enter the AskPrice "
              value={getProperty?.askPrice }
              disabled={!isEdit}
              onChange={e =>setAskPrice(e.target.value)}
            />
             <p  className="text-rose-700">Description :</p>
           
    <Input
              type="text"
              name="Description"
              placeholder="Enter the Description "
              value={getProperty?.Description }
              disabled={!isEdit}
              onChange={e =>setDescription(e.target.value)}
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
        <img  src={getProperty?.propertyPic}/>

        <div class="flex ml-5 mt-4 space-x-3 md:mt-6">
     
        {!isEdit ?  <button  
            type='button'
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={
              ()=>setIsEdit(true)}
            // disabled={isDisabled(true)}
            >
              
              Edit</button>
              
              :  <button  
            type='button'
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleUpdatingProperty()}
            >
              Update Property</button>}
            <button  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            onClick={toggleModal}>Remove </button>
        </div>
</div>
        </div>
        </React.Fragment>
  )
}

export default PropertyDetails