import React, { useEffect, useState } from "react";
import { useModal } from "../../helper/hook/useModal";
import { useQuery } from "../../helper/hook/useQuery";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import RemoveModel from "../../models/RemoveModel";
import { Breadcrumbs } from "@material-tailwind/react";
import AddModel from "../../models/AddModel";
import {
  addBuyer,
  getbuyerdetails,
  removeBuyer,
} from "../../helper/backend_helpers";
import { Link } from "react-router-dom";
const BuyerDetails = () => {
  const query = useQuery();
  const [modalOpen, setModalOpen, toggleModal] = useModal(false);
  const [modalOpen1, setModalOpen1, toggleModal1] = useModal(false);
  const [getBuyer, setGetBuyer] = useState(null);
  const [rerender, setRerender] = useState(true);
  const statusColor = {
    approved: "green",
    pending: "#e8bf09",
    rejected: "red",
  };

  const getBuyerById = async () => {
    const res = await getbuyerdetails({
      userId: query.get("id"),
    });
    if (res.success) {
      setGetBuyer(res.Buyer);
    }
  };
  useEffect(() => {
    if (rerender) {
      getBuyerById();
      setRerender(false);
    }
  }, [rerender]);

  const handleRemovingBuyer = async () => {
    const payload = {
      userID: query.get("id"),
    };
    const res = await removeBuyer(payload);
    if (res.success) {
      toastr.success(`Buyer has been Deactivated successfully`, "Success");
      setRerender(true);
    } else {
      console.log("Error : ", res?.msg || "error");
    }
    setModalOpen(false);
  };
  const handleAddBuyer = async () => {
    const payload = {
      userID: query.get("id"),
    };
    const res = await addBuyer(payload);
    if (res.success) {
      toastr.success(`User has been activated successfully`, "Success");
      // await getAllUsers();
      setRerender(true);
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
        <Link to="/admin">
          <button  className="opacity-60 font">
            Dashboard
          </button></Link>
          <Link to="/admin/buyerlist">
          <button  className="opacity-60 font">
            Buyers List
          </button></Link>
          <Link to="/admin/buyerlist"disabled>
          <button  className="text-amber-700 font">
            Buyers Details
          </button></Link>
          
        </Breadcrumbs>
        <div className="min-w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 py-5 px-5">
          <div className="flex flex-col items-left pb-10 leading-loose">
            <h5 className="mx-1 text-xlfont-light text-gray-900 dark:text-white leading-loose">
              Firstname : {getBuyer?.firstname}
            </h5>
            <h5 className="mx-1 text-xlfont-light text-gray-900 dark:text-white leading-loose">
              Lastname : {getBuyer?.lastname},
            </h5>
            <h5 className="mx-1 text-xlfont-light text-gray-900 dark:text-white leading-loose">
              {" "}
              Email :{getBuyer?.email},
            </h5>
            <h5 className="mx-1 text-xlfont-light text-gray-900 dark:text-white leading-loose capitalize">
              {" "}
              Property Details :{getBuyer?.propertyId?.layoutName},{getBuyer?.propertyId?.location},
            </h5>
            <h5 className="mx-1 text-xlfont-light text-gray-900 dark:text-white leading-loose">
              {" "}
              Phone Number :{getBuyer?.phonenumber},
            </h5>
            <h5 className="mx-1 text-xlfont-light text-gray-900 dark:text-white leading-loose">
              {" "}
              Status :
              <span style={{ color: statusColor[getBuyer?.status] }}>
                {getBuyer?.status}.
              </span>
            </h5>
          </div>
          <div className="flex mt-4 space-x-3 md:mt-6">
            {/* <button
              href="#"
              className="inline-flex items-center px-4 py-2 text-smfont-light text-center text-white bg-amber-700 rounded-lg hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit
            </button> */}
            {getBuyer?.status !== "approved" ? (
              <button
                href="#"
                class="inline-flex items-center px-4 py-2 text-smfont-light text-center  text-white bg-amber-700 rounded-lg hover:bg-amber-900  focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                onClick={toggleModal1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Verified
              </button>
            ) : (
              <button
                href="#"
                class="inline-flex items-center px-4 py-2 text-smfont-light text-center  text-white bg-amber-700 rounded-lg hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                onClick={() => toggleModal()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
               Deny
              </button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default BuyerDetails;
