import React, { useEffect, useState } from "react";
import { getUserById, updateProfileById } from "../../helper/backend_helpers";
import FileInput from "../../reusable/FileInput";
import Input from "../../reusable/Input";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Image from "../../assets/images/avadar3.webp";
import { Navigate, useNavigate } from "react-router-dom";
import { Alert } from "@material-tailwind/react";
const ProfileUpdate = () => {
  const navigate = useNavigate()
  const [profileSuccess,setProfileSuccess] = useState("");
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    profilePic: "",
  });
  const profileID = JSON.parse(localStorage.getItem("authUser"));
  //console.log("res", user);
  const userProfile = async () => {
    const res = await getUserById({
      userID: profileID?.userID,
    });

    if (res.success) {
      const { User } = res;
      setUser({
        firstname: User?.firstname,
        lastname: User?.lastname,
        email: User?.email,
        phoneno: User?.phoneno,
        profilePic: User?.profilePic,
      });
      console.log("show", res);
      
      // setUser({firstname:res.user?.firstname,
      //   lastname:res.user,
      //   profilepic :res.user});
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    navigate('/ProfileUpdate')

    const profile = { ...user, userID: profileID?.userID };

    const res = await updateProfileById(profile);
    if (res.success) {
      setProfileSuccess(res.msg)
      toastr.success(`Profile updated successfully`, "Success")
      console.log(profile);
   
    } else {

    }
  };
  const convertBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const profileImageUpload = async (e) => {
    const file = e.target.files[0];
    const Image = await convertBase64(file);

    setUser({ ...user, profilePic: Image });
    console.log("profilepic : ", user);
  };

  return (
    <div>
     
      <div className="md:py-20 md:px-24 bg-slate-100">
        <div className="py-8 px-8 bg-white shadow mt-24">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {" "}
            <div className="flex text-center md:pr-10 capitalize justify-center order-last md:order-first mt-20 md:mt-0">
              {" "}
              <div>
                {" "}
                <Input
                  label="First Name"
                  type="text"
                  name="firstname"
                  placeholder="Enter the firstname "
                  value={user?.firstname}
                  onChange={(e) =>
                    setUser({ ...user, firstname: e.target.value })
                  }
                />
                <Input
                  label="Last Name"
                  type="text"
                  name="lastname"
                  placeholder="Enter the lastname "
                  value={user?.lastname}
                  onChange={(e) =>
                    setUser({ ...user, lastname: e.target.value })
                  }
                />
                {/* <Input
            className=""
            label="ProfilePicture"
              type="text"
              name="ProfilePicture"
              placeholder="Enter the lastname "
              value={user?.lastname}
              onChange={(e) => setUser({...user,lastname:e.target.value})}
            /> */}
                <Input
                  label="PhoneNumber"
                  type="number"
                  min="0"
                  name="phoneno"
                  placeholder="Enter the phonenumber "
                  value={user?.phoneno}
                  onChange={(e) =>
                    setUser({ ...user, phoneno: e.target.value })
                  }
                />
                <FileInput
                  label="profile Image"
                  accept=".png, .jpg, .jpeg,.pdf,.webp"
                  onChange={profileImageUpload}
                />
              </div>
            </div>{" "}
            {/* {user?.profilePic !== "" ? (sd):(sds) } */}
            <div className="md:relative pl-14 ">
              {" "}
              <div className="w-48 md:h-48  bg-indigo-100 mx-70 rounded-full  shadow-2xl inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  src={user?.profilePic || Image}
                  className="md:h-48 md:w-48 rounded-full"
                />{" "}
              </div>{" "}
              <div className="border-b pb-">
                {" "}
                <h1 className="text-4xl font-medium text-gray-700 capitalize">
                  {user?.firstname} {user?.lastname}
                </h1>{" "}
                <p className="font-light text-gray-600 mt-3"> {user?.email}</p>{" "}
                <p className="mt-8 text-gray-500 capitalize">
                  PhoneNumber -{user?.phoneno}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="mt-12 flex  justify-center">
            <button
              onClick={(e) => updateProfile(e)}
              className="w-36 h-10 font bg-amber-700 hover:bg-amber-900 text-white font-light py-1 px-1 rounded mb-20"
              >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
