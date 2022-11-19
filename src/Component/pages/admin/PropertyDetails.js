import React, { useEffect, useState } from 'react'
import { getPropertyDetailsById } from '../../helper/backend_helpers';
import { useQuery } from '../../helper/hook/useQuery';
import { useModel } from "../../helper/hook/useModel"
const PropertyDetails = () => {
  const query = useQuery();

  // const [modalOpen, setModalOpen, toggleModal] = useModel(false);
  const [getProperty, setGetProperty] = useState([null]);
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
  <div>
            

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
        </div>
  )
}

export default PropertyDetails