import axios from "axios";
import React, { useState } from "react";
import { AdUpload } from "../../helper/backend_helpers";
import { SERVER_URL } from "../../helper/configuration";
import FileInput from "../../reusable/FileInput";

const Adproperty = () => {
  const currentAdmin = JSON.parse(localStorage?.getItem("authAdmin"));
  const [adpic, setAdPic] = useState([]);
  const [adUploaderror, setAdUploadError] = useState("");
  const [adUploadSuccess, setAdUploadSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage?.getItem("authAdmin"));
console.log(user?.adminID,"admin")
  const handleImageUpload = async (e) => {
    const target = e.target;
    // console.log("images length : ",)
    if ([...target.files]?.length > 5) {
      alert("'Property Images Limit is 5 ' ");
    } else if ([...target.files]?.length < 2) {
      alert("'Property Images Must be Atleast  * 2 * ' ");
    } else {
      const allImages = [...target.files].map((f) => f);
      setAdPic(allImages);
    }
  };
  const handleAdUpload = async () => {
    const picIds = [];
   
    const payloadData = {
        adminID:user?.adminID
    };
   
    if (adpic?.length > 0) {
      const formData = new FormData();
      for (var i = 0; i < adpic.length; i++) {
        formData.append("file", adpic[i]);
      }
      const fileUploadRes = await axios.post(`${SERVER_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        
      });
   
      const { data } = fileUploadRes;
      if (data?.success) {
        data.files?.map((file) =>
          picIds.push({
            type: file?.contentType,
            size: file?.size,
            id: file?.id,
            name: file?.originalname,
            dbName: file?.filename,
            aflag: true,
          })
        );
        payloadData.adpic = picIds;
        const res = await AdUpload(payloadData);

        if (res.success) {
          setAdUploadSuccess(res.msg);
        } 
        else {
            setAdUploadError(res.msg);
          }
      }
    }
    
console.log("coming : ",)
 
    setLoading(false);
  };
  return (
    <div className="mt-5 pl-5 ">
      <FileInput
        label=" Ad Images"
        multiple={true}
        maxLength={5}
        minLength={2}
        accept=".png, .jpg, .jpeg,.pdf,.webp"
        onChange={handleImageUpload}
      />
      <button
        type="submit"
        className="w-44 my-3 font bg-amber-700 hover:bg-amber-900 text-white font-light py-1 px-1 rounded mb-20"
        onClick={handleAdUpload}
      >
        Submit
      </button>
    </div>
  );
};

export default Adproperty;
