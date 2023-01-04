import { Breadcrumbs } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Mediators = () => {
  return (
    <div className="py-2 md:pl-32 md:pr-24">
      <Breadcrumbs className='-ml-3'>
            <Link to="/">
              <button className="opacity-60 font underline">Home</button>
            </Link>
          </Breadcrumbs>
    <div className="flex flex-col justify-center max-w-xs py-6 px-2 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
      <img
        src="https://source.unsplash.com/150x150/?portrait?3"
        alt=""
        className="w-32 h-32 mx-auto rounded-md  dark:bg-gray-500 aspect-square"
      />
      <div className="space-y-4 text-center divide-y divide-gray-700">
        <div className="my-2 space-y-1">
          <h2 className="text-xl font-semibold  text-gray-500 sm:text-2xl ">Facilitator Name</h2>
          <p className="px-5 text-xs sm:text-base dark:text-gray-400"></p>
        </div>
        <div className="flex justify-start pt-2 space-x-4 align-center">
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-5 text-gray-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
</svg>
          </div>
          <div className="font  text-gray-500">Contact -</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Mediators