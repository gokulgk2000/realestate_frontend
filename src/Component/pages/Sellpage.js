import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
//import Image from "../assets/images/home3.webp";
import FileInput from "../reusable/FileInput";
import Input from "../reusable/Input";
import * as Yup from "yup";
import { findCategory, PropertyRegistration } from "../helper/backend_helpers";
import { SERVER_URL } from "../helper/configuration";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useNavigate } from "react-router-dom";

const RegisterProperty = () => {
  const navigate = useNavigate()

  const [propertyregistrationError, setPropertyRegistrationError] =
    useState("");
  const [propertyregistrationSuccess, setPropertyRegistrationSuccess] =
    useState("");
  const propertystatus = [
    { value: "", text: "select property status " },
    { value: "ongoing", text: "ongoing " },
    { value: "pending", text: "pending " },
    { value: "complete", text: "complete " },
  ];
  const facing = [
    { value: "", text: "select facing " },
    { value: "east", text: "east " },
    { value: "west", text: "west " },
    { value: "south", text: "south " },
    { value: "north", text: "north " },
    { value: "southEast", text: "southEast " },
    { value: "southWest", text: "southWest " },
    { value: "northEast", text: "northEast " },
    { value: "northWest", text: "northWest " },
  ];
  const floorDetails = [
    { value: "", text: "Select Your FloorDetails  " },
    { value: "cementFloor", text: "CementFloor " },
    { value: "mosaic", text: "Mosaic " },
    { value: "tiles", text: "Tiles " },
    { value: "granite", text: "Granite " },
   
  ];
  const Seller = [
    { value: "", text: "Select Owner of the Property  " },
    { value: "Seller", text: "Seller " },
    { value: "promoters", text: "Promoters " },
    { value: "mediators", text: "Mediators " },
    { value: "websiteConsent", text: "WebSite Consent " },
   
  ];
  const facilities = [
    { value: "eb,", text: "EB " },
    { value: "water,", text: "Water 24*7 " },
    { value: "carParking,", text: "Car Parking " },
    { value: "gym,", text: "Gym " },
    { value: "communityHall,", text: "Community Hall " },
    { value: "lift,", text: "Lift " },
    { value: "gatedCommunity,", text: "Gated Community " },
    { value: "security,", text: "Security " },
    { value: "swimmingfool,", text: "Swimming Fool " },
    { value: "walkingTrack,", text: "Walking Track " },
    { value: "park,", text: "Park " },
    { value: "cctv,", text: "CCTV Monitoring 24*7 " },
   
  ];
  const [allcategory, setAllCategory] = useState([]);
  const [propertyPic, setPropertyPic] = useState([]);
  const [loading, setLoading] = useState(false)
  const [facilitiesList, setFacilitiesList] = useState([]);
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      regUser: currentUser?.userID,
      Seller: "",
      yourName: "",
      title: "",
      location: "",
      layoutName: "",
      landArea: "",
      facing: "",
      approachRoad: "",
      builtArea: "",
      bedRoom: "",
      bathRoom: "",
      floorDetails: "",
      floor: "",
      propertyStatus: "",
      nearFacilities: "",
      costSq: "",
      bargainPrice: "",
      negotiablePrice: "",
      Description: "",
      status: "",
      streetName: "",
      category: "",
    },
    validationSchema: Yup.object({
      Seller: Yup.string().required("Please Enter Owner"),
      yourName: Yup.string().required("Please Enter Owner Name"),
      title: Yup.string().required("Please Enter Your Title"),
      location: Yup.string().required("Please Enter Property location "),
      layoutName: Yup.string().required("Please Enter Property Layoutname"),
      // landArea: Yup.string().required("Please Enter Your Landmark"),
      // facing: Yup.string().required("Please Select facing"),
      // approachRoad: Yup.string().required("Please Enter approachRoad "),
      // builtArea: Yup.string().required("Please Enter Your builtArea"),
      // bedRoom: Yup.string().required("Please Enter Your bedRoom"),
      // bathRoom: Yup.string().required("Please Enter Your bathRoom"),
      // floorDetails: Yup.string().required("Please Enter Your floorDetails"),
      // floor: Yup.number().required("Please Enter Your floor"),
       propertyStatus: Yup.string().required("Please Enter Property Status"),
      //  nearFacilities: Yup.string().required("Please Enter Your nearFacilities"),
      costSq: Yup.string().required("Please Enter Your costSq"),
      // facilities: Yup.string().required("Please Enter Your facilities"),
      // bargainPrice: Yup.number().required("Please Enter Your bargainPrice`number`"),
      // negotiablePrice: Yup.number().required("Please Enter Your negotiablePrice`number`"),
      Description: Yup.string().max(1000,"Description max length of 1000 characters"),
      // streetName: Yup.string().required("Please Enter Your streetName"),
      category: Yup.string().required("Please Enter Your Property Type"),
    }),
    onSubmit: (values, onSubmitProps) => {
      handlePropertyReg({
        Seller: values.Seller,
        yourName: values.yourName,
        title: values.title,
        location: values.location,
        layoutName: values.layoutName,
        landArea: values.landArea,
        facing: values.facing,
        approachRoad: values.approachRoad,
        builtArea: values.builtArea,
        bedRoom: values.bedRoom,
        bathRoom: values.bathRoom,
        floorDetails: values.floorDetails,
        floor: values.floor,
        propertyStatus: values.propertyStatus,
        nearFacilities: values.nearFacilities,
        costSq: values.costSq,
        facilities:facilitiesList,
        bargainPrice: values.bargainPrice,
        negotiablePrice: values.negotiablePrice,
        Description: values.Description,
        category: values.category,
        streetName: values.streetName,
        regUser: currentUser?.userID,
        status: "pending",
      });
      onSubmitProps.resetForm();
      // navigate('/payment')
      // toastr.success(`Your Property Details Display "Soon"`, "Success");
       setLoading(true)

    },
  });

  useEffect(() => {
    const allcategory = async () => {
      const res = await findCategory();
      setAllCategory(res.category);

      return res;
    };

    allcategory();
  }, []);
  const handleImageUpload = async (e) => {
    const target = e.target;
    // console.log("images length : ",)
    if([...target.files]?.length>5){
    alert("'Property Images Limit is 5 ' ")
    }
else{const allImages = [...target.files].map((f) => f);
    setPropertyPic(allImages);}
  };

  const handlePropertyReg = async (payload) => {
    let picIds = [];
    let payloadData = payload;
    if (propertyPic?.length > 0) {
      let formData = new FormData();
      for (var i = 0; i < propertyPic.length; i++) {
        formData.append("file", propertyPic[i]);
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
    payloadData.propertyPic = picIds;

    const res = await PropertyRegistration(payloadData);
    if (res) {
      setPropertyRegistrationSuccess(res.msg);
    } else {
      setPropertyRegistrationError(res.msg);
    }
    setLoading(false)

  };
  // const handleFacilitiesChange = (event) => {
  //   const {checked,value,name} = event.target
  //   console.log("cb", checked,value,name);
  //   setAllFacilities(event.target.value);
  // };
  const handleFacilitiesChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
// console.log("value",isChecked,)
 
    if (isChecked) {
      //Add checked item into checkList 
      setFacilitiesList([...facilitiesList, value]);
    } else {
      //Remove unchecked item from checkList
      const filteredList = facilitiesList.filter((item) => item !== value);
      setFacilitiesList(filteredList);
    }
  };

  return (
    <div className="md:grid grid-cols-2 ml-5 p-1 font-serif font md:pl-32 md:pr-24">
      <form
        className="col-span-3 gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <h4 className="flex item-center justify-center font-semibold text-2xl pb-8 text-amber-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
</svg>


        Sale Property
        </h4>
        <p className="text-red-500 text-sm pb-5">" * " Fields are mandatory.So,Fill the mandatory Fields</p>
        <div className="sm:grid grid-cols-4 gap-2 ">
        <div>
            <Input
              label="*Title"
              type="text"
              name="title"
              placeholder="Title"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.title || ""}
              invalid={
                validation.touched.title && validation.errors.title
                  ? true
                  : false
              }
            />
            {validation.touched.title && validation.errors.title ? (
              <span  className="text-red-500" type="invalid">{validation.errors.title}</span>
            ) : null}
          </div>
        <div className="m-2 grid grid-rows-2 font gap-2">
            <div> *Property Type</div>
            <select
              id="category"
              name="category"
              label="category"
              className="border-2 capitalize px-2 py-2 font-medium text-gray-400  border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={validation.values.category || ""}
              onChange={validation.handleChange}
              invalid={
                validation.touched.category && validation.errors.category
                  ? true
                  : false
              }
            >
              {" "}
              <option value=""> Select Property Type</option>
              {allcategory.map((option, id) => (
                <option value={option?._id} key={id}>
                  {option?.name}
                </option>
              ))}
            </select>
            {validation.touched.category && validation.errors.category ? (
              <span  className="text-red-500" type="invalid">{validation.errors.category}</span>
            ) : null}
          </div>
          <div className="m-2 grid grid-rows-2 font gap-2">
            <div>*Property Status</div>
            <select
              id="propertyStatus"
              name="propertyStatus"
              label="property Status"
              className="border-2 capitalize px-2 py-2  text-gray-400  border-gray-300 rounded-md  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={validation.values.propertyStatus}
              onChange={validation.handleChange || ""}
              invalid={
                validation.touched.propertyStatus &&
                validation.errors.propertyStatus
                  ? true
                  : false
              }
            >
              {" "}
              {propertystatus.map((option, i) => (
                <option value={option?.value} key={i}>
                  {option?.text}
                </option>
              ))}
            </select>
            {validation.touched.propertyStatus &&
            validation.errors.propertyStatus ? (
              <span  className="text-red-500" type="invalid">{validation.errors.propertyStatus}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="*location"
              type="text"
              name="location"
              placeholder="Enter The Location"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.location || ""}
              invalid={
                validation.touched.location && validation.errors.location
                  ? true
                  : false
              }
            />
            {validation.touched.location && validation.errors.location ? (
              <span  className="text-red-500"type="invalid">{validation.errors.location}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="*Lay-Out Name"
              type="text"
              name="layoutName"
              placeholder="Enter The LayoutName"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.layoutName || ""}
              invalid={
                validation.touched.layoutName && validation.errors.layoutName
                  ? true
                  : false
              }
            />
            {validation.touched.layoutName && validation.errors.layoutName ? (
              <span  className="text-red-500" type="invalid">{validation.errors.layoutName}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="Street Name"
              type="text"
              name="streetName"
              placeholder="Enter The streetName"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.streetName || ""}
              invalid={
                validation.touched.streetName && validation.errors.streetName
                  ? true
                  : false
              }
            />
            {validation.touched.streetName && validation.errors.streetName ? (
              <span  className="text-red-500" type="invalid">{validation.errors.location}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="Land / Area"
              type="text"
              name="landArea"
              placeholder="Enter The LandArea"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.landArea || ""}
              invalid={
                validation.touched.landArea && validation.errors.landArea
                  ? true
                  : false
              }
            />
            {validation.touched.landArea && validation.errors.landArea ? (
              <span  className="text-red-500" type="invalid">{validation.errors.landArea}</span>
            ) : null}
          </div>
          <div className="m-2 grid grid-rows-2 font gap-2 mb-">
            <div className="">Facing</div>
            <select
              id="facing"
              name="facing"
              label="facing"
              className="border-2 capitalize px-2 py-2  text-black border-gray-300 rounded-md  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={validation.values.facing}
              onChange={validation.handleChange || ""}
              invalid={
                validation.touched.facing && validation.errors.facing
                  ? true
                  : false
              }
            >
              
              {" "}
              {facing.map((option, i) => (
                <option value={option?.value} key={i}>
                  {option?.text}
                </option>
              ))}
            </select>
            {validation.touched.facing && validation.errors.facing ? (
              <span  className="text-red-500" type="invalid">{validation.errors.facing}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="built Area"
              type="text"
              name="builtArea"
              placeholder="Enter The BuiltArea"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.builtArea || ""}
              invalid={
                validation.touched.builtArea && validation.errors.builtArea
                  ? true
                  : false
              }
            />
            {validation.touched.builtArea && validation.errors.builtArea ? (
              <span  className="text-red-500" type="invalid">{validation.errors.builtArea}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="bed Room"
              type="number"
              name="bedRoom"
              placeholder="Enter The No Of BedRoom"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.bedRoom || ""}
              invalid={
                validation.touched.bedRoom && validation.errors.bedRoom
                  ? true
                  : false
              }
            />
            {validation.touched.bedRoom && validation.errors.bedRoom ? (
              <span  className="text-red-500" type="invalid">{validation.errors.bedRoom}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="bath Room"
              type="number"
              name="bathRoom"
              placeholder="Enter The No Of BathRoom"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.bathRoom || ""}
              invalid={
                validation.touched.bathRoom && validation.errors.bathRoom
                  ? true
                  : false
              }
            />
            {validation.touched.bathRoom && validation.errors.bathRoom ? (
              <span  className="text-red-500" type="invalid">{validation.errors.bathRoom}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="floor "
              type="number"
              name="floor"
              placeholder="Enter The floor"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.floor || ""}
              invalid={
                validation.touched.floor &&
                validation.errors.floor
                  ? true
                  : false
              }
            />
            {validation.touched.floor &&
            validation.errors.floor ? (
              <span  className="text-red-500" type="invalid">{validation.errors.floor}</span>
            ) : null}
          </div>
          <div>
          <div className="m-2 grid grid-rows-2 font gap-2 mb-">

          <div>Floor Details</div>

          <select
              id="facing"
              name="floorDetails"
              label="Floor Details"
              className="border-2 capitalize px-2 py-2  text-black border-gray-300 rounded-md  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={validation.values.floorDetails}
              onChange={validation.handleChange || ""}
              invalid={
                validation.touched.floorDetails && validation.errors.floorDetails
                  ? true
                  : false
              }
            >
              
              {" "}
              {floorDetails.map((option, i) => (
                <option value={option?.value} key={i}>
                  {option?.text}
                </option>
              ))}
            </select>
            {validation.touched.floorDetails && validation.errors.floorDetails ? (
              <span  className="text-red-500" type="invalid">{validation.errors.floorDetails}</span>
            ) : null}
            </div>
          </div>
          <div>
            <Input
              label="approach Road"
              type="text"
              name="approachRoad"
              placeholder="Enter The ApproachRoad"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.approachRoad || ""}
              invalid={
                validation.touched.approachRoad &&
                validation.errors.approachRoad
                  ? true
                  : false
              }
            />
            {validation.touched.approachRoad &&
            validation.errors.approachRoad ? (
              <span  className="text-red-500" type="invalid">{validation.errors.approachRoad}</span>
            ) : null}
          </div>
          {/* <div>
            <Input
              label="facilities"
              type="text"
              name="facilities"
              placeholder="Enter The Facilities"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.facilities || ""}
              invalid={
                validation.touched.facilities && validation.errors.facilities
                  ? true
                  : false
              }
            />
            {validation.touched.facilities && validation.errors.facilities ? (
              <span  className="text-red-500" type="invalid">{validation.errors.facilities}</span>
            ) : null}
          </div> */}
          <div>
            <Input
              label="near Facilities"
              type="text"
              name="nearFacilities"
              placeholder="Enter The nearFacilities"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.nearFacilities || ""}
              invalid={
                validation.touched.nearFacilities && validation.errors.nearFacilities
                  ? true
                  : false
              }
            />
            {validation.touched.nearFacilities && validation.errors.nearFacilities ? (
              <span  className="text-red-500" type="invalid">{validation.errors.nearFacilities}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="*cost per Sq/Acra/cent"
              type="number"
              name="costSq"
              placeholder="Enter The CostSq"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.costSq || ""}
              invalid={
                validation.touched.costSq && validation.errors.costSq
                  ? true
                  : false
              }
            />
            {validation.touched.costSq && validation.errors.costSq ? (
              <span  className="text-red-500" type="invalid">{validation.errors.costSq}</span>
            ) : null}
          </div>
        
          <div>
            <Input
              label="bargainPrice (INR)"
              type="number"
              name="bargainPrice"
              placeholder="Enter The Price"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.bargainPrice || ""}
              invalid={
                validation.touched.bargainPrice && validation.errors.bargainPrice
                  ? true
                  : false
              }
            />
            {validation.touched.bargainPrice && validation.errors.bargainPrice ? (
              <span   className="text-red-500"type="invalid">{validation.errors.bargainPrice}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="negotiable Price (INR)"
              type="number"
              name="negotiablePrice"
              placeholder="Enter The Price"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.negotiablePrice || ""}
              invalid={
                validation.touched.negotiablePrice && validation.errors.negotiablePrice
                  ? true
                  : false
              }
            />
            {validation.touched.negotiablePrice && validation.errors.negotiablePrice ? (
              <span   className="text-red-500"type="invalid">{validation.errors.negotiablePrice}</span>
            ) : null}
          </div>
          <div className="m-2 grid grid-rows-2 font gap-2 mb-">

           <div>*Owner</div>
           
           <select
               id="Seller"
               name="Seller"
               label="Owner"
               className="border-2 capitalize px-2 py-2  text-black border-gray-300 rounded-md  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
               value={validation.values.Seller}
               onChange={validation.handleChange || ""}
               invalid={
                 validation.touched.Seller && validation.errors.Seller
                   ? true
                   : false
               }
             >
               
               {" "}
               {Seller.map((option, i) => (
                 <option value={option?.value} key={i}>
                   {option?.text}
                 </option>
               ))}
             </select>
             {validation.touched.Seller && validation.errors.Seller ? (
               <span  className="text-red-500" type="invalid">{validation.errors.Seller}</span>
             ) : null}
             </div>
          <div>
            <Input
              label="*Owner Name"
              type="text"
              name="yourName"
              placeholder="Owner Name"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.yourName || ""}
              invalid={
                validation.touched.yourName && validation.errors.yourName
                  ? true
                  : false
              }
            />
            {validation.touched.yourName && validation.errors.yourName ? (
              <span className="text-red-500" type="invalid ">{validation.errors.yourName}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="Description"
              type="text"
              name="Description"
              placeholder="Enter The Description"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.Description || ""}
              invalid={
                validation.touched.Description && validation.errors.Description
                  ? true
                  : false
              }
            />
            {validation.touched.Description && validation.errors.Description ? (
              <span  className="text-red-500" type="invalid">{validation.errors.Description}</span>
            ) : null}
          </div>
          <div className="font text-gray-700">
            <FileInput
              label=" *Property Images"
              multiple={true}
              maxLength={5}
              accept=".png, .jpg, .jpeg,.pdf,.webp"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        {/* <div>
            <Input
              label="facilities"
              type="checkbox"
              name="facilities"
              placeholder="Enter The facilities"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.facilities || ""}
              invalid={
                validation.touched.facilities && validation.errors.facilities
                  ? true
                  : false
              }
            >
            {facilities.map((option, i) => (
                 <div value={option?.value} key={i}>
                   {option?.text}
                 </div>))}
            {validation.touched.facilities && validation.errors.facilities ? (
              <span   className="text-red-500"type="invalid">{validation.errors.facilities}</span>
            ) : null}
            </Input>
          </div> */}
         
         Facilities in Your Property: 
        <div className=" grid md:grid-cols-6 mb-4 font-semibold text-gray-900 dark:text-white">
           
        {facilities.map((items, i) => (

<ul className=" bg-gray-50 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
    key={i}>
    <li className="w-full  rounded-t-lg border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center pl-3">
            <input
             id="checkbox"  
             type="checkbox" 
             name="facilities"
             className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
             value={items?.value}
              onChange={handleFacilitiesChange}
          />
            <label for="vue-checkbox" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300" >{items?.text}</label>
        </div>
    </li>
</ul>
))}
</div>

        <div className="flex justify-around  mr-6 pt-10  ">
          <div>
            {" "}
            <div>
              {propertyregistrationSuccess && (
                <alert className="text-bold text-green-600">
                  {propertyregistrationSuccess}
                </alert>
              )}
              {propertyregistrationError && (
                <alert className="text-bold text-red-600">
                  {propertyregistrationError}
                </alert>
              )}
            </div>
          <div>{loading?(
          <button
            className="w-44 my-3 font bg-amber-700 hover:bg-amber-900 text-white font-light py-1 px-1 rounded mb-20"
            >
              Your Property Registering...
          </button>
          ):(
            <button
              type="submit"
              className="w-44 my-3 font bg-amber-700 hover:bg-amber-900 text-white font-light py-1 px-1 rounded mb-20"
            >
              Submit
            </button>
            )}</div>
            
          </div>

        </div>
      </form>

      <div className="pr-3 hidden  md:block col-span-2">
        {/* <img className="aspect-[2/3]" src={Image} /> */}
      </div>
    </div>
  );
};

export default RegisterProperty;
