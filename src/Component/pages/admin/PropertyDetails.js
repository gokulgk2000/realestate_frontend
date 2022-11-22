import React, { useEffect, useState } from 'react'
import { getPropertyDetailsById, removeProperty } from '../../helper/backend_helpers';
import { useQuery } from '../../helper/hook/useQuery';
import { useModal } from '../../helper/hook/useModal';
import toastr from "toastr"
import "toastr/build/toastr.min.css";
import RemoveModel from '../../models/RemoveModel';
import { Navigate, useNavigate } from 'react-router-dom'


const PropertyDetails = () => {
  const query = useQuery();
  const navigate = useNavigate()

  const [modalOpen, setModalOpen, toggleModal] = useModal(false);
  const [getProperty, setGetProperty] = useState([null]);
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
  });
  
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
  // console.log("getproperty", getProperty );  

  const handleRemovingProperty = async () => {
    const payload = {
      PropertyID: [getProperty?._id],
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
            <div class="min-w-full py-5 max-w-sm bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="flex  ml-5 flex-col items-left pb-10"  >
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Seller : {getProperty?.Seller }</h5>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">AskPrice :  {getProperty?.askPrice }</h5>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">costSq :{getProperty?.costSq}</h5>
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">location :{getProperty?.location }</h5>  
        <span class="text-sm text-gray-500 dark:text-gray-400"> </span>
        </div>
        <div class="flex ml-5 mt-4 space-x-3 md:mt-6">
            <button href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Edit</button>
            <button href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            onClick={toggleModal}>Remove </button>
        </div>
   
   
</div>
        </div>
        </React.Fragment>
  )
}

export default PropertyDetails