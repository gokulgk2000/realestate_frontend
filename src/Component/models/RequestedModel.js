import React, { useEffect, useState } from 'react'
import Input from '../reusable/Input'
import PropTypes from "prop-types"
import { getrequested, getrequestedByUserId } from '../helper/backend_helpers';
import { useFormik } from 'formik';
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const RequestedModel =( {show,onCloseClick,}) => {
    const currentUser = JSON.parse(localStorage?.getItem("authUser"));
    // console.log("currentUser",currentUser.userID)
    const[request,setRequest]=useState("");
    const [requestSuccess, setRequestSuccess] = useState("");
  const [requesError, setRequestError] = useState("");

    const validation = useFormik({
        enableReinitialize: true,
        initialValues:{
          facing: "",
          location:"",
          nearTown:"",
          askPrice:"",
        },
        onSubmit: (values,onSubmitProps) => {
            requested({
                facing: values.facing,
                location: values.location,
                nearTown: values.nearTown,
                askPrice: values.askPrice,
                regUser: currentUser?.userID,
            
            })
            onSubmitProps.resetForm()
          },
    })
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


  const requested = async payload => {
   
     const res = await getrequested(payload);
  if(res.success) {
    setRequestSuccess(res.msg)
    toastr.success(`Sent Request successfully`, "Success");
    onCloseClick()
   }else{

     console.log("errors",res)
   } }
   useEffect(()=>{
    requested()
   },[])
// console.log("Request",request)
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex mt-10 items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-md">
          <div className="bg-white px-4  p-6 pb-4">   
          
              <div className="flex justify-between " >
                                    <div>
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
                   
                       <div >
                         <label
                           name="first_name"
                           className="flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         >
                           Facing
                         </label>
                         <input
                           type="text"
                           name="facing"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Enter facing"
                           onChange={validation.handleChange}

                          
                         />
                         
                         
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
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Enter Location"
                           onChange={validation.handleChange}
                          
                         />
                         
                       </div>
                       <div>
                         <label
                           name="email"
                           className=" flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         >
                           nearTown
                         </label>
                         <input
                           type="text"
                           name="nearTown"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Enter nearTown"
                           onChange={validation.handleChange}
                           
                         />
                             
                       </div>
                       <div>
                         <label
                           name="askPrice"
                           className=" flex justify-start  mb-2 text-sm font-medium text-gray-900 dark:text-white"
                         >
                           Ask Price
                         </label>
                         <input
                           type="number"
                           name="askPrice"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Enter Price"
                           onChange={validation.handleChange}
                           
                         />
                        
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
  )
}
RequestedModel.propTypes = {
    show: PropTypes.any, 
              currentProperty: PropTypes.object,
  }

export default RequestedModel
