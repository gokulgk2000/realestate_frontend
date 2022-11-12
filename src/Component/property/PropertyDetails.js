
import { useState } from "react";
const useForm = (InitialFormValues) => {
    const [values,setValues]=useState(InitialFormValues)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });}
  return {handleInputChange}
    
  
}

export default useForm;