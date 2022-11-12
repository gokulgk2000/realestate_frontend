import React from "react";




const  Header=()=> {
  const Head=[{name :" HOME",link:"3"},{name :" PROMOTERS",link:"3"},{name :" ABOUT COIMBATORE",link:"3"},{name :" CONTACTS",link:"3"}]
  return (
    <div> <nav class="flex items-center justify-between flex-wrap bg-teal-300 p-4 ">
    <div class="flex items-center flex-shrink-0 text-white ml-5">
      <span class="font-semibold text-4xl tracking-tight">Real Estate</span>
    </div>
    <div class="w-full block  lg:flex  lg:w-auto " >
      <div class="text-sm mr-5">
      {Head.map((ok,id)=>{
     return(
      <><a href={ok.link} className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-white ml-5">{ok?.name} </a></>
     )
    })}
       
      </div>
    </div>
  </nav>
  </div>
  )
}

export default Header