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
  const [isAdd ,setIsAdd]=useState("authUser");
  const [rerender, setRerender] = useState(true);
  // const [getPayment, setGetPayment] = useState(null);
  // const [paymentData, setPaymentData] = useState([]);

console.log("getuser",getUser)
  const getUserId = async () => {
    const res = await getUserById({
      userID: query.get("id"),
    });
    if (res.success) {
      setGetUser(res.User);
      console.log("res", res);
    }
  };

  useEffect(() => {
  if(rerender) {
    getUserId();
    setRerender(false)
  }  
  }, [rerender]);

  const handleRemovingUser = async () => {
    const payload = {
      userID: query.get("id"),
    };
    const res = await removeUser(payload);

    if (res.success) {
      console.log("res", res);
      toastr.success(`User has been Deactivated successfully`, "Success");
      // navigate("/admin/UserList");
      setRerender(true)

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
      // navigate("/admin/UserList"); 
      setRerender(true)
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
     
        <Breadcrumbs>
          <a href="/admin/Dashboard" className="opacity-60 font">
            Dashboard
          </a>
          <a href="/admin/userlist" className="opacity-60 font">
          Sellers
          </a>
          <a href="/admin/userdetails" className="text-amber-700 font">
          SellersDetails
          </a>
        </Breadcrumbs>
        <div className="min-w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 py-5 px-5">
          <div className="flex flex-col items-left pb-10 leading-loose">
            <h5 className="mx-1 text-xlfont-light text-gray-900 dark:text-white leading-loose">
              Firstname : {getUser?.firstname}
            </h5>
            <h5 className="mx-1 text-xlfont-light text-gray-900 dark:text-white leading-loose">
              Lastname : {getUser?.lastname}
            </h5>
            <h5 className="mx-1 text-xlfont-light text-gray-900 dark:text-white leading-loose">
              {" "}
              Email :{getUser?.email}
            </h5>
            <h5 className="mx-1 text-xlfont-light text-gray-900 dark:text-white leading-loose">
              {" "}
              Date :{getUser?.date}
            </h5>
            <h5 className="mx-1 text-xlfont-light text-gray-900 dark:text-white leading-loose">
              {" "}
              Status :{getUser?.status}
            </h5>
          </div>
          <div className="flex mt-4 space-x-3 md:mt-6">
         
       {getUser?.status !=="approved"? <button
              href="#"
              class="inline-flex items-center px-4 py-2 text-smfont-light text-center  text-white  bg-amber-700 rounded-lg hover:bg-amber-900  focus:ring-4 focus:outline-none  dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              onClick={()=>toggleModal1() }
           
            ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          
          
             Add
            </button>
            :<button
              href="#"
              class="inline-flex items-center px-4 py-2 text-smfont-light text-center  text-white  bg-amber-700 rounded-lg hover:bg-amber-900 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              onClick={()=>toggleModal()}
            ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          
              Remove
            </button>}
           
          </div>
       <div class="min-w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 py-5 px-5">
   
    <div class="flex  justify-start  pb-10"  >
      <div > <div className='flex items-center md:gap-2'> <h5 class="mx- text-xl font-medium text-gray-900 dark:text-white">Firstname :</h5><p className='font-sm'>{getUser?.firstname }</p></div>
       <div className='flex items-center md:gap-2'> <h5 class="mx- text-xl font-medium text-gray-900 dark:text-white">Lastname :</h5><p className='font-sm'>{getUser?. lastname}</p></div>  
      <div className='flex items-center md:gap-2'>   <h5 class="mx- text-xl font-medium text-gray-900 dark:text-white">Email :</h5><p className='font-sm'>{getUser?.email}</p> </div></div>
      
        <span class="text-sm text-gray-500 dark:text-gray-400"> </span>
        </div>
       
        <div class="flex mt-4 space-x-3 md:mt-6">
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</a>
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Remove</a>

        </div>
      </div>
      </div>
    </React.Fragment>
  );
};

export default UserDetails;
