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
    <div className="pr-2  text-gray-700  ">
      <label className="capitaliz ">{label}</label>
      <input
        type="file"
        accept={accept}
        name={name}
        multiple={multiple}
        maxLength={maxLength}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        className="block py-2 px-2  w-60 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black hover:shadow-2xl
        hover:bg-white appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0  peer"
        props
      />
    </div>
  );
};
export default FileInput;