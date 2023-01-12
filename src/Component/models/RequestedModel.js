import React, { useEffect, useState } from "react";
import Input from "../reusable/Input";
import PropTypes from "prop-types";
import { getrequested, getrequestedByUserId } from "../helper/backend_helpers";
import { useFormik } from "formik";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const RequestedModel = ({ show, onCloseClick }) => {
  const currentUser = JSON.parse(localStorage?.getItem("authUser"));
  // console.log("currentUser",currentUser.userID)
  const [request, setRequest] = useState("");
  const [requestSuccess, setRequestSuccess] = useState("");
  const [requesError, setRequestError] = useState("");
  const facing = [
    { value: "", text: "Select Facing " },
    { value: "east", text: "east " },
    { value: "west", text: "west " },
    { value: "south", text: "south " },
    { value: "north", text: "north " },
    { value: "southEast", text: "southEast " },
    { value: "southWest", text: "southWest " },
    { value: "northEast", text: "northEast " },
    { value: "northWest", text: "northWest " },
  ];
  const propertyType = [
    { value: "", text: "Select propertyType " },
    { value: "Residential", text: "Residential " },
    { value: "Appartment", text: "Appartment " },
    { value: "Villa", text: "Villa " },
    { value: "Land", text: "Land " },
    { value: "Commercial", text: "Commercial " },
    { value: "Industrial", text: "Industrial " },
  ]
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      regUser: currentUser?.userID,
      location: "",
      propertyType: propertyType,
      facing: facing,
      landArea: "",
      buildArea: "",
      expectedPrice: "",
    },
    onSubmit: (values, onSubmitProps) => {
      requested({
        regUser: currentUser?.userID,
        location: values.location,
        propertyType: values.propertyType,
        facing: values.facing,
        landArea: values.landArea,
        buildArea: values.buildArea,
        expectedPrice: values.expectedPrice,
      });
      onSubmitProps.resetForm();
    },
  });
  // console.log("requested :",validation)
  // const handlerequestedReg = async payload=> {
  //     const res = await  getrequestedByUserId (payload)
  //     console.log(res)
  //     if(res.success) {
  //         setRequestSuccess(res.msg)
  //       toastr.success(`Buyer has been Registration successfully`, "Success");
  //       onCloseClick()
  //     }
  //     else{
  //         setRequestError(res.msg)
  //     }
  //   }

  const requested = async (payload) => {
    const res = await getrequested(payload);
    if (res.success) {
      setRequestSuccess(res.msg);
      toastr.success(` Request Sent successfully `);
      onCloseClick();
    } else {
      console.log("errors", res);
    }
  };
  useEffect(() => {}, []);
  // console.log("Request",request)
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0  bg-gray-500 bg-opacity-75 transition-opacity  ">
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex mt-5 items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg">
              <div className="bg-white px-4  p-6 pb-4 md:w-full ">
                <div className="flex justify-between ">
                  <div>
                    <h5 class="flex text-xl px-4  font-semibold tracking-normal dark:text-white uppercase">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-10 text-amber-800 pb-2 pr-1"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                        />
                      </svg>
                      Buyer Request
                    </h5>
                  </div>
                  <div className="items-center ">
                    <button className="" onClick={onCloseClick}>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-2  sm:ml-4 sm:text-left">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                    }}
                  >
                    <div className="grid gap-4">
                      <div>
                        <label
                          name="location"
                          className=" flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Location"
                          onChange={validation.handleChange}
                        />
                      </div>

                      <div>
                        <label
                          name="propertyType"
                          className=" flex justify-start  mb-2 text-sm font-medium dark:text-white"
                        >
                          PropertyType
                        </label>
                        <select
                          id="propertyType"
                          name="propertyType"
                          label="propertyType"
                          className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={validation.values.propertyType}
                          onChange={validation.handleChange || ""}
                          invalid={
                            validation.touched.facing &&
                            validation.errors.facing
                              ? true
                              : false
                          }
                        >
                          {" "}
                          {propertyType.map((option, i) => (
                            <option value={option?.value} key={i}>
                              {option?.text}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          name="first_name"
                          className="flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Facing
                        </label>
                        <select
                          id="facing"
                          name="facing"
                          label="facing"
                          className="bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={validation.values.facing}
                          onChange={validation.handleChange || ""}
                          invalid={
                            validation.touched.facing &&
                            validation.errors.facing
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
                      </div>

                      <div>
                        <label
                          name="landArea"
                          className=" flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          LandArea
                        </label>
                        <input
                          type="text"
                          name="landArea"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter LandArea"
                          onChange={validation.handleChange}
                        />
                      </div>
                      <div>
                        <label
                          name="buildArea"
                          className=" flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          BuildArea
                        </label>
                        <input
                          type="text"
                          name="buildArea"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter BuildArea"
                          onChange={validation.handleChange}
                        />
                      </div>
                      <div>
                        <label
                          name="expectedPrice"
                          className=" flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          ExpectedPrice
                        </label>
                        <input
                          type="number"
                          min={0}
                          name="expectedPrice"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter expectedPrice"
                          onChange={validation.handleChange}
                        />
                      </div>
                      <div className=" flex justify-between mt-4">
                        <button
                          type="button"
                          className=" px-6 py-2.5  text-red-400 border border-red-600  font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:text-white hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={onCloseClick}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className=" inline-block px-6 py-2.5 text-blue-800   border border-blue-600 hover:bg-blue-600 hover:text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={requested}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
RequestedModel.propTypes = {
  show: PropTypes.any,
  currentProperty: PropTypes.object,
};

export default RequestedModel;
