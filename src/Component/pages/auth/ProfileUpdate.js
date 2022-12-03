import React, { useEffect, useState } from "react";
import { success } from "toastr";
import { getUserById, updateProfileById } from "../../helper/backend_helpers";
import FileInput from "../../reusable/FileInput";
import Input from "../../reusable/Input";

const ProfileUpdate = () => {
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
    window.location.reload(false);

    const profile = { ...user, userID: profileID?.userID };

    const res = await updateProfileById(profile);
    if (res.success) {
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
      <div className="py-20 px-24">
        <div className="py-8 px-8 bg-white shadow mt-24">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {" "}
            <div className="flex text-center pr-10 capitalize justify-center order-last md:order-first mt-20 md:mt-0">
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
            <div className="relative ">
              {" "}
              <div className="w-48 h-48 bg-indigo-100 mx-70 rounded-full shadow-2xl inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  src={user?.profilePic}
                  className="h-48 w-48 rounded-full"
                />{" "}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>{" "} */}
              </div>{" "}
              <div className="border-b pb-">
                {" "}
                <h1 className="text-4xl font-medium text-gray-700">
                  {user?.firstname} {user?.lastname}
                </h1>{" "}
                <p className="font-light text-gray-600 mt-3"> {user?.email}</p>{" "}
                <p className="mt-8 text-gray-500">
                  PhoneNumber -{user?.phoneno}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            {/* <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Connect
              </button>{" "}
              <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Message
              </button>{" "}
            </div>{" "} */}
          </div>{" "}
          <div className="mt-12 flex  justify-center">
            <button
              onClick={(e) => updateProfile(e)}
              className=" py-1.5 px-4 w-20 transition-colors bg-green-600 border active:bg-green-800 font-medium border-green-700 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
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
