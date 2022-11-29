import React, { useEffect, useState } from "react";
import { useModal } from "../../helper/hook/useModal";
import { useQuery } from "../../helper/hook/useQuery";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { confirmAlert } from "react-confirm-alert";
import RemoveModel from "../../models/RemoveModel";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@material-tailwind/react";
import AddModel from "../../models/AddModel";
import { addBuyer, getbuyerdetails, removeBuyer } from "../../helper/backend_helpers";

const BuyerDetails = () => {
  const query = useQuery();
  const navigate = useNavigate();


  const [modalOpen, setModalOpen, toggleModal] = useModal(false);
  const [modalOpen1, setModalOpen1, toggleModal1] = useModal(false);
  const [getBuyer, setGetBuyer] = useState(null);
  const[isAdd, setIsAdd] = useState("authUser")
  // const [getPayment, setGetPayment] = useState(null);
  // const [paymentData, setPaymentData] = useState([]);

console.log("getBuyer",getBuyer)
  const getBuyerById = async () => {
    const res = await getbuyerdetails({
      userId: query.get("id"),
    });
    if (res.success) {
      setGetBuyer(res.Buyer);
      console.log("buyerres", res);
    }
  };

  useEffect(() => {
    getBuyerById();
  }, []);

  const handleRemovingBuyer = async () => {
    const payload = {
      userID: query.get("id"),
    };
    const res = await removeBuyer(payload);

    if (res.success) {
      console.log("res", res);
      toastr.success(`Buyer has been Deactivated successfully`, "Success");

    } else {
      console.log("Error : ", res?.msg || "error");
    }
    setModalOpen(false);
  };
  const handleAddBuyer = async () => {
    const payload = {
        userID:query.get("id"),
    };
    const res = await addBuyer(payload);

    if (res.success) {
      console.log("res", res);
      toastr.success(`User has been activated successfully`, "Success");

      // await getAllUsers();
    } else {
      console.log("Error : ", res?.msg || "error");
    }
    setModalOpen1(false);
  };

  return (
    <React.Fragment>
      {modalOpen && (
        <RemoveModel
          show={modalOpen}
          onDeleteClick={handleRemovingBuyer}
          confirmText="Yes,DeActive"
          cancelText="Cancel"
          onCloseClick={() => setModalOpen(false)}
        />
      )}
       {modalOpen1 && (
        <AddModel
          show={modalOpen}
          onAddClick={handleAddBuyer}
          confirmText="Yes,Active"
          cancelText="Cancel"
          onCloseClick={() => setModalOpen1(false)}
        />
      )}
      <div>
        <Breadcrumbs>
          <a href="/admin/Dashboard" className="opacity-60">
            Dashboard
          </a>
          <a href="/admin/buyerlist" className="opacity-60">
            Buyers
          </a>
          <a href="/admin/buyerdetails" className="text-rose-700">
            BuyerDetails
          </a>
        </Breadcrumbs>
        <div className="min-w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 py-5 px-5">
          <div className="flex flex-col items-left pb-10 leading-loose">
            <h5 className="mx-1 text-xl font-medium text-gray-900 dark:text-white leading-loose">
              Firstname : {getBuyer?.firstname}
            </h5>
            <h5 className="mx-1 text-xl font-medium text-gray-900 dark:text-white leading-loose">
              Lastname : {getBuyer?.lastname}
            </h5>
            <h5 className="mx-1 text-xl font-medium text-gray-900 dark:text-white leading-loose">
              {" "}
              Email :{getBuyer?.email}
            </h5>
            <h5 className="mx-1 text-xl font-medium text-gray-900 dark:text-white leading-loose">
              {" "}
              Property Details :{getBuyer?.propertyId?.layoutName}
            </h5>
            <h5 className="mx-1 text-xl font-medium text-gray-900 dark:text-white leading-loose">
              {" "}
              Phone Number :{getBuyer?. phonenumber}
            </h5>
            <h5 className="mx-1 text-xl font-medium text-gray-900 dark:text-white leading-loose">
              {" "}
              Status :{getBuyer?.status}
            </h5>
          </div>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <button
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit
            </button>
            <button
              href="#"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              onClick={toggleModal1}
            >
             Add
            </button>
            <button
              href="#"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              onClick={toggleModal}
            >
              Remove
            </button>
           
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BuyerDetails;
