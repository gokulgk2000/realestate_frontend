

import { Input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { getUserById, updateProfileById } from '../../helper/backend_helpers';
import FileInput from '../../reusable/FileInput';
const ProfileUpdate = () => {
    const [user, setUser] = useState({});
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");


  const profileID = JSON.parse(localStorage.getItem("authUser"));
  console.log("res", user);
  const getUserName = async () => {
    const res = await getUserById({
      userID: profileID?.userID,
    });
    if (res.success) {
      setUser(res.User);
      // console.log("res", res);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

// console.log("view",user)
// const updateProfile = async () => {
//     const res = await updateProfileById({
//         userID: profileID?.userID
        
//     });
//       setUser(res.user);
      
//     }
//   };

//   useEffect(() => {
//     updateProfile();
//   }, []);
  return (
    <div>
<div className='grid'>
    <div className=''>
       
FirstName: <Input
              type="text"
              name="firstname"
              placeholder="Enter the firstname "
              value={user?.firstname}
         
              onChange={(e) => setFirstname(e.target.value)}
            />
<div>
lastName:<Input
              type="text"
              name="lastname"
              placeholder="Enter the lastname "
              value={user?.lastname}
         
              onChange={(e) => setLastname(e.target.value)}
            /></div><div>
ProfilePicture:<FileInput 
              label="Property Images"
              multiple={true}
              accept=".png, .jpg, .jpeg,.pdf,.webp"
             /></div>
    </div> 
    
</div>
<button className='bg-blue-500'  onClick={(e)=>{}}>Edit</button>



    </div>
  )
}

export default ProfileUpdate