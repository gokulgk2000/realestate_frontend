import React, { useEffect, useState } from "react";
import {  buyerReg, getuserdetails } from "../helper/backend_helpers";
import { useFormik } from "formik";
import * as Yup from "yup"
import { useQuery } from "../helper/hook/useQuery";
import PropTypes from "prop-types"
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const BuyerModal = ({   show, currentProperty,onCloseClick,
  }) => {
console.log("currentProperty",currentProperty)
  const  query = useQuery();
  const [BuyerRegistrationSuccess, setBuyerRegistrationSuccess] = useState("");
  const [BuyerRegistrationError, setBuyerRegistrationError] = useState("");
  const[user,setUser] = useState("");
  // const currentUser = JSON.parse(localStorage?.getItem("authUser"));
  // console.log("Current : ", currentUser.userID);
   const validation = useFormik({
    enableReinitialize: true,
    initialValues:{
      firstname: "",
      lastname:"",
      email:"",
      phonenumber:"",
    },
    validationSchema: Yup.object({
     firstname: Yup.string().required("please Enter Your FirstName"),
     lastname: Yup.string().required("please Enter Your LastName"),
     email: Yup.string().required("please Enter Your Email"),
     phonenumber: Yup.string().required("Please Enter Your phonenumber")
    }),
    onSubmit: (values,onSubmitProps) => {
      handlebuyerReg({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        phonenumber: values.phonenumber,
        propertyId:currentProperty
      })
      onSubmitProps.resetForm()
    },
   })
 console.log("currentProperty",currentProperty)
 const handlebuyerReg = async payload=> {
  const res = await  buyerReg (payload)
  console.log(res)
  if(res.success) {
    setBuyerRegistrationSuccess(res.msg)
    toastr.success(`Buyer has been Registration successfully`, "Success");
    onCloseClick()
  }
  else{
    setBuyerRegistrationError(res.msg)
  }
}
//  const getuser = async () => {
//   const payload = {
//    userId:currentUser?.userID,
//   }
//    const res = await getuserdetails(payload);
// if(res.success) {
//    setUser(res?.User)
//  }else{
//    console.log("errors",res)
//  } }
//  useEffect(()=>{
//   getuser()
//  },[])
   
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex mt-32 items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-md">
          <div className="bg-white px-4  p-6 pb-4">   
          {BuyerRegistrationSuccess && (
                            <alert
                              className="text-bold text-green-500"
                            >
                              {BuyerRegistrationSuccess}
                            </alert>
                          )}
                          {BuyerRegistrationError && (
                            <alert
                              className="text-bold text-red-500"
                            >
                              {BuyerRegistrationError}
                            </alert>
                          )}
              <div className="flex justify-between " >
                                    <div>
                                      {/* <h5>View</h5> */}
                                    </div>
                                    <div className="items-center ">
                                  <button className=""  onClick={onCloseClick}> <svg
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
                         </svg></button> 
                                    </div>
                                    </div>
                                    <div className="mt-2  sm:ml-4 sm:text-left">
                                    <form
                          onSubmit={e=>{
                           e.preventDefault();
                           validation.handleSubmit();
                          }}
                   >
                     <div className=" grid gap-6 mb-6 text-left mt-4">
                       <div >
                         <label
                           name="first_name"
                           className="flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         >
                           First Name
                         </label>
                         <input
                           type="text"
                           name="firstname"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Enter First Name"
                           onChange={validation.handleChange}
                           value={validation.values.firstname  }
                           invalid={
                             validation.errors.firstname
                               ? true
                               : false
                           }
                         />
                         {
                         validation.errors.firstname ? (
                           <span type="invalid">
                             {validation.errors.firstname}
                           </span>
                         ) : null}
                         </div>
                         
                       <div>
                         <label
                           name="lastname"
                           className=" flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         >
                           Last Name
                         </label>
                         <input
                           type="text"
                           name="lastname"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Enter Last Name"
                           onChange={validation.handleChange}
                           value={validation.values.lastname}
                           invalid={ 
                             validation.errors.lastname
                               ? true
                               : false
                           }
                         />
                         {
                         validation.errors.lastname ? (
                           <span type="invalid">
                             {validation.errors.lastname}
                           </span>
                         ) : null}
                       </div>
                       <div>
                         <label
                           name="email"
                           className=" flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         >
                           Email
                         </label>
                         <input
                           type="email"
                           name="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Enter Email"
                           onChange={validation.handleChange}  
                           value={validation.values.email }
                           invalid={
                             validation.errors.email
                               ? true
                               : false
                           }
                         />
                         {
                         validation.errors.email ? (
                           <span type="invalid">
                             {validation.errors.email}
                           </span>
                         ) : null}      
                       </div>
                       <div>
                         <label
                           name="Phone Number"
                           className=" flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         >
                           Phone Number
                         </label>
                         <input
                           type="number"
                           name="phonenumber"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Enter Phone Number"
                           onChange={validation.handleChange}
                           value={validation.values.phonenumber }
                           invalid={
                             validation.errors.phonenumber
                               ? true
                               : false
                           }
                         />
                         {
                         validation.errors.phonenumber ? (
                           <span type="invalid">
                             {validation.errors.phonenumber}
                           </span>
                         ) : null}
                       </div>
                        <div className=" flex justify-between mt-4">
                        
                         <button
                           type="button"
                           className=" px-6 py-2.5  bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                           onClick={onCloseClick}
                         >
                           Close
                         </button>
                         <button
                           type="submit"
                           className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                           onClick={handlebuyerReg}
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
  )
}           
            BuyerModal.propTypes = {
              show: PropTypes.any, 
              currentProperty: PropTypes.object,
  }
export default BuyerModal;
