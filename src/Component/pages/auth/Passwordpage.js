import { useFormik } from "formik";
import React from "react";
import { getpassword } from "../../helper/backend_helpers";
import * as Yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
const Passwordpage = () => {
  const currentUser = JSON.parse(localStorage.getItem("authUser"));
  const navigate = useNavigate();

  const validation = useFormik({
    initialValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Code is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().required("Confirm Password is required"),
    }),
    onSubmit: async () => {
    
      if (validation.values.password === validation.values.confirmPassword) {
        const payload = {
          email: validation.values.email,
          code: validation.values.code,
          password: validation.values.password,
        };

        const response = await getpassword(payload);

        const record = response.data;
        if (record.success) {
          localStorage.setItem("authUser", JSON.stringify(response));
          validation.values.password = "";
          validation.values.confirmPassword = "";
          toastr.success("Login Successfully", "Success");
         
        } else {
          toastr.error(record.message);
        }
        console.log(record, "record");
      }else{
        toastr.log('miss match password and confirm password');
      }
    },
  });

  return (
    <section className="h-100">
      <div className="px-6 h-full text-gray-800 py-5">
        <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6">
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <div className="mb-6 mt-5  text-black font-medium">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  navigate("/login")
                  return false;
                }}
              >
                <label>OTP</label>
                <input
                  type="text"
                  name="code"
                  onChange={validation.handleChange}
                  value={validation.values.code}
                  placeholder="Enter  otp"
                  className="mb-5 form-control block w-full px-4 py-2 text-xl font-normal text-amber-700 bg-white bg-clip-padding border border-solid border-gray-900 rounded transition ease-in-out m-0 focus:text-amber-700 focus:bg-white focus:border-amber-600 focus:outline-none"
                ></input>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={validation.handleChange}
                  value={validation.values.email}
                  placeholder="Enter  Email"
                  className="mb-5 form-control block w-full px-4 py-2 text-xl font-normal text-amber-700 bg-white bg-clip-padding border border-solid border-gray-900 rounded transition ease-in-out m-0 focus:text-amber-700 focus:bg-white focus:border-amber-600 focus:outline-none"
                ></input>

                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={validation.handleChange}
                  value={validation.values.password || ""}
                  placeholder="Enter  Password"
                  className="mb-5 form-control block w-full px-4 py-2 text-xl font-normal text-amber-700 bg-white bg-clip-padding border border-solid border-gray-900 rounded transition ease-in-out m-0 focus:text-amber-700 focus:bg-white focus:border-amber-600 focus:outline-none"
                ></input>

                <label>ConfirmPassword</label>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={validation.handleChange}
                  value={validation.values.confirmPassword || ""}
                  placeholder="Enter  ConfirmPassword"
                  className="mb-8 form-control block w-full px-4 py-2 text-xl font-normal text-amber-700 bg-white bg-clip-padding border border-solid border-gray-900 rounded transition ease-in-out m-0 focus:text-amber-700 focus:bg-white focus:border-amber-600 focus:outline-none"
                ></input>

                <div className="mt-4 flex justify-between">
                  <div></div>
                  <button
                    type="submit"
                    className="border-2 rounded-md border-black hover:text-white  px-6 font text-black py-2 shadow-xl   hover:bg-black hover:shadow-md"
                    >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Passwordpage;
