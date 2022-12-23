import React from "react";
const FileInput = ({ label, name, value,placeholder, maxLength,multiple="false",accept ="png,jpg,jpeg,webp,gif",onChange,...props }) => {
//   const checkFiles=(files)   
//     if(files.length>10) {
//         alert("length exceeded; files have been truncated");

//         let list = new DataTransfer;
//         for(let i=0; i<10; i++)
//            list.items.add(files[i]) 

//         document.getElementById('files').files = list.files
       
// }
  return (
    <div className="pr-2 grid grid-rows-2 text-gray-700  gap-2">
      <label className="capitalize">{label}</label>
      <input
        type="file"
        accept={accept}
        name={name}
        multiple={multiple}
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        className="border-2 px-2 py-1  text-gray-400 border-gray-300 rounded-md  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        props
      />
    </div>
  );
};
export default FileInput;