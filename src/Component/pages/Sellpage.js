import React, { useState } from 'react'


const Sell = () => {

    const [detail,setDetail]=useState(
{
Location:'',
Layoutname:'',
LandArea:''
})
    
    const handleChange=(e)=>{
          {/**    const name=e.target.name;
        const value=e.target.value */}
    const {name,value}=e.target
       setDetail((pre)=>{
        return{...pre,[name]:value};
       })
    };
    const handleSubmit=(e)=>{
        e.preventDefault();  
    console.log(detail)}
  return (
    <form onSubmit={handleSubmit}>
        <h3>Location: </h3><span><input type='text' name='location'  onChange={handleChange}/></span>
        <h3>Layoutname: </h3><span><input type='text' name='Layoutname'  onChange={handleChange}/></span>
        <h3>LandArea: </h3><span><input type='text' name='LandArea'  onChange={handleChange}/></span>
         <button type='submit'>Submit</button>
        </form>
  )
}

export default Sell