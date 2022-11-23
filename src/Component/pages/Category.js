import React, { useState } from 'react'
import CategoryData from '../helper/constatnt/CategoryData';


const Category = () => {
    const [data,setData]=useState(CategoryData)


    const FilterResult = (item) => {
        const Result = CategoryData.filter((look) => {
          return look.name === item;
        });
        setData(Result);

      };
    
  return (
    <div> <div><button
 
    onClick={() => FilterResult("villas")}
  >
    Residential
  </button><br/>
  <button
   
    onClick={() => FilterResult("land")}
  >
   Land
  </button><br/>
  <button
   
    onClick={() =>setData(CategoryData)}
  >
full data
  </button><br/></div><div>
  {data.map((user,i) => {const { id,name } = user;
 return(
<div key={i}>
    <div className='grid grid-cols-2' >
        <div></div>
        <div>name={name}</div>
        <div>number={id}</div>
</div>
</div>

 )


})} </div>

  
  </div>
  )
}

export default Category