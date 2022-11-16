import React, { useState } from 'react'

const Detailspage = () => {
  const propertyPic =[{
    image:"https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
  },{ image:"https://mdbcdn.b-cdn.net/img/new/slides/042.webp"}, {image:"https://mdbcdn.b-cdn.net/img/new/slides/043.webp"}]
    const [imageIndex,setImageIndex]= useState(0);
    const handleNextClick = () =>{
        if (imageIndex <propertyPic?.length - 1) {
          setImageIndex(prevState => prevState +1)
        }
        else {
          setImageIndex(0)
        }
      }
        const handlePrevClick = () => {
          if(imageIndex < 1) {
            setImageIndex(propertyPic?.length - 1)
          }
          else {
            setImageIndex(prevState => prevState -1)
          }
        }
  return (
    <div className='sm:grid grid-cols-2 bg-emerald-50 px-10   sm:px-5'>
        <div className=''>
         <ul>
            <li>Title</li>
            <li>Location</li>
            <li>Layoutname</li>
            <li>Landarea</li>
            <li>Facing</li>
            <li>Approchroad</li>
            <li>Builtarea</li>
            <li>Bedroom</li>
            <li>Bathroom</li>
            <li>Floordetails</li>
            <li>Neartown</li>
            <li>Costsq</li>
            <li>FromSchool</li>
            <li>Fromcollage</li>
            <li>Fromhospital</li>
            <li>Frombusstand</li>
            <li>Fromgandhipuram</li>
            <li>Fromrailwaystation</li>
            <li>Fromairport</li>
            <li>Facilties</li>
            <li>Askprice</li>
            <li>propertyPic</li>
            <li>Description</li>
           
         </ul>
        </div>
        <div className='mr-2 py-10'>
          <div className='w-full select-none relative'>
        <img  src={propertyPic[imageIndex]?.image}/>
           <div id='default-carousel' className='absolute w-full   top-1/2 transform-translate-y-1/2 px-3 flex justify-between items-center'data-bs-ride="static">
          <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev >
               <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-blue-500 dark:bg-gray-800 group-hover:bg-emerald-500 dark:group-hover:bg-blue-800 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none" onClick={()=>handlePrevClick()}>
                    <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                <span className="hidden" >Previous</span>
            </span>
         </button>
    <button type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"  data-carousel-next>
        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-blue-500 dark:bg-gray-800 group-hover:bg-emerald-500 dark:group-hover:bg-blue-800 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"  onClick={()=>handleNextClick()}>
            <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" ></path></svg>
            <span className="hidden" >Next</span>
        </span>
    </button>
</div>
</div>
        </div>
        <div className="flex justify-around py-3">
                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-sans py-2 px-4 rounded " >
              Seller Contact
            </button>   </div>
    </div>
  )
}



export default Detailspage