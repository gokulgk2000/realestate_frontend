import React from "react";

const Input = ({ label, type = "text", name, value,placeholder, onChange,...props }) =>

 {
  return (
    <div className=" grid grid-rows-2 gap-2">
      <label className=" text-gray-700 capitalize">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        className="block py-1 px-0 w-60 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer"
      props
      />
    </div>
  );
};
export default Input;