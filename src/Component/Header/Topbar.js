import React from 'react'

const NAVITEMS =[{name:"BUY",link:"#"},{name:"SALE",link:"#"},{name:"RENT",link:"#"}]

export const Topbar = () => {
  return (
    <div><nav className=''>
{/*         
        <a href="#" className='ml-2 text-blue-600 hover:text-green-600 '>BUY</a>
<a  href="#" className='ml-2 text-blue-600 hover:underline hover:text-green-600'>SALE</a>
<a href="#" className='ml-2 text-blue-600 hover:underline hover:text-green-600'>RENT</a> */}
<div className='flex gap-2 justify-center'>
    {NAVITEMS.map((item,i) =>(
        <a href={item?.link} className='text-blue-600 hover:underline hover:text-green-600'>{item?.name}</a>
    ))}
</div>
        
        </nav></div>
  )
}
