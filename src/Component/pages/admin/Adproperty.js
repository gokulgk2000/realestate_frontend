import axios from "axios";
import React, { useState } from "react";
import { AdUpload, getAdproperties } from "../../helper/backend_helpers";
import { SERVER_URL } from "../../helper/configuration";
import FileInput from "../../reusable/FileInput";
import toastr from "toastr";
import { useEffect } from "react";
import { Carousel } from "../Carousel";

const Adproperty = () => {
  const currentAdmin = JSON.parse(localStorage?.getItem("authAdmin"));
  const [adpic, setAdPic] = useState([]);
  const [adUploaderror, setAdUploadError] = useState("");
  const [adproperty, setAdProperty] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  const [adUploadSuccess, setAdUploadSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage?.getItem("authAdmin"));
  console.log(user?.adminID, "admin");

  const getAdProperty = async () => {
    const payload = {
      adminID: user?.adminID,
    };
    console.log(user?.adminID, "admin");
    const res = await getAdproperties(payload);
    if (res.success) {
      setAdProperty(res?.banner);
      setLoading(res?.banner);
    }
    console.log("payload", adproperty);
  };
  useEffect(() => {
    getAdProperty();
  }, []);

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
      adminID: user?.adminID,
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
          toastr.success(`Advertisement Upload successfully`, "success");
        } else {
          setAdUploadError(res.msg);
        }
      }
    }

    console.log("coming : ");

    setLoading(false);
  };
  const propertyImageRemove = (image) => {
    const filteredImages = adproperty?.adpic.filter(
      (img) => img !== image
    );
    setAdProperty({ ...adproperty, adpic: filteredImages });
    
  };
  return (
    <div>
      <div>
        <Carousel />
      </div>
      <div className="grid grid-cols-2">
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
        <div className="">
        <img
          className=" h-60 w-full"
          src={`${SERVER_URL}/file/${
            adproperty?.adpic ? adproperty?.adpic[currentImage]?.id : null
          }`}
        />
        <div className="grid grid-cols-3 py-3  pt-8 gap-x-2 gap-y-3">
          {adproperty?.adpic?.map((image, i) => (
            <button key={i}>
                                    <div className="relative group">
                                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            className="w-6 h-6 absolute right-0 hover:scale-110 hidden group-hover:block text-white hover:bg-amber-500"
                            onClick={() => propertyImageRemove(image)}

                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>

            <img
              src={`${SERVER_URL}/file/${image?.id}`}
              className="  h-28"
              onClick={() => setCurrentImage(i)}
            /> </div>
                    </button>
                   
          ))}
  
       
        </div>
        </div>
      </div>
    </div>
  );
};

export default Adproperty;
