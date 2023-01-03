import React, { useEffect, useState } from "react";
import {
  buyerReg,
  getInterest,
  getinterestbyId,
  getProById,
  getPropertyById,
  getUnInterest,
  IntrestedByPropertyId,
} from "../helper/backend_helpers";
import { SERVER_URL } from "../helper/configuration";
import { mobile, monitor, pc, tab } from "../helper/constatnt/ScreenSize";
import useMediaQuery from "../helper/hook/useMediaQuery";
import { useModal } from "../helper/hook/useModal";
import { useQuery } from "../helper/hook/useQuery";
import BuyerModal from "../models/BuyerModal";
import * as Yup from "yup";
import { useFormik } from "formik";
import toastr from "toastr";
import moment from "moment";
import GalleryModel from "../models/GalleryModel";
import { useUser } from "./contextProvider/UserProvider";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@material-tailwind/react";
const Detailspage = () => {
  const { currentUser, setCurrentUser } = useUser();
  const query = useQuery();
  const [loading, setLoading] = useState(true);
  const [property, setproperty] = useState({});
  const [curentImage, setcurentImage] = useState(0);
  const [propertyId, setPropertyId] = useState([]);
  const [BuyerRegistrationSuccess, setBuyerRegistrationSuccess] = useState("");
  const [BuyerRegistrationError, setBuyerRegistrationError] = useState("");
  const [interestProperty, setInterestProperty] = useState([]);
  const [uninterestProperty, setUnInterestProperty] = useState([]);
  const [interesterror, setInterestError] = useState([]);
  const [modalOpen, setModalOpen] = useModal();
  const [modalOpen1, setModalOpen1, toggleModal1] = useModal(false);
  const [interest, setInterest] = useState([]);
  const [InterestSuccess, setInterestSuccess] = useState();


  // const validation = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  //     name: "",
  //     email: "",
  //     phonenumber: "",
  //     propertyId: "",
  //   },
  //   validationSchema: Yup.object({
  //     name: Yup.string().required(" Enter Your Name"),
  //     email: Yup.string().required(" Enter Your Email"),
  //     phonenumber: Yup.string().required(" Enter Your phonenumber"),
  //   }),
  //   onSubmit: (values, onSubmitProps) => {
  //   console.log("buyer",values)

  //     handlebuyerReg({
  //       name: values.name,
  //       email: values.email,
  //       phonenumber: values.phonenumber,
  //       propertyId: property?._id,
  //     });
  //     onSubmitProps.resetForm();
  //   },
  // });

  // const handlebuyerReg = async () => {
  //   const payload = {

  //   }
  //   const res = await buyerReg (payload);

  //   if (res.success) {
  //     setBuyerRegistrationSuccess(res.msg);
  //     console.log("buyer",res)
  //     toastr.success(`Buyer has been Registration successfully`, "Success");
  //   } else {
  //     setBuyerRegistrationError(res.msg);
  //   }
  // };
  // const intrestedProperty =async()=>{
  //   const res = await IntrestedByPropertyId({
  //     regUser: currentUser?.userID,
  //     propertyId: query.get("uid") });

  //     if (res.success) {
  //       setproperty(res?.Intrested);

  //       console.log("data", res);
  //     } else {
  //       console.log("Error while fetching property");
  //     }
  //   };

  const propertyPicLength = property?.propertyPic?.length;
  const propertyDetails = async () => {
    const res = await getPropertyById({ propertyId: query.get("uid") });

    if (res.success) {
      setproperty(res?.property);
      // console.log("data", res);
    } else {
      console.log("Error while fetching property");
    }
  };
  const nextImageOnClick = () => {
    if (curentImage < propertyPicLength - 1) {
      setcurentImage(curentImage + 1);
    } else setcurentImage(0);
  };

  const prevImageOnClick = () => {
    if (curentImage > 0) {
      setcurentImage((prev) => prev - 1);
    } else setcurentImage(propertyPicLength - 1);
  };

  useEffect(() => {
    const handleProperty = async () => {
      setLoading(true);
      await propertyDetails();
      setLoading(false);
    };
    handleProperty();
  }, []);
  const handleBook = async (proId) => {
    const payload = {
      propertyId: proId,
    };
    const res = await getProById(payload);
    if (res.success) {
      setPropertyId(res.Property);
    } else {
      console.log("Failed to fetch message", res);
    }
  };


  const handleFetchInterested = async () => {
    const payload = {
      userID: currentUser?.userID,
    };
    const res = await getinterestbyId(payload);
    if (res.success) {
      setInterest(res?.Intrested);
      setInterestSuccess(res.msg);
    } else {
      setInterestError(res.msg);
    }console.log(res,"gokul")
  };

  const interested = async () => {
    const payload = {
      propertyId: property?._id,
      regUser: currentUser?.userID,
    };
    const res = await getInterest(payload);
    if (res) {
      handleFetchInterested()
      toastr.success(`Your Interest Property Added  successfully`, "Success");
    } else {
      setInterestError(res.msg);
    }
    
  };
 
  const getunInterest = async () => {
    const payload = {
      userID: interest[0]?._id,
    };
    const res = await getUnInterest(payload);
    if (res.success) {
     await handleFetchInterested()
     toastr.success(`Your UnInterest Property Remove  successfully`, "Success");

    } else {
    }
  };

  useEffect(() => {

    handleFetchInterested();
  }, []);
  const found = interest?.find((i) => i?.propertyId?._id === property?._id);
  console.log("found : ", interest,found);
  return (
    <>
      {loading ? (
        <div className="flex justify-center py-5  "> Loading...</div>
      ) : (
        <div>
          {modalOpen && (
            <BuyerModal
              show={modalOpen}
              onCloseClick={() => setModalOpen(false)}
              currentProperty={propertyId?._id}
            />
          )}{" "}
          {modalOpen1 && (
            <GalleryModel
              show={modalOpen1}
              onCloseClick={() => setModalOpen1(false)}
            />
          )}
          <div className="bg-slate-100 md:pl-32 md:pr-24">
            <Breadcrumbs>
              <Link to="/">
                <button className="opacity-60 font underline">Home</button>
              </Link>
            </Breadcrumbs>
            <div className="flex justify-end pt-2 md:px-0 sm:px-0 lg:px-28">
              <div className=" font-normal text-xs">
                Posted on:{moment(property?.date).format("DD-MM-YYYY")}
              </div>
            </div>
            <div className="px- pt- pb-10 s">
              <div className="md:grid md:grid-cols-8 gap-2 gap-y-2">
                <div className="md:col-span-6 border-3 border-black">
                  <div className="md:grid shadow-2xl rounded-md bg-white p-7">
                    <div className="flex justify-end">
                      {!found ? (
                        <button
                          onClick={interested}
                          className="border-2 rounded-md border-amber-800 hover:text-white  px-2 font text-amber-800 py-2 shadow-xl   hover:bg-yellow-900 hover:shadow-md"
                        >
                          Interested
                        </button>
                      ) : (
                        <button
                          onClick={getunInterest}
                          className="border-2 rounded-md border-amber-800 hover:text-white  px-2 font text-amber-800 py-2 shadow-xl   hover:bg-yellow-900 hover:shadow-md"
                        >
                          UnInterested
                        </button>
                      )}
                    </div>
                    <div className="flex font font-semibold pl-  text-xl">
                      ₹. {property?.negotiablePrice}
                    </div>

                    <div className="md:flex grid  pl- ">
                      <span className="font text-lg capitalize md:pl- underline">
                        {property?.location},{property?.streetName},
                      </span>{" "}
                      <span className="text-md pt-1 font text-gray-600 capitalize ">
                        {property?.title} {property?.bedRoom}BHK For sale{" "}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-5 gap-x- pt-3 ">
                      <div className="col-span-2 ">
                        <div className="grid gap-y-1 p-">
                          <div className="grid">
                            <div className="absolute">
                              <div className="flex pl-2 pt-2 text-white font">
                                <svg
                                  viewBox="0 0 122.88 91.24 "
                                  className="h-5 w-5 bg-slate-200"
                                >
                                  <path d="M6.23,0H116.7c1.72,0,3.25,0.7,4.37,1.81c1.11,1.11,1.81,2.69,1.81,4.37v78.88c0,1.72-0.7,3.25-1.81,4.37 c-0.09,0.09-0.19,0.19-0.33,0.28c-1.07,0.98-2.51,1.53-4.09,1.53H6.18c-1.72,0-3.25-0.7-4.37-1.81C0.7,88.32,0,86.74,0,85.06V6.18 c0-1.72,0.7-3.25,1.81-4.37S4.51,0,6.18,0L6.23,0L6.23,0L6.23,0z M31.74,21.42c4.9,0,8.87,3.97,8.87,8.86 c0,4.9-3.97,8.87-8.87,8.87s-8.87-3.97-8.87-8.87C22.87,25.39,26.84,21.42,31.74,21.42L31.74,21.42L31.74,21.42z M69.05,59.46 l17.73-30.66l18.84,47.65l-87.92,0v-5.91l7.39-0.37l7.39-18.1l3.69,12.93h11.08l9.6-24.75L69.05,59.46L69.05,59.46L69.05,59.46z M115.54,7.34H7.39v76.51h108.15L115.54,7.34L115.54,7.34L115.54,7.34z" />
                                </svg>
                                <p>{property?.propertyPic?.length}Photos </p>
                              </div>{" "}
                            </div>

                            <img
                              className=" aspect-[3/2]  md:h-72 rounded-tr-md rounded-tl-md"
                              src={`${SERVER_URL}/file/${property?.propertyPic[curentImage]?.id}`}
                            />
                          </div>
                          <div className="grid grid-cols-4 gap-x-2 gap-y-2 md:pr">
                            {" "}
                            <div className="col-span-3 gap-x-2 grid grid-cols-3">
                              {" "}
                              {property?.propertyPic?.length > 0 &&
                                property?.propertyPic
                                  ?.slice(0, 3)
                                  .map((image, j) => {
                                    if (property?.propertyPic.length > 4) {
                                      return (
                                        <button
                                          key={j}
                                          onClick={() => setcurentImage(j)}
                                        >
                                          <div className="">
                                            <img
                                              src={`${SERVER_URL}/file/${image.id}`}
                                              className="aspect-[3/2] h-20  rounded-bl-md rounded-br-md"
                                              onClick={() => setcurentImage(j)}
                                            />
                                          </div>
                                        </button>
                                      );
                                    } else {
                                      return (
                                        <button key={j}>
                                          <div className="">
                                            <img
                                              src={`${SERVER_URL}/file/${image.id}`}
                                              className="aspect-[3/2] h-20  rounded-md"
                                              onClick={() => setcurentImage(j)}
                                            />
                                          </div>
                                        </button>
                                      );
                                    }
                                  })}
                            </div>{" "}
                            {property?.propertyPic?.length >= 3 && (
                              <div
                                className="  "
                                onClick={() => setModalOpen1(true)}
                              >
                                <div
                                  className="text-white md:text-base font-medium text-sm  flex justify-end cursor-pointer
                                "
                                >
                                  <div className="absolute pr-1 ">
                                    <div className="md:pl-7 pl-5 pt-2">
                                      <svg
                                        viewBox="0 0 122.88 91.24 "
                                        className="h-5 w-5 bg-slate-200"
                                      >
                                        <path d="M6.23,0H116.7c1.72,0,3.25,0.7,4.37,1.81c1.11,1.11,1.81,2.69,1.81,4.37v78.88c0,1.72-0.7,3.25-1.81,4.37 c-0.09,0.09-0.19,0.19-0.33,0.28c-1.07,0.98-2.51,1.53-4.09,1.53H6.18c-1.72,0-3.25-0.7-4.37-1.81C0.7,88.32,0,86.74,0,85.06V6.18 c0-1.72,0.7-3.25,1.81-4.37S4.51,0,6.18,0L6.23,0L6.23,0L6.23,0z M31.74,21.42c4.9,0,8.87,3.97,8.87,8.86 c0,4.9-3.97,8.87-8.87,8.87s-8.87-3.97-8.87-8.87C22.87,25.39,26.84,21.42,31.74,21.42L31.74,21.42L31.74,21.42z M69.05,59.46 l17.73-30.66l18.84,47.65l-87.92,0v-5.91l7.39-0.37l7.39-18.1l3.69,12.93h11.08l9.6-24.75L69.05,59.46L69.05,59.46L69.05,59.46z M115.54,7.34H7.39v76.51h108.15L115.54,7.34L115.54,7.34L115.54,7.34z" />
                                      </svg>
                                    </div>
                                    + {property?.propertyPic?.length}Photos{" "}
                                  </div>
                                  <img
                                    className=" aspect-[3/2] h-20 rounded-bl-md  rounded-br-md"
                                    src={`${SERVER_URL}/file/${property?.propertyPic[3]?.id}`}
                                  />
                                </div>
                              </div>
                            )}{" "}
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-3 grid md:pl-5">
                        {(property?.category?.name === "residential" ||
                          property?.category?.name === "villa" ||
                          property?.category?.name === "appartment") && (
                          <div className="flex bg-slate-200 rounded-md justify-start h-10 pl-2 ">
                            <div className="pt-2 ">
                              <span className="flex ">
                                {" "}
                                <svg
                                  viewBox="0 0 122.88 121.47"
                                  className="w-6 h-6 text-white"
                                >
                                  <path d="M10.76,95.77l101.36,0.02l-11.52-45.63H22.25L10.76,95.77L10.76,95.77z M3.4,100.88l116.08,0.03l-18.18-70.24h-4.35v4.98 l1.93,7.66l-74.84-0.22l1.96-7.77v-4.65h-4.44L3.4,100.88L3.4,100.88z M64.57,34.09v-3.42h-6.21v3.42H64.57L64.57,34.09z M96.94,27.85h4.05l0.07-25.1H21.19l0.67,25.1h4.14v-8.44c0-0.64,0.26-1.23,0.68-1.65c0.42-0.42,1.01-0.68,1.65-0.68h27.7 c0.64,0,1.23,0.26,1.65,0.68c0.42,0.42,0.68,1.01,0.68,1.65v8.44h6.21v-7.97c0-0.64,0.26-1.23,0.68-1.65 c0.42-0.42,1.01-0.68,1.65-0.68h27.7c0.64,0,1.23,0.26,1.65,0.68c0.42,0.42,0.68,1.01,0.68,1.65V27.85L96.94,27.85z M94.06,20.44 h-26.6v16.08h26.6V20.44L94.06,20.44z M55.48,19.97h-26.6v16.55h26.6V19.97L55.48,19.97z M20.58,0h81.08l0,0.01 c0.59,0,1.13,0.24,1.51,0.63h0.01c0.39,0.39,0.63,0.93,0.63,1.52l-0.01,0l-0.08,26.96l18.85,72.83c0.01,0.05,0.02,0.11,0.03,0.17 l0,0l0,0.01l0,0.01l0,0.01l0,0.01c0.01,0.05,0.01,0.1,0.01,0.15l0.25,17.67l0.01,0.14c0,0.76-0.62,1.38-1.38,1.38H1.37v-0.01H1.36 c-0.76-0.01-1.36-0.63-1.36-1.39l0.25-17.8c0-0.06,0.01-0.12,0.01-0.18c0.01-0.06,0.02-0.12,0.03-0.18l18.84-72.86l0.01-0.05 c-0.24-8.87-0.71-18.04-0.71-26.88h-0.01c0-0.59,0.24-1.12,0.63-1.5c0.38-0.37,0.9-0.61,1.47-0.63L20.58,0L20.58,0L20.58,0z M2.97,103.63l-0.21,15.09h117.35l-0.21-15.06L2.97,103.63L2.97,103.63z" />
                                </svg>
                                <span className="font pl-2">
                                  {property?.bedRoom}{" "}
                                </span>
                                <span className="font text-gray-500">Beds</span>
                              </span>
                            </div>
                            <div className="pt- pl-5 text-2xl">|</div>
                            <div className="pt-2 pl-5 ">
                              <span className="flex ">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg "
                                  className="h-6 w-6"
                                  viewBox="0 0 64 64"
                                >
                                  <path d="M14.918 15.925c-.469.261-.635.852-.373 1.319l2.445 4.371c.176.317.506.496.846.496.16 0 .322-.04.473-.124.467-.261.635-.853.373-1.32l-2.445-4.371C15.975 15.83 15.387 15.663 14.918 15.925zM17.541 14.008c-.424.325-.506.933-.182 1.359l3.035 3.982c.191.25.48.381.773.381.203 0 .41-.065.586-.198.426-.325.508-.933.184-1.359L18.9 14.191C18.576 13.766 17.969 13.683 17.541 14.008zM24.27 17.386c.238 0 .475-.086.662-.26.391-.365.412-.979.047-1.371l-3.414-3.663c-.365-.392-.98-.413-1.371-.048-.393.365-.414.979-.049 1.371l3.416 3.663C23.752 17.283 24.01 17.386 24.27 17.386zM63.031 1.236H.971C.438 1.236 0 1.673 0 2.206s.438.97.971.97h33.648v2.454h1.939V3.176h2.23v2.454h1.939V3.176h2.23v2.454h1.938V3.176h2.23v2.454h1.939V3.176h2.24v2.454h1.939V3.176h1.9v2.454h1.939V3.176h5.945c.533 0 .969-.437.969-.97S63.564 1.236 63.031 1.236zM36.762 48.364c-.049-.155-.068-.32-.039-.475C36.693 48.043 36.703 48.208 36.762 48.364zM36.869 47.21V7.568h-1.184-.193-1.184V47.21c0 .698.572 1.28 1.279 1.28.533 0 .99-.33 1.184-.785C36.83 47.549 36.869 47.384 36.869 47.21z" />
                                  <path d="M32.369 36.669H6.943V35.7v-.97-1.816h2.346c.535 0 .969-.434.969-.97 0-.535-.434-.969-.969-.969H6.943v-16.24c0-.029-.145-2.541 1.348-4.219.572-.64 1.318-1.096 2.24-1.348-.311 1.707.301 3.666 1.756 5.13.193.194.436.281.688.281s.494-.087.689-.281l5.449-5.45c.379-.378.379-.989 0-1.367-2.201-2.201-5.518-2.463-7.398-.582-.039.039-.078.078-.107.116C9.59 7.19 7.98 7.937 6.836 9.236c-2.045 2.308-1.832 5.499-1.832 5.566v16.173H2.723c-.535 0-.969.434-.969.969 0 .536.434.97.969.97h2.281v1.816.97.969H2.725c-.436 0-.785.349-.785.786 0 .427.359.786.785.786h29.645V36.669zM40.912 47.782c.02-.048.039-.087.059-.136.049-.136.076-.291.076-.436V7.568h-1.191H39.66h-.852V47.21c0 .262-.029.504-.088.747.039.058.078.106.135.165.242.243.563.378.902.378C40.252 48.5 40.689 48.218 40.912 47.782zM45.111 47.705c0-.01.01-.02.02-.039.047-.136.076-.301.076-.456V7.568h-1.182H43.83h-.844V47.21c0 .252-.027.514-.096.756.039.048.076.106.125.155.252.243.572.378.912.378C44.441 48.5 44.916 48.189 45.111 47.705zM49.281 47.714c.01-.039.027-.068.037-.106.049-.126.068-.262.068-.397V7.568h-1.191H48h-.854V47.21c0 .252-.029.504-.086.747.037.058.086.116.135.165.242.243.563.378.902.378C48.631 48.5 49.086 48.17 49.281 47.714zM52.18 7.568h-.854V47.21c0 .262-.029.504-.096.747.037.058.076.106.135.165.193.185.416.301.66.349.02 0 .029.01.047.01.02 0 .039.01.059 0 .059.01.098.02.146.02.436 0 .834-.223 1.076-.592 0-.01.01-.019.02-.029.115-.204.184-.427.184-.669V7.568h-1.184H52.18zM56.02 7.568h-.523V47.21c0 .349-.059.688-.164 1.008.223.184.494.281.785.281.707 0 1.279-.582 1.279-1.29V7.568h-1.184H56.02zM13.859 58.741l-1.01-.043v2.418c0 .909.734 1.648 1.639 1.648h.543c.902 0 1.639-.74 1.639-1.648v-2.356h-2.182C14.289 58.759 14.088 58.75 13.859 58.741zM40.859 58.742c-.199.008-.398.017-.598.017H38.08v2.356c0 .909.73 1.648 1.629 1.648h.553c.904 0 1.639-.74 1.639-1.648v-1.406l-.031-1.011L40.859 58.742z" />
                                  <path
                                    d="M48.098,50.439c-0.766,0-1.504-0.271-2.086-0.776c-0.563,0.495-1.299,0.776-2.084,0.776c-0.775,0-1.504-0.271-2.084-0.776
		c-0.563,0.495-1.301,0.776-2.086,0.776s-1.512-0.271-2.084-0.776c-0.563,0.475-1.291,0.766-2.086,0.766
		c-1.773,0-3.219-1.445-3.219-3.219v-7.03H3.695v7.787c0,5.353,3.994,9.949,9.289,10.686c0.02,0,0.039,0.01,0.059,0.01
		c0.494,0.058,0.969,0.097,1.445,0.097h25.773c0.514,0,1.02-0.039,1.494-0.116c4.576-0.63,8.203-4.092,9.086-8.543
		c-0.232-0.117-0.445-0.262-0.65-0.437C49.629,50.148,48.893,50.439,48.098,50.439z"
                                  />
                                </svg>
                                <span className="font  pl-2">
                                  {property?.bathRoom}{" "}
                                </span>
                                <span className="font text-gray-500">
                                  Baths
                                </span>
                              </span>
                            </div>{" "}
                          </div>
                        )}
                        <div className="grid md:grid-cols-3 grid-cols-2 gap-x-5 md:gap-y-7 gap-y-3 md:px-3 pt-5 ">
                          <div className="">
                            {" "}
                            <div className="font text-gray-500 pb-1">
                              Property Type
                              <div className="text-black font capitalize">
                                {property?.category?.name}{" "}
                              </div>
                            </div>
                          </div>
                          {property?.category?.name !== "land" && (
                            <div className="">
                              <div className="font text-gray-500 capitalize pb-1">
                                Facing
                                <div className="text-black font">
                                  {property?.facing}
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="">
                            <div className="font text-gray-500 capitalize pb-1">
                              Transaction Type{" "}
                              <div className="text-black font">
                                {property?.transactionType}
                              </div>
                            </div>
                          </div>

                          <div className="">
                            {" "}
                            <div className="font text-gray-500 pb-1">
                              Area
                              <div className="text-black font">
                                {property?.builtArea}sft{" "}
                                <div className="font text-gray-500 ">
                                  {" "}
                                  ₹.{property?.costSq}/sft
                                </div>
                              </div>
                            </div>
                          </div>
                          {property?.category?.name !== "land" && (
                            <div className="">
                              {" "}
                              <div className="font text-gray-500 pb-1">
                                Property Status
                                <div className="text-black font">
                                  {property?.propertyStatus}
                                </div>
                              </div>
                            </div>
                          )}
                          {property?.category?.name !== "land" && (
                            <div className="">
                              <div className="font text-gray-500 pb-1">
                                Floor Details
                                <div className="text-black font">
                                  {property?.floorDetails}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-5">
                          <hr />
                        </div>
                        <div className="grid capitalize pl-3 py-2 ">
                          <div className="font text-gray-500 py-3 flex ">
                            <span className="pr-1">
                              <svg
                                viewBox="0 0 122.88 88.271"
                                className="h-5 w-5 "
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M9.875,88.254V50.518c-2.007,0.772-3.885,0.789-5.446,0.258 c-1.218-0.412-2.248-1.149-3.002-2.102c-0.755-0.952-1.235-2.11-1.382-3.388c-0.223-1.981,0.37-4.22,2.059-6.321l0,0 c0.085-0.102,0.18-0.206,0.292-0.292l48.937-38.2c0.634-0.583,1.613-0.643,2.316-0.095l31.206,24.26 c-4.841,1.931-8.933,5.271-11.216,10.025c-9.076-7.286-18.856-15.006-20.762-16.488c-3.936,2.994-38.2,29.375-38.2,30.49v39.606 L9.875,88.254L9.875,88.254L9.875,88.254z M60.608,53.825c-0.646,0.352-1.451,0.114-1.798-0.527 c-0.352-0.647-0.114-1.453,0.532-1.8c3.053-1.656,4.475-3.798,4.76-5.892c0.152-1.119-0.021-2.243-0.44-3.283 c-0.431-1.053-1.111-2.011-1.973-2.783c-1.678-1.499-4.033-2.29-6.491-1.677c-0.998,0.247-1.859,0.745-2.615,1.448 c-0.802,0.746-1.495,1.722-2.102,2.874c-0.343,0.651-1.145,0.899-1.79,0.56c-0.651-0.343-0.898-1.145-0.56-1.79 c0.745-1.414,1.617-2.627,2.648-3.59c1.08-1.002,2.333-1.722,3.789-2.081c3.382-0.837,6.603,0.23,8.892,2.276 c1.163,1.041,2.087,2.337,2.667,3.768c0.585,1.445,0.824,3.03,0.604,4.639C66.336,48.836,64.499,51.714,60.608,53.825 L60.608,53.825L60.608,53.825z M50.438,64.306c-5.028-6.755-5.151-13.154,0.955-19.103l-4.397-2.428 c-3.521-1.37-9.98,8.726-7.483,11.424l3.425,5.081l-0.706,1.474c-0.195,0.438-0.004,0.745,0.473,0.958l0.464,0.126l-8.91,17.633 l1.804,3.846l3.608-1.063l0.928-1.804l-0.889-1.666l1.959-0.419l0.456-0.886L41.1,75.92l0.671-1.305l1.956-0.247l0.637-1.236 l-1.093-1.426l0.699-1.354l1.994-0.325l2.715-5.18l0.46,0.25C49.935,65.585,50.346,65.271,50.438,64.306L50.438,64.306 L50.438,64.306z M59.902,68.54l-1.327,4.952l-1.842,0.729l-0.386,1.443l1.344,1.14l-0.351,1.313l-1.821,0.643l-0.373,1.388 l1.305,1.278l-0.251,0.941l-1.791,0.811l1.197,1.408l-0.517,1.921l-3.229,1.765l-2.524-3.308l4.813-17.962l-1.166-0.313 c-0.239-0.063-0.386-0.312-0.321-0.555l0.489-1.824c-3.528-2.676-5.276-7.306-4.063-11.845c1.56-5.832,7.449-9.353,13.284-8.042 c0.027,0.313,0.022,0.628-0.021,0.945c-0.108,0.789-0.452,1.601-1.084,2.384c-0.085,0.104-0.177,0.213-0.273,0.317 c-1.864-0.121-3.611,1.083-4.114,2.957c-0.217,0.807-0.168,1.621,0.086,2.354c0.061,0.26,0.161,0.511,0.292,0.759 c0.307,0.563,0.759,0.991,1.287,1.266c0.347,0.23,0.737,0.402,1.158,0.521c2.094,0.559,4.24-0.646,4.864-2.705 c0.633-0.56,1.184-1.15,1.656-1.757c0.919-1.184,1.547-2.441,1.92-3.719c2.532,2.73,3.646,6.663,2.611,10.53 c-1.216,4.539-5.052,7.678-9.44,8.229l-0.489,1.824c-0.065,0.238-0.313,0.386-0.556,0.321L59.902,68.54L59.902,68.54L59.902,68.54z M64.499,88.267v-7.192c4.989-2.219,20.265-6.443,20.982-12.549c0.162-1.378-3.088-6.634-3.834-9.151 c-1.598-2.542-2.167-6.58-0.424-9.266c0.693-1.069,0.399-4.96,0.399-6.428c0-14.62,25.62-14.625,25.62,0 c0,1.848-0.428,5.246,0.579,6.7c1.683,2.433,0.813,6.742-0.603,8.994c-0.908,2.646-4.362,7.654-4.068,9.151 c1.098,5.578,15.267,9.327,19.729,11.309v8.429L64.499,88.267L64.499,88.267z M80.417,3.046l14.726,0.601v19.142 c-0.236-0.007-0.473-0.01-0.708-0.01L94,22.783l-13.583-8.965V3.046L80.417,3.046L80.417,3.046L80.417,3.046z"
                                />
                              </svg>
                            </span>
                            {property?.Seller}-
                            <span className="text-black font">
                              {property?.yourName}
                            </span>
                          </div>

                          <div className="font text-gray-500 py-3 flex ">
                            <span className="pr-1">
                              <svg
                                viewBox="0 0 512 498.69"
                                className="h-5 w-5 "
                              >
                                <path
                                  fill-rule="nonzero"
                                  d="M36.73 167.38c-.16-2.77.23-5.62 1.26-8.39 17.9-47.75 49.7-87.54 89.82-115.34C167.89 15.87 216.21 0 267.22 0c67.59 0 128.79 27.41 173.08 71.7 44.29 44.29 71.7 105.49 71.7 173.08 0 59.87-21.61 114.81-57.47 157.43-36.4 43.27-87.48 73.76-145.52 83.76-5.45.93-10.77-.37-15.02-3.25 6-11.45 9.57-24.65 9.41-37.66 47.75-8.56 89.72-33.74 119.66-69.33 29.7-35.32 47.61-81 47.61-130.95 0-56.18-22.78-107.05-59.59-143.86-36.81-36.81-87.68-59.59-143.86-59.59-42.53 0-82.74 13.17-116 36.22-31.13 21.57-56.22 51.79-71.51 87.93-14.23-2.28-29.04-1.95-42.98 1.9zm172.96 63.33v81.06h12.66c4.51 0 7.6-.55 9.26-1.64 1.67-1.1 2.5-3.6 2.5-7.52v-71.9h35.64v60.67c0 9.79-.65 17.68-1.96 23.67-1.31 5.99-3.74 11.06-7.31 15.21-3.56 4.15-8.43 7.03-14.61 8.64-6.18 1.61-14.2 2.42-24.06 2.42s-17.85-.81-23.97-2.42c-6.11-1.61-10.96-4.49-14.52-8.64-3.56-4.15-6-9.22-7.31-15.21-1.3-5.99-1.96-13.88-1.96-23.67v-60.67h35.64zm77.44 106.12 4.99-28.52c10.92 2.65 20.76 3.98 29.49 3.98 8.73 0 15.77-.35 21.12-1.04v-8.64l-16.04-1.38c-14.5-1.27-24.45-4.64-29.85-10.11-5.41-5.48-8.11-13.57-8.11-24.29 0-14.74 3.3-24.88 9.89-30.41 6.59-5.53 17.79-8.3 33.59-8.3 15.8 0 30.06 1.44 42.77 4.32l-4.45 27.65c-11.05-1.72-19.9-2.59-26.56-2.59-6.65 0-12.29.29-16.93.87v8.46l12.84 1.21c15.56 1.5 26.31 5.1 32.25 10.8 5.94 5.71 8.91 13.63 8.91 23.77 0 7.26-1.01 13.39-3.03 18.4-2.02 5.02-4.42 8.82-7.22 11.41-2.79 2.59-6.74 4.58-11.85 5.96-5.11 1.39-9.59 2.22-13.45 2.51-3.86.29-9 .43-15.42.43-15.44 0-29.76-1.5-42.94-4.49zm-69.39-157.22 1.5 16.79c-4.2 1.74-9.46 2.61-15.8 2.61-6.33 0-11.41-.67-15.25-2.01-3.83-1.33-6.85-3.42-9.05-6.29-2.19-2.87-3.73-6.24-4.6-10.1-.86-3.87-1.3-8.64-1.3-14.3 0-5.67.44-10.45 1.3-14.35.87-3.9 2.41-7.28 4.6-10.15 4.27-5.53 12.1-8.3 23.5-8.3 2.53 0 5.52.25 8.95.75 3.44.5 5.98 1.12 7.65 1.85l-3 15.3c-4.33-.93-8.3-1.4-11.9-1.4-3.6 0-6.1.33-7.5 1-1.4.67-2.1 2-2.1 4v26.2c2.6.53 5.24.8 7.9.8 5.67 0 10.7-.8 15.1-2.4zm26.4 17.9h-21.1l16.2-62.5h30.9l16.19 62.5h-21.09l-2.3-9.9h-16.5l-2.3 9.9zm8.02-43.3-3.7 17.5h12.36l-3.61-17.5h-5.05zm80.97 43.3h-39.99v-62.5h19.99v46.5h20v16zm48.5 0h-40v-62.5h20v46.5h20v16zM75.95 321.96c7.32 16.75 16.05 33.02 27.72 48.37 12.68 16.73 29 32.47 50.82 46.77 4.13 2.62 8.68-.75 11.91-3.35 1.89-1.53 4.31-4.02 6.88-6.77 10.14-10.72 22.7-24.01 37.43-15.08.32.19.57.41.89.6l48.52 35.39c.15.1.31.3.46.4 6.32 5.43 8.34 12.99 7.52 21.18-2.24 20.63-18.43 37.82-37.64 44.14-10.12 3.38-21.11 4.61-31.59 5-16.45.63-31.46-2.54-46.45-9-14.66-6.35-29.09-15.75-44.66-27.88l-1.15-.92c-7.15-5.61-14.86-11.63-22.31-18.54-27.3-25.68-54.03-61.36-69.87-99.14-13.29-31.71-18.8-65-10.52-95.25 4.57-16.58 13.48-31.15 27.2-39.91 11.97-7.68 27.32-10.92 46.32-7.13 2.19.4 4.02 1.9 4.84 3.9l27.07 59.7c4.17 6.82 4.1 13.11.77 19.07-2.76 4.88-7.71 9.09-14.25 12.84-1.95 1.33-4.25 2.64-6.65 4.03-5.93 3.39-12.47 7.17-14.61 12.02-1.72 3.89-.2 6.01 1.35 9.56z"
                                />
                              </svg>
                            </span>
                            Contact-
                            <span className="text-black font">
                              {property?.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="md:col-span-2 lg:    ">
                  <div className="grid  border-gray-600 px-7 md:px-0 md:py-0 py-2 ">
                    <div class="w-80 bg-white  shadow-2xl  rounded  animate- hover:animate-none  cursor-pointer hidden md:block">
                      <p className="font flex justify-center pt-5 text-lg underline">
                        {" "}
                        Contact Owner
                      </p>
                      <div class="h-72 w-full checker-bg flex items-center justify-center p-4 text-blue-500">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {" "}
                          <div class="relative z-0 mb-6 w-full group">
                            <input
                              type="name"
                              name="name"
                              id="floating_name"
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer"
                              placeholder=" "
                            />
                            <label
                              for="floating_name"
                              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Name
                            </label>{" "}
                          </div>
                          <div class="relative z-0 mb-6 w-full group ">
                            <input
                              type="email"
                              name="email"
                              id="floating_email"
                              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer"
                              placeholder=" "
                            />
                            <label
                              for="floating_email"
                              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Email address
                            </label>{" "}
                          </div>
                          <div class="relative z-0 mb-6 w-full group">
                            <input
                              type="phonenumber"
                              name="phonenumber"
                              id="floating_phonenumber"
                              class="block py-2.5 px-0 w-60 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer"
                              placeholder=" "
                            />
                            <label
                              for="floating_phoneNumber"
                              class=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Phone Number
                            </label>{" "}
                          </div>
                        </form>
                        <div></div>
                        <div></div>
                      </div>

                      <div class="p-4 border-t border-gray-200">
                        <div class="flex items-center justify-center">
                          <Link to="/buyerregister">
                            <button
                              type="submit"
                              class="border-2 rounded-md border-amber-800 hover:text-white  px-2 font text-amber-800 py-2 shadow-xl   hover:bg-yellow-900 hover:shadow-md"
                              // onClick={intrestedProperty}
                            >
                              Contact
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="grid  md:grid-cols-8 gap-2 pt-5">
                <div className="md:col-span-6 border-3 border-black  ">
                  {" "}
                  <p className=" text-2xl font-bold  md:py-4 md:hidden ">
                    More Details
                  </p>
                  <div className="grid md:grid-cols-9 grid-cols-5 shadow-2xl rounded-md bg-white md:p-7 p-3">
                    <table className="md:col-span-8 col-span-5 font1 md:block hidden">
                      <p className=" text-2xl font-bold  md:py-4 hidden md:block ">
                        More Details
                      </p>
                      <tbody className="gap-y-5">
                        <tr className="">
                          <td className="  text-gray-500 py-4 text-md  w-44">
                            Price
                          </td>
                          <td className=" text-black font-medium py-4">
                            ₹.{property?.negotiablePrice}
                          </td>
                        </tr>
                        <tr>
                          <td className="  text-gray-500 text-md py-4">
                            Address
                          </td>
                          <td className=" text-black py-2 capitalize font-medium flex">
                            {property?.layoutName},{property?.streetName},
                            {property?.location}
                          </td>
                        </tr>
                        <tr>
                          <td className="  text-gray-500 text-md py-4">
                            Land Mark
                          </td>
                          <td className=" text-black py-4 font-medium capitalize">
                            {property.nearFacilities}
                          </td>
                        </tr>
                        <tr>
                          <td className="  text-gray-500 text-md py-4">
                            Approach Road
                          </td>
                          <td className=" text-black py-4 font-medium capitalize">
                            {property.approachRoad}
                          </td>
                        </tr>
                        <tr>
                          <td className="  text-gray-500 text-md py-4">
                            Facilities
                          </td>
                          <td className=" text-black py-4 font-medium capitalize font">
                            {property.facilities}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="invisible">1</div>
                    <div className="col-span-11 grid md:grid-cols-11 font1 ">
                      <div className="md:col-span-2 text-gray-500 text-md md:hidden">
                        {" "}
                        Price
                      </div>
                      <div className="col-span-9 md:hidden text-black py-1 md:pl-4 font-light text-sm capitalize  pr-5">
                        {" "}
                        ₹.{property?.negotiablePrice}
                      </div>
                      <div className="md:col-span-2 text-gray-500 text-md md:hidden">
                        {" "}
                        Address
                      </div>
                      <div className="col-span-9 text-black py-1 md:pl-4 font-light text-sm capitalize  md:pr-5 md:hidden">
                        {" "}
                        {property?.layoutName},{property?.streetName},
                        {property?.location}
                      </div>
                      <div className="md:col-span-2 text-gray-500 text-md md:hidden">
                        {" "}
                        Land Mark
                      </div>
                      <div className="col-span-9 text-black py-1 md:pl-4 font-light text-sm capitalize  pr-5 md:hidden">
                        {" "}
                        {property.nearFacilities}
                      </div>
                      <div className="md:col-span-2 col-span-5 text-gray-500 text-md md:hidden ">
                        {" "}
                        Approach Road
                      </div>
                      <div className="col-span-9 text-black py-1 md:pl-4 font-light text-sm capitalize  pr-5 md:hidden">
                        {" "}
                        {property.approachRoad}
                      </div>
                      <div className="md:col-span-2 text-gray-500 text-md md:hidden">
                        {" "}
                        Facilities
                      </div>
                      <div className="col-span-9 text-black py-1 md:pl-4 font-light text-sm capitalize  pr-5 md:hidden">
                        {" "}
                        {property.facilities}
                      </div>

                      <div className="md:col-span-2 text-gray-500 text-md py-2 ">
                        {" "}
                        Description
                      </div>
                      <div className="col-span-9 text-black  md:pl-3 font-light text-sm capitalize md:py-3 pr-5  ">
                        {" "}
                        {property.Description}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-7  md:hidden  ">
                  <div class="w-80 bg-white  shadow-2xl px-5 rounded  animate-pulse hover:animate-none  cursor-pointer">
                    <p className="font flex justify-center pt-5 text-lg underline">
                      {" "}
                      Contact Owner
                    </p>
                    <div class="h-72 w-full checker-bg flex items-center justify-center p-4 text-blue-500">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {" "}
                        <div class="relative z-0 mb-6 w-full group">
                          <input
                            type="name"
                            name="name"
                            id="floating_name"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer"
                            placeholder=" "
                          />
                          <label
                            for="floating_name"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Name
                          </label>{" "}
                        </div>
                        <div class="relative z-0 mb-6 w-full group ">
                          <input
                            type="email"
                            name="email"
                            id="floating_email"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer"
                            placeholder=" "
                          />
                          <label
                            for="floating_email"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Email address
                          </label>{" "}
                        </div>
                        <div class="relative z-0 mb-6 w-full group">
                          <input
                            type="phonenumber"
                            name="phonenumber"
                            id="floating_phonenumber"
                            class="block py-2.5 px-0 w-60 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer"
                            placeholder=" "
                          />
                          <label
                            for="floating_phoneNumber"
                            class=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Phone Number
                          </label>{" "}
                        </div>
                        <div class="p-4 border-t border-gray-200">
                          <div class="flex items-center justify-center">
                            <Link to="/buyerregister">
                              <button
                                type="submit"
                                class="border-2 rounded-md border-amber-800 hover:text-white  px-2 font text-amber-800 py-2 shadow-xl   hover:bg-yellow-900 hover:shadow-md"

                                // onClick={intrestedProperty}
                              >
                                Contact
                              </button>
                            </Link>
                          </div>
                        </div>
                      </form>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detailspage;
