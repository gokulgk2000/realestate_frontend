import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

import { userLogin } from '../../helper/backend_helpers'
import { useUser } from '../contextProvider/UserProvider'
const Login = () => {
 const {setCurrentUser}= useUser()
  const navigate = useNavigate()
  const [loginSuccess, setLoginSuccess] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false)

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async values => {
      setLoading(true)
      const res = await userLogin(values)
   
      if (res.success) {
        localStorage.setItem("authUser", JSON.stringify(res))
        setCurrentUser(res)
        setLoginSuccess(res?.msg)
        setLoginError("")
        navigate("/")
       
      } else {
        setLoginError(res?.msg)
        setLoginSuccess("")

      }
      setLoading(false)
     console.log(res,":gokul")
    },
  })

  
  const navigatepassword = (e) => {
    e.preventDefault();
    navigate("/forget")
    }
 

  return (
    <section className="h-100">
    <div className="px-6 h-full text-gray-800 py-5">
      <div
        className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6"
      >
       
        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <form onSubmit={e => {
                            e.preventDefault()
                            validation.handleSubmit()
                            return false
                          }}
                        >
                          {loginSuccess && (
                          <alert
                            className="text-bold text-green-500"
                            
                          >
                            {loginSuccess}
                          </alert>
                        )}
                          {loginError && (
                          <alert
                            className="text-bold text-red-500"
                          
                          >
                            {loginError}
                          </alert>
                        )}
            <div className="flex flex-row items-center justify-center lg:justify-center">
              <p className=" text-3xl text-[#f2a32b] font-bold mb-0 mr-8">Sign in </p>
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                // className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  />
                </svg> */}
              </button>
  
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                // className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
                  <path
                    fill="currentColor"
                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                  />
                </svg> */}
              </button>
  
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                // className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                  <path
                    fill="currentColor"
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                  />
                </svg> */}
              </button>
            </div>
  
            
  
            <div className="mb-6 mt-5  text-red-500">
              <input
                type="email"
                id="email"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-amber-700 bg-white bg-clip-padding border border-solid border-gray-900 rounded transition ease-in-out m-0 focus:text-amber-700 focus:bg-white focus:border-amber-600 focus:outline-none"
                placeholder="Email address"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.email || ""}
                invalid={
                  validation.touched.email &&
                  validation.errors.email
                    ? true
                    : false
                }
              />
              {validation.touched.email &&
              validation.errors.email ? (
                <formFeedback type="invalid">
                  {validation.errors.email}
                </formFeedback>
              ) : null}
            </div>
  
            <div className="mb-6  text-red-500">
              <input
                name="password"
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-amber-700 bg-white bg-clip-padding border border-solid border-gray-900 rounded transition ease-in-out m-0 focus:text-amber-700 focus:bg-white focus:border-amber-600 focus:outline-none"
                placeholder="Password"
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
  
            <div className="flex justify-between items-center mb-6"  >
              <div className="form-group form-check">
               
              </div>
              <label onClick={navigatepassword}  className="text-blue-800">Forgot password?</label>
            </div>
  
            <div className="text-center lg:text-left">
            
              {loading ?(
                 <button 
                type="button"
                className="border-2 rounded-md border-[#f2a32b] hover:bg-[#f2a32b] hover:text-white uppercase px-6 py-2 font text-black  shadow-xl    hover:shadow-md">
               
                  Login...          
                   </button>
                ):(
                 
                <button
                  type="submit"
                  className="border-2 rounded-md  border-[#f2a32b] hover:bg-[#f2a32b] hover:text-white uppercase px-6 py-2 font text-black  shadow-xl hover:shadow-md">
              
                  Login
                </button>
               
                )}
              <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                Don't have an account?
                <a
                  href="/selecteduser"
                  className="border-[#f2a32b] hover:text-[#f2a32b] text-blue-900 transition duration-200 ease-in-out ml-2"
                  >Sign Up</a>
               
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Login