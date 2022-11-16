import React from "react";
const Input = ({ label, type = "text", name, value,placeholder, onChange }) => {
  return (
    <div className="m-2 grid grid-rows-2 gap-2">
      <label className="capitalize">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        className="border-2 px-2 py-1  border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
  );
};
export default Input;