import React from 'react'
import useForm from './PropertyDetails'

const Input = ({Title},{text},{name},{valuename},{handleInputChange}) => {
  return (
    <div><label>{Title}</label>
    <input type={text} name={name} value={valuename}
    
    onChange={(e)=>{handleInputChange}}/></div>
  )
}

export default Input