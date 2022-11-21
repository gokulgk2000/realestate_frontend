import React, { useEffect, useState } from 'react'
import { getUserById } from '../../helper/backend_helpers';
import { useQuery } from '../../helper/hook/useQuery';

  
const UserDetails = () => {
  const query = useQuery();
  // const [modalOpen, setModalOpen, toggleModal] = useModal(false);
  const [getUser, setGetUser] = useState(null);
  // const [getPayment, setGetPayment] = useState(null);
  // const [paymentData, setPaymentData] = useState([]);

  const getUserId = async () => {
    const res = await getUserById({
      userId: query.get("id"),
    });
    if (res.success) {
      setGetUser(res.User);
      console.log("res", res);
    }
  };

  useEffect(() => {
    getUserId();
  }, []);
  
  // const handleRemovingUser = async () => {
  //   const payload = {
  //     userID: [getUser?._id],
  //   };
  //   const res = await removeUser(payload);
  //   if (res.success) {
  //     console.log(res);
  //     toastr.success(`User has been Deactivated successfully`, "Success");

  //     await getAllUsers();
  //   } else {
  //     console.log("Error : ", res?.msg || "error");
  //   }
  //   setModalOpen(false);
  // };
  return (
    <div>   
       <div class="min-w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 py-5 px-5">
    {/* {getProperty?.map((prode,i)=>( */}
    <div class="flex  justify-start  pb-10"  >
      <div > <div className='flex items-center md:gap-2'> <h5 class="mx- text-xl font-medium text-gray-900 dark:text-white">Firstname :</h5><p className='font-sm'>{getUser?.firstname }</p></div>
       <div className='flex items-center md:gap-2'> <h5 class="mx- text-xl font-medium text-gray-900 dark:text-white">Lastname :</h5><p className='font-sm'>{getUser?. lastname}</p></div>  
      <div className='flex items-center md:gap-2'>   <h5 class="mx- text-xl font-medium text-gray-900 dark:text-white">Email :</h5><p className='font-sm'>{getUser?.email}</p> </div></div>
        {/* <h5 class="mx-1 text-xl font-medium text-gray-900 dark:text-white">Password :{getUser?. password}</h5> */}
        <span class="text-sm text-gray-500 dark:text-gray-400"> </span>
        </div>
        {/* ))}  */}
        <div class="flex mt-4 space-x-3 md:mt-6">
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</a>
            <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Remove</a>
        </div>
   
   
</div></div>
  )
}

export default UserDetails