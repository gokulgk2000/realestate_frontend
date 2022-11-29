import React, { useEffect, useState } from 'react'
import { updateProfileById } from '../../helper/backend_helpers';
const ProfileUpdate = () => {
    const [user, setUser] = useState({});

  const profileID = JSON.parse(localStorage.getItem("authUser"));

console.log("view",user)
const updateProfile = async () => {
    const res = await updateProfileById({
        userID: profileID?.userID
        
    });
    if (res.success) {
      setUser(res.user);
      
    }
  };

  useEffect(() => {
    updateProfile();
  }, []);
  return (
    <div>
<div className='grid'>
    {/* <div>
       
FirstName:{user?.firstname}
<div>
lastName:{user?.lastname}</div>
ProfilePicture:
    </div>  */}
</div>
<button className='bg-blue-500'  onClick={(e)=>{}}>Edit</button>



    </div>
  )
}

export default ProfileUpdate