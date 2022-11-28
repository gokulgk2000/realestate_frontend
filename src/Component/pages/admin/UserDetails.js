import React, { useEffect, useState } from "react";
import {
  addUser,
  getPropertyById,
  getUserById,
  removeUser,
} from "../../helper/backend_helpers";
import { useModal } from "../../helper/hook/useModal";
import { useQuery } from "../../helper/hook/useQuery";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { confirmAlert } from "react-confirm-alert";
import RemoveModel from "../../models/RemoveModel";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@material-tailwind/react";
import AddModel from "../../models/AddModel";

const UserDetails = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen, toggleModal] = useModal(false);
  const [modalOpen1, setModalOpen1, toggleModal1] = useModal(false);
  const [getUser, setGetUser] = useState(null);
  const [isAdd ,setIsAdd]=useState(false);
  // const [getPayment, setGetPayment] = useState(null);
  // const [paymentData, setPaymentData] = useState([]);
console.log("getUser",getUser)
  const getUserId = async () => {
    const res = await getUserById({
      userID: query.get("id"),
    });
    if (res.success) {
      setGetUser(res.User);
      // console.log("res", res);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  const handleRemovingUser = async () => {
    const payload = {
      userID: query.get("id"),
    };
    const res = await removeUser(payload);

    if (res.success) {
      console.log("res", res);
      toastr.success(`User has been Deactivated successfully`, "Success");
      // navigate("/admin/UserList");

      // await getAllUsers();
    } else {
      console.log("Error : ", res?.msg || "error");
    }
    setModalOpen(false);
  };
  const handleAddUser = async () => {
    const payload = {
      userID:query.get("id"),
    };
    const res = await addUser(payload);

    if (res.success) {
      console.log("res", res);
      toastr.success(`User has been activated successfully`, "Success");
      navigate("/admin/UserList");

      // await getAllUsers();
    } else {
      console.log("Error : ", res?.msg || "error");
    }
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      {modalOpen && (
        <RemoveModel
          show={modalOpen}
          onDeleteClick={handleRemovingUser}
          confirmText="Yes,DeActive"
          cancelText="Cancel"
          onCloseClick={() => setModalOpen(false)}
        />
      )}
       {modalOpen1 && (
        <AddModel
          show={modalOpen}
          onAddClick={handleAddUser}
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
          <a href="/admin/userlist" className="opacity-60">
            Users
          </a>
          <a href="/admin/userdetails" className="text-rose-700">
            UsersDetails
          </a>
        </Breadcrumbs>
        <div class="min-w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 py-5 px-5">
          {/* {getProperty?.map((prode,i)=>( */}
          <div class="flex flex-col items-left pb-10 leading-loose">
            <h5 class="mx-1 text-xl font-medium text-gray-900 dark:text-white leading-loose">
              Firstname : {getUser?.firstname}
            </h5>
            <h5 class="mx-1 text-xl font-medium text-gray-900 dark:text-white leading-loose">
              Lastname : {getUser?.lastname}
            </h5>
            <h5 class="mx-1 text-xl font-medium text-gray-900 dark:text-white leading-loose">
              {" "}
              Email :{getUser?.email}
            </h5>
            <h5 class="mx-1 text-xl font-medium text-gray-900 dark:text-white leading-loose">
              {" "}
              Date :{getUser?.date}
            </h5>
            <h5 class="mx-1 text-xl font-medium text-gray-900 dark:text-white leading-loose">
              {" "}
              Status :{getUser?.status}
            </h5>
          </div>
          {/* ))}  */}
          <div class="flex mt-4 space-x-3 md:mt-6">
            <button
              href="#"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

export default UserDetails;
