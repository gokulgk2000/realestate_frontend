import React from "react";
const FileInput = ({ label, name, value,placeholder, multiple="false",accept ="*",onChange,...props }) => {
  return (
    <div className="pr-2 grid grid-rows-2 gap-2">
      <label className="capitalize">{label}</label>
      <input
        type="file"
        accept={accept}
        name={name}
        multiple={multiple}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        className="border-2 px-2 py-1  border-gray-300 rounded-md  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        props
      />
    </div>
  );
};
export default FileInput;