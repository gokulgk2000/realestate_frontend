import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import { useRef } from "react";
import { getforget, getUserById } from "../../helper/backend_helpers";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

const Forgetpassword = () => {
  const validation = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
    }),
  });

  const emailRef = useRef();
  const navigate = useNavigate();

  //   const getUserName = async () => {
  //     const res = await getUserById({
  //       userID: userFromStorage?.userID,
  //     });
  //     if (res.success) {
  //       setUser(res.User);

  //       // console.log("res", res);
  //     }
  //   };
  //   useEffect(() => {
  //     getUserName();
  //   }, []);
  const sendotp = async (e) => {
    e.preventDefault();
    navigate("/password");
    const payload = {
      email: validation.values.email,
    };
    const response = await getforget(payload);
    const record = response.data;
    if (record.statusText === " success") {
      toastr.success(record.message);
    } else {
      toastr.error(record.message);
    }
  };

  return (
    <section className="h-100">
      <div className="px-6 h-full text-gray-800 py-5">
        <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6">
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <div className="flex flex-row items-center justify-center lg:justify-center">
              <p className=" text-3xl text-red-500 font-bold mb-0 mr-8">
                Reset Password
              </p>
            </div>
            <div className="mb-6 mt-5  text-red-500">
              <input
                type="email"
                name="email"
                onChange={validation.handleChange}
                value={validation.values.email}
                placeholder="Enter your email address"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-amber-700 bg-white bg-clip-padding border border-solid border-gray-900 rounded transition ease-in-out m-0 focus:text-amber-700 focus:bg-white focus:border-amber-600 focus:outline-none"
              ></input>
            </div>
            <div className="flex justify-between">
              <div>

              </div>
              <button
                onClick={sendotp}
                className="border-2 rounded-md border-[#a48641] hover:bg-[#a48641] hover:text-white  px-4 font text-black py-2 shadow-xl  hover:shadow-md"
                >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forgetpassword;
