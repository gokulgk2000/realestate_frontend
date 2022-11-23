import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
//import Image from "../assets/images/home3.webp";
import FileInput from "../reusable/FileInput";
import Input from "../reusable/Input";
import * as Yup from "yup";
import {findCategory, PropertyRegistration } from "../helper/backend_helpers";



const RegisterProperty = () => {
  
  const [propertyregistrationError, setPropertyRegistrationError] =
    useState("");
  const [propertyregistrationSuccess, setPropertyRegistrationSuccess] =
    useState("");
   const[allcategory,setAllCategory]=useState([]);
  const [propertyPic, setPropertyPic] = useState([]);
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: currentUser?.email,
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
      Description: "",
      status: "",
      category:"" ,
    },
    validationSchema: Yup.object({
      Seller: Yup.string().required("Please Enter Your Seller"),
      location: Yup.string().required("Please Enter location "),
     // layoutName: Yup.string().required("Please Enter Your Area"),
      // landArea: Yup.string().required("Please Enter Your Landmark"),
      // facing: Yup.string().required("Please Enter Your City"),
      // approachRoad: Yup.string().required("Please Enter approachRoad "),
      // builtArea: Yup.string().required("Please Enter Your builtArea"),
      // bedRoom: Yup.string().required("Please Enter Your bedRoom"),
      // floorDetails: Yup.string().required("Please Enter Your floorDetails"),
      // propertyStatus: Yup.string().required("Please Enter Your propertyStatus"),
      // nearTown: Yup.string().required("Please Enter Your nearTown"),
      // costSq: Yup.string().required("Please Enter Your costSq"),
      // facilities: Yup.string().required("Please Enter Your facilities"),
      // askPrice: Yup.number().required("Please Enter Your askPrice`number`"),
      // Description: Yup.string().required("Please Enter Your Description"),
      category: Yup.string().required("Please Enter Your category"),
    }),
    onSubmit: (values, onSubmitProps) => {
      handlePropertyReg({
        Seller: values.Seller,
        location: values.location,
        layoutName: values.layoutName,
        landArea: values.landArea,
        facing: values.facing,
        approachRoad: values.approachRoad,
        builtArea: values.builtArea,
        bedRoom: values.bedRoom,
        floorDetails: values.floorDetails,
        propertyStatus: values.propertyStatus,
        nearTown: values.nearTown,
        costSq: values.costSq,
        facilities: values.facilities,
        askPrice: values.askPrice,
        Description: values.Description,
        category:values.category,
        userID: currentUser?.userID,
        propertyPic,
        status: "approved",
      });
      console.log("Data", values);
      onSubmitProps.resetForm();
    },
  });
  
 
 useEffect(()=>{

  const allcategory= async () => {  
  const res = await findCategory();
   setAllCategory(res.category) ;
  
   return res
   } 
   
  allcategory()}, []);


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
  const handleImageUpload = async (e) => {
    const target = e.target;
    const allImages = await Promise?.all(
      [...target.files].map(async (files) => {
        return await convertBase64(files);
      })
    );
    setPropertyPic(allImages);
    console.log("PropertyPic : ", propertyPic);
  };

  const handlePropertyReg = async (payload) => {
    const res = await PropertyRegistration(payload);
    if (res) {
      setPropertyRegistrationSuccess(res.msg);
      console.log("property", res);
      // localStorage.setItem("authUser", JSON.stringify(res));
    } else {
      setPropertyRegistrationError(res.msg);
    }
    console.log("reg value: ", res);
    console.log("pic", propertyPic);
  };

  return (
    <div className="md:grid grid-cols-5 ml-5 p-1 font-serif">
      <form
        className="col-span-3"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <h4 className="flex item-center justify-around font-bold text-2xl underline pb-3">
          Title:Independent House For Sale
        </h4>
        <div className="sm:grid grid-cols-2 gap-2">
          <div>
            <Input
              label="Seller"
              type="text"
              name="Seller"
              placeholder="Seller Name"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.Seller || ""}
              invalid={
                validation.touched.Seller && validation.errors.Seller
                  ? true
                  : false
              }
            />
            {validation.touched.Seller && validation.errors.lastname ? (
              <span type="invalid">{validation.errors.Seller}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="location"
              type="text"
              name="location"
              placeholder="enter the location"
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
              <span type="invalid">{validation.errors.location}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="layoutName"
              type="text"
              name="layoutName"
              placeholder="enter the layoutName"
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
              <span type="invalid">{validation.errors.layoutName}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="landArea"
              type="text"
              name="landArea"
              placeholder="enter the landArea"
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
              <span type="invalid">{validation.errors.landArea}</span>
            ) : null}
          </div>
          <div>
            {" "}
            <Input
              label="facing"
              type="text"
              name="facing"
              placeholder="enter the  facing"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.facing || ""}
              invalid={
                validation.touched.facing && validation.errors.facing
                  ? true
                  : false
              }
            />
            {validation.touched.facing && validation.errors.facing ? (
              <span type="invalid">{validation.errors.facing}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="approachRoad"
              type="text"
              name="approachRoad"
              placeholder="enter the approachRoad"
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
              <span type="invalid">{validation.errors.approachRoad}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="builtArea"
              type="text"
              name="builtArea"
              placeholder="enter the builtArea"
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
              <span type="invalid">{validation.errors.builtArea}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="bedRoom"
              type="text"
              name="bedRoom"
              placeholder="enter the bedRoom"
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
              <span type="invalid">{validation.errors.bedRoom}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="floorDetails"
              type="text"
              name="floorDetails"
              placeholder="enter the floorDetails"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.floorDetails || ""}
              invalid={
                validation.touched.floorDetails &&
                validation.errors.floorDetails
                  ? true
                  : false
              }
            />
            {validation.touched.floorDetails &&
            validation.errors.floorDetails ? (
              <span type="invalid">{validation.errors.floorDetails}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="propertyStatus"
              type="text"
              name="propertyStatus"
              placeholder="enter the propertyStatus"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.propertyStatus || ""}
              invalid={
                validation.touched.propertyStatus &&
                validation.errors.propertyStatus
                  ? true
                  : false
              }
            />
            {validation.touched.propertyStatus &&
            validation.errors.propertyStatus ? (
              <span type="invalid">{validation.errors.propertyStatus}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="nearTown"
              type="text"
              name="nearTown"
              placeholder="enter the nearTown"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.nearTown || ""}
              invalid={
                validation.touched.nearTown && validation.errors.nearTown
                  ? true
                  : false
              }
            />
            {validation.touched.nearTown && validation.errors.nearTown ? (
              <span type="invalid">{validation.errors.nearTown}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="costSq"
              type="number"
              name="costSq"
              placeholder="enter the costSq"
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
              <span type="invalid">{validation.errors.costSq}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="facilities"
              type="text"
              name="facilities"
              placeholder="enter the facilities"
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
              <span type="invalid">{validation.errors.facilities}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="askPrice"
              type="number"
              name="askPrice"
              placeholder="enter the askPrice"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.askPrice || ""}
              invalid={
                validation.touched.askPrice && validation.errors.askPrice
                  ? true
                  : false
              }
            />
            {validation.touched.askPrice && validation.errors.askPrice ? (
              <span type="invalid">{validation.errors.askPrice}</span>
            ) : null}
          </div>

          <div>
            <Input
              label="Description"
              type="text"
              name="Description"
              placeholder="enter the Description"
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
              <span type="invalid">{validation.errors.Description}</span>
            ) : null}
          </div>
       
          <div>
            <FileInput
              label="Property Images"
              multiple={true}
              accept=".png, .jpg, .jpeg,.pdf,.webp"
              onChange={handleImageUpload}
            />
          </div>
          
        </div> 
      <div>

      </div>
        <div> < select id='category' name="category"   label="category"  value={validation.values.category || ""} onChange={validation.handleChange}   invalid={
                validation.touched.category && validation.errors.category
                  ? true
                  : false
              }>  

            {allcategory.map((option,id) => (
              <option value={option?._id} key={id} >{option?.name}</option>
            ))}
    
</select>
{validation.touched.category && validation.errors.category ? (
              <span type="invalid">{validation.errors.category}</span>
            ) : null}
</div>

        <div className="flex justify-around  mr-6 pt-10  ">
          <button
            type="submit"
            className="bg-blue-400 w-44 hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded mb-20"
          >
            Submit
          </button>
        </div>
      </form>
      {propertyregistrationSuccess && (
            <alert className="text-bold text-green-500">
              {propertyregistrationSuccess}
            </alert>
          )}
          {propertyregistrationError && (
            <alert className="text-bold text-red-500">
              {propertyregistrationError}
            </alert>
          )}
      <div className="pr-3 hidden  md:block col-span-2">
      {/* <img className="aspect-[2/3]" src={Image} /> */}
      </div>
    </div>
  );
};

export default RegisterProperty;
