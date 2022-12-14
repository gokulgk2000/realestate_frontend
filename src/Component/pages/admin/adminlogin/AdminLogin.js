import React, { useEffect } from 'react'
import { adminLogin } from '../../../helper/backend_helpers'
import * as Yup from "yup"
import { useFormik } from "formik"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from 'postcss'
const AdminLogin = () => {
    const navigate = useNavigate()

  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false)
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your  Name"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async values => {
      setLoading(true)
      const res = await adminLogin(values)
      if (res.success) {
        console.log("res", res)
        localStorage.setItem("authAdmin", JSON.stringify(res))
        navigate("/admin")
      } else {
        setLoginError(res?.msg)
      }
      setLoading(false)
    },
  })
  
  return (
    <div className="relative flex flex-col justify-center py-4 overflow-hidden ">
     <h4 className='text-amber-700 font-semibold text-xl text-center pb-4'> WELCOME ADMIN !!!</h4>
    <div className="w-full p-6 m-auto  bg-white rounded-md shadow-xl lg:max-w-xl">
      <h1 className="text-3xl font-semibold text-center  text-amber-700 uppercase">
            Login
        </h1>
        <form className="mt-6"
         onSubmit={e => {
          e.preventDefault()
          validation.handleSubmit()
          return false
        }}>
            <div className="mb-2">
                <label
                    for="username"
                    className="block text-sm font-semibold text-gray-800"
                >
                    User Name
                </label>
                <input
                     type="text"
                     name='username'
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-amber-400 focus:ring-amber-100 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Enter Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username &&
                            validation.errors.username
                              ? true
                              : false
                          }
                        />
                        {validation.touched.username &&
                        validation.errors.username ? (
                          <formFeedback type="invalid">
                            {validation.errors.username}
                          </formFeedback>
                        ) : null}
                
            </div>
            <div className="mb-2">
                <label
                    for="password"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Password
                </label>
                <input
                   type="password"
                   name='password'
                   className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-amber-400 focus:ring-amber-100 focus:outline-none focus:ring focus:ring-opacity-40"
                   placeholder="Enter password"
                      onChange={validation.handleChange}
                         onBlur={validation.handleBlur}
                         value={validation.values.password || ""}
                         invalid={
                           validation.touched.password &&
                           validation.errors.password
                             ? true
                             : false
                         }
                       />
                       {validation.touched.password &&
                       validation.errors.password ? (
                         <formFeedback type="invalid">
                           {validation.errors.password}
                         </formFeedback>
                       ) : null}
               
            </div>
           
            <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform grad-btn">
                    Login
                </button>
            </div>
        </form>
    </div>
</div>
);
}

export default AdminLogin