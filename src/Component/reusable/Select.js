import React from "react"

const Select=({label,type='text',name,value, onChange})=>{

    return(<> <label className="capitalize">{label}</label>
      <Select type={type}
      name={name}
      value={value}
      onChange={(e)=>onChange(e)}/> </>
    )
  }
  export default Select;