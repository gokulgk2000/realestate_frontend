import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userRegisteration } from "../../helper/backend_helpers";

const SellerRegister = () => {
  const facilities = [
    { value: "promotors", text: "Promotors " },
    { value: "facilator", text: "Mediators " },
  ]
  const navigate = useNavigate();

  const [registrationError, setRegistrationError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState("");
  const [loading, setLoading] = useState(true)
 
  //form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role:""
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your firstname"),
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string()
        .required("Please Enter Your Password")

        .matches(/^(?=.{5,})/, "Must Contain 5 Characters"),
    }),
    onSubmit: async (values, onSubmitProps) => {
      setLoading(true)
      //   dispatch(registerUser({ ...values, aflag: true }))
      const res = await userRegisteration({ ...values, aflag: true });
      if (res.success) {
        // localStorage.setItem("user",JSON.stringify(res))
        setRegistrationSuccess(res.msg);
        setRegistrationError("");
        console.log(res, "res");
        onSubmitProps.resetForm();
        navigate("/login");
      } else {
        setRegistrationSuccess("");
        setRegistrationError(res.msg);
        console.log("Response:", res);
      }
      setLoading(false)
    },
  });

  return (
    <section className="h-100">
      <div className="px-6 h-full text-gray-800 py-5">
        <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6  ">
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              {registrationSuccess && (
                <span className="text-bold text-center text-green-600">
                  {registrationSuccess}
                </span>
              )}
              {registrationError && (
                <span className="text-bold text-center text-red-600">
                  {registrationError}
                </span>
              )}
              <div className="flex flex-row items-center justify-center lg:justify-center">
                <p className=" text-3xl text-[#f2a32b] font-bold mb-0 mr-8">
                Sign Up
                </p>
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                ></button>

                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                ></button>

                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                ></button>
              </div>
               <div className="mb-6 pt-5 ">
                <label>You are</label>

                      
        {facilities.map((option, i) => (

<div className="flex justify-start" 
    key={i}>
   
        <div className="flex items-center pl-3">
            <input
             id="radio"  
             type="radio" 
             name="role"
             value={option?.value}
             className="w-4 h-4  text-blue-600 " 
             onChange={validation.handleChange}
           
          />
            <label for="radio" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300" >{option?.text}</label>
        
    </div>
</div>
))}
               </div>
              <div className="mb-4 pt-2   text-red-500">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="First Name "
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.firstname || ""}
                  invalid={
                    validation.touched.firstname && validation.errors.firstname
                      ? true
                      : false
                  }
                />
                {validation.touched.firstname && validation.errors.firstname ? (
                  <formFeedback type="invalid">
                    {validation.errors.firstname}
                  </formFeedback>
                ) : null}
              </div>
              <div className="mb-6  text-red-500">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Last Name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.lastname || ""}
                  invalid={
                    validation.touched.lastname && validation.errors.lastname
                      ? true
                      : false
                  }
                />
                {validation.touched.lastname && validation.errors.lastname ? (
                  <formFeedback type="invalid">
                    {validation.errors.lastname}
                  </formFeedback>
                ) : null}
              </div>
              <div className="mb-6  text-red-500">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email || ""}
                  invalid={
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                />
                {validation.touched.email && validation.errors.email ? (
                  <formFeedback type="invalid">
                    {validation.errors.email}
                  </formFeedback>
                ) : null}
              </div>

              <div className="mb-6  text-red-500">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.password || ""}
                  invalid={
                    validation.touched.password && validation.errors.password
                      ? true
                      : false
                  }
                />
                {validation.touched.password && validation.errors.password ? (
                  <formFeedback type="invalid">
                    {validation.errors.password}
                  </formFeedback>
                ) : null}
              </div>

              <div className="text-center lg:text-left">
                {loading ?(
                <button
                  type="submit"
                  className="border-2 rounded-md border-[#f2a32b] hover:bg-[#f2a32b] hover:text-white  uppercase px-5 py-2 font text-[#f2a32b]  shadow-xl    hover:shadow-md">
                
                  Register
                </button>
                ):(

                <button 
                type="button"
                className="border-2 rounded-md border-[#f2a32b] hover:bg-[#f2a32b] hover:text-white   px-5 py-2 font text-[#f2a32b]  shadow-xl    hover:shadow-md">
               
                   Registering...
          
                   </button>
                )}
                <p className="text-sm font-semibold mt-2 pt-1 mb-0 ">
                  You have an account?
                  <Link
                    to="/login"
                    className="border-[#f2a32b] hover:text-[#f2a32b] text-blue-900 transition duration-200 ease-in-out ml-2"
                  >
                    Login Here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerRegister;
