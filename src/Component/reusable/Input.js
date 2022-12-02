import React from "react";

const Input = ({ label, type = "text", name, value,placeholder, onChange,...props }) =>

 {
  return (
    <div className="m-2 grid grid-rows-2 gap-2">
      <label className=" text-gray-700 capitalize">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        className="border-2 px-2 py-1 text-gray-700 border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      props
      />
    </div>
  );
};
export default Input;