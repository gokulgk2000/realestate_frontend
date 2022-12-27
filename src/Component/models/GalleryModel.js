import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getProById, getPropertyById } from "../helper/backend_helpers";
import { SERVER_URL } from "../helper/configuration";
import { useQuery } from "../helper/hook/useQuery";
import PropTypes from "prop-types";

const GalleryModel = ({ onCloseClick }) => {
  const query = useQuery();
  const [property, setproperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [curentImage, setcurentImage] = useState(0);
  const [propertyId, setPropertyId] = useState([]);

  const propertyDetails = async () => {
    const res = await getPropertyById({ propertyId: query.get("uid") });

    if (res.success) {
      setproperty(res?.property);
      console.log("data", res);
    } else {
      console.log("Error while fetching property");
    }
  };
  useEffect(() => {
    const handleProperty = async () => {
      setLoading(true);
      await propertyDetails();
      setLoading(false);
    };
    handleProperty();
  }, []);
  const handleBook = async (proId) => {
    const payload = {
      propertyId: proId,
    };
    const res = await getProById(payload);
    if (res.success) {
      setPropertyId(res.Property);
      console.log("fmsg", res);
    } else {
      console.log("Failed to fetch message", res);
    }
  };

  return (
    <div
      className='className="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"'
    >
      <div className=" inset-0 bg-slate-100 bg-opacity-100 transition-opacity md:pl-36  md:pr-24 md:py-24 md:fixed md:z-10 sm:static px-5">
        <div className=" flex justify-between pr-3 ">
          {" "}
          <div className="flex justify-between  pl- ">
          <svg viewBox="0 0 312 511.42 " className="h-6 w-6 hidden md:block cursor-pointer" onClick={onCloseClick}>
                <path
                  fill-rule="nonzero"
                  d="M306.3 32.62 65.46 252.86 312 478.8l-29.84 32.62L0 252.83 276.46 0z"
                />
              </svg>{" "}  <span className="text-md pt-0 font text-gray-600 capitalize">
             
              {property?.bedRoom}BHK {property?.title} For sale{" "}
            </span>{" "}
            <span className="font text-lg capitalize md:pl-2 underline ">
              {property?.streetName}, {property?.location}
            </span>
          </div>
          {/* <svg
            className="h-6 w-6 hover:shadow-2xl hover:text-red-300 cursor-pointer"
            viewBox="0 0 512 508.33"
            onClick={onCloseClick}
          >
            <path
              fill="#EB0100"
              d="M317.99 323.62c-17.23-19.89-35.3-40.09-54.23-60.09-62.06 59.35-119.53 126.18-161.12 201.73-51.02 92.68-126.31 16.84-92.15-50.33 27.46-61.28 98.07-146.3 182.94-220.07-46.74-41.72-97.97-79.34-154.08-107.07C-42.76 47.2 19.97-20.82 79.37 6.16c50.04 19.82 119.09 70.85 182.26 134.32 63.11-45.86 129.55-81.8 189.45-95.87 13-3.06 50.95-11.33 59.69 1.04 3.29 4.67-.33 11.68-7.08 19.29-22.99 25.96-84.78 67.12-114.72 90.82-21.61 17.11-43.55 34.99-65.37 53.71 23.2 28.81 43.94 58.64 60.47 88.17 14.37 25.66 25.55 51.1 32.42 75.46 3.14 11.13 11.75 43.64 1.38 51.66-3.91 3.03-10.11.16-16.95-5.38-23.34-18.89-61.29-70.77-82.93-95.76z"
            />
          </svg> */}
        </div>
        <div className="  grid  md:grid-cols-6 gap-x-2 gap-y-2 md:pr">
          <div className="col-span-6  grid gap-x- gap-y-6 md:grid-cols-3">
            {property?.propertyPic?.length > 0 &&
              property?.propertyPic?.map((image, j) => (
                <button key={j}>
                  <div className="">
                    <img
                      src={`${SERVER_URL}/file/${image.id}`}
                      className="md:h-72 md:w-96 w-96 h-72 rounded-md"
                      onClick={() => setcurentImage(j)}
                    />
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
GalleryModel.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any,
};
export default GalleryModel;
