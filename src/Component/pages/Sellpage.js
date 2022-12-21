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
  const [allcategory, setAllCategory] = useState([]);
  const [propertyPic, setPropertyPic] = useState([]);
  const [loading, setLoading] = useState(false)
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      regUser: currentUser?.userID,
      Seller: "",
      title: "",
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
      streetName: "",
      category: "",
    },
    validationSchema: Yup.object({
      Seller: Yup.string().required("Please Enter Your Seller"),
      title: Yup.string().required("Please Enter Your Title"),
      location: Yup.string().required("Please Enter location "),
      layoutName: Yup.string().required("Please Enter Your Area"),
      landArea: Yup.string().required("Please Enter Your Landmark"),
      facing: Yup.string().required("Please Select facing"),
      approachRoad: Yup.string().required("Please Enter approachRoad "),
      builtArea: Yup.string().required("Please Enter Your builtArea"),
      bedRoom: Yup.string().required("Please Enter Your bedRoom"),
      floorDetails: Yup.string().required("Please Enter Your floorDetails"),
       propertyStatus: Yup.string().required("Please Enter Your propertyStatus"),
      nearTown: Yup.string().required("Please Enter Your nearTown"),
      costSq: Yup.string().required("Please Enter Your costSq"),
      facilities: Yup.string().required("Please Enter Your facilities"),
      askPrice: Yup.number().required("Please Enter Your askPrice`number`"),
      Description: Yup.string().required("Please Enter Your Description"),
      streetName: Yup.string().required("Please Enter Your streetName"),
      category: Yup.string().required("Please Enter Your category"),
    }),
    onSubmit: (values, onSubmitProps) => {
      handlePropertyReg({
        Seller: values.Seller,
        title: values.title,
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
        category: values.category,
        streetName: values.streetName,
        regUser: currentUser?.userID,
        status: "pending",
      });
      onSubmitProps.resetForm();
      navigate('/payment')
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
    const allImages = [...target.files].map((f) => f);
    setPropertyPic(allImages);
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

  return (
    <div className="md:grid grid-cols-2 ml-5 p-1 font-serif font ">
      <form
        className="col-span-3 gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <h4 className="flex item-center justify-center font-semibold text-2xl pb-8 text-amber-700">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
</svg>


        Sale Property
        </h4>
        <div className="sm:grid grid-cols-4 gap-2 ">
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
            {validation.touched.Seller && validation.errors.Seller ? (
              <span className="text-amber-700" type="invalid ">{validation.errors.Seller}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="Title"
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
              <span  className="text-amber-700" type="invalid">{validation.errors.title}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="location"
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
              <span  className="text-amber-700"type="invalid">{validation.errors.location}</span>
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
              <span  className="text-amber-700" type="invalid">{validation.errors.location}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="Layout Name"
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
              <span  className="text-amber-700" type="invalid">{validation.errors.layoutName}</span>
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
              <span  className="text-amber-700" type="invalid">{validation.errors.landArea}</span>
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
              <span  className="text-amber-700" type="invalid">{validation.errors.facing}</span>
            ) : null}
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
              <span  className="text-amber-700" type="invalid">{validation.errors.approachRoad}</span>
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
              <span  className="text-amber-700" type="invalid">{validation.errors.builtArea}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="bed Room"
              type="number"
              name="bedRoom"
              placeholder="Enter The BedRoom"
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
              <span  className="text-amber-700" type="invalid">{validation.errors.bedRoom}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="floor Details"
              type="text"
              name="floorDetails"
              placeholder="Enter The FloorDetails"
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
              <span  className="text-amber-700" type="invalid">{validation.errors.floorDetails}</span>
            ) : null}
          </div>

          <div>
            <Input
              label="near Town"
              type="text"
              name="nearTown"
              placeholder="Enter The NearTown"
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
              <span  className="text-amber-700" type="invalid">{validation.errors.nearTown}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="cost Sq"
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
              <span  className="text-amber-700" type="invalid">{validation.errors.costSq}</span>
            ) : null}
          </div>
          <div>
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
              <span  className="text-amber-700" type="invalid">{validation.errors.facilities}</span>
            ) : null}
          </div>
          <div>
            <Input
              label="ask Price (INR)"
              type="number"
              name="askPrice"
              placeholder="Enter The Price"
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
              <span   className="text-amber-700"type="invalid">{validation.errors.askPrice}</span>
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
              <span  className="text-amber-700" type="invalid">{validation.errors.Description}</span>
            ) : null}
          </div>

          <div className="m-2 grid grid-rows-2 font gap-2">
            <div> Category</div>
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
              <option value=""> Select Category</option>
              {allcategory.map((option, id) => (
                <option value={option?._id} key={id}>
                  {option?.name}
                </option>
              ))}
            </select>
            {validation.touched.category && validation.errors.category ? (
              <span  className="text-amber-700" type="invalid">{validation.errors.category}</span>
            ) : null}
          </div>

          <div className="m-2 grid grid-rows-2 font gap-2">
            <div>Property Status</div>
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
              <span  className="text-amber-700" type="invalid">{validation.errors.propertyStatus}</span>
            ) : null}
          </div>
          <div className="font">
            <FileInput
              label="Property Images"
              multiple={true}
              maxLength={5}
              accept=".png, .jpg, .jpeg,.pdf,.webp"
              onChange={handleImageUpload}
            />
            
          </div>
        </div>
        <div className="flex justify-around   mr-6 pt-10  ">
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
