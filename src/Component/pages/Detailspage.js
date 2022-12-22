import React, { useEffect, useState } from "react";
import { getProById, getPropertyById } from "../helper/backend_helpers";
import { SERVER_URL } from "../helper/configuration";
import { mobile, monitor, pc, tab } from "../helper/constatnt/ScreenSize";
import useMediaQuery from "../helper/hook/useMediaQuery";
import { useModal } from "../helper/hook/useModal";
import { useQuery } from "../helper/hook/useQuery";
import BuyerModal from "../models/BuyerModal";

const Detailspage = (props) => {
  const [isBiggerthanPC] = useMediaQuery(monitor);
  const [isBiggerthanTwo] = useMediaQuery(monitor, mobile);

  const query = useQuery();
  const [loading, setLoading] = useState(true);
  const [property, setproperty] = useState({});
  const [curentImage, setcurentImage] = useState(0);
  const [propertyId, setPropertyId] = useState([]);

  const [modalOpen, setModalOpen] = useModal();
  const propertyPicLength = property?.propertyPic?.length;
  const propertyDetails = async () => {
    const res = await getPropertyById({ propertyId: query.get("uid") });

    if (res.success) {
      setproperty(res?.property);
      console.log("data", res);
    } else {
      console.log("Error while fetching property");
    }
  };
  const nextImageOnClick = () => {
    if (curentImage < propertyPicLength - 1) {
      setcurentImage(curentImage + 1);
    } else setcurentImage(0);
  };

  const prevImageOnClick = () => {
    if (curentImage > 0) {
      setcurentImage((prev) => prev - 1);
    } else setcurentImage(propertyPicLength - 1);
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
    <>
      {loading ? (
        <div className="flex justify-center py-5  "> Loading...</div>
      ) : (
        <div>
          {modalOpen && (
            <BuyerModal
              show={modalOpen}
              onCloseClick={() => setModalOpen(false)}
              currentProperty={propertyId?._id}
            />
          )}
          <div className=" lg:pt-28 lg:pr-10 lg:pl-10 pb-5 ">
            <div className="py-4 px-8 bg-white shadow-lg ">
              <div className="text-2xl semibold font text-amber-700 py-2 flex">
                {property?.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div className=" md:grid   grid-cols-3 ">
                {" "}
                <div className="">
                  {isBiggerthanTwo ? (
                    <div className="absolute grid">
                      <div className="md:flex mt-44 md:space-x-48 hidden  xl:space-x-80 md:pl-6  lg:pl-15">
                        {" "}
                        <button
                          className="  "
                          onClick={() => prevImageOnClick()}
                        >
                          <svg
                            version="1.1"
                            id="Layer_1"
                            className="w-9 h-9 bg-white hover:bg-am rounded-full hover:bg-amber-400 "
                            viewBox="0 0 122.88 122.88"
                          >
                            <g>
                              <path d="M84.93,4.66C77.69,1.66,69.75,0,61.44,0C44.48,0,29.11,6.88,18,18C12.34,23.65,7.77,30.42,4.66,37.95 C1.66,45.19,0,53.13,0,61.44c0,16.96,6.88,32.33,18,43.44c5.66,5.66,12.43,10.22,19.95,13.34c7.24,3,15.18,4.66,23.49,4.66 c8.31,0,16.25-1.66,23.49-4.66c7.53-3.12,14.29-7.68,19.95-13.34c5.66-5.66,10.22-12.43,13.34-19.95c3-7.24,4.66-15.18,4.66-23.49 c0-8.31-1.66-16.25-4.66-23.49c-3.12-7.53-7.68-14.29-13.34-19.95C99.22,12.34,92.46,7.77,84.93,4.66L84.93,4.66z M65.85,47.13 c2.48-2.52,2.45-6.58-0.08-9.05s-6.58-2.45-9.05,0.08L38.05,57.13c-2.45,2.5-2.45,6.49,0,8.98l18.32,18.62 c2.48,2.52,6.53,2.55,9.05,0.08c2.52-2.48,2.55-6.53,0.08-9.05l-7.73-7.85l22-0.13c3.54-0.03,6.38-2.92,6.35-6.46 c-0.03-3.54-2.92-6.38-6.46-6.35l-21.63,0.13L65.85,47.13L65.85,47.13z M80.02,16.55c5.93,2.46,11.28,6.07,15.76,10.55 c4.48,4.48,8.09,9.83,10.55,15.76c2.37,5.71,3.67,11.99,3.67,18.58c0,6.59-1.31,12.86-3.67,18.58 c-2.46,5.93-6.07,11.28-10.55,15.76c-4.48,4.48-9.83,8.09-15.76,10.55C74.3,108.69,68.03,110,61.44,110s-12.86-1.31-18.58-3.67 c-5.93-2.46-11.28-6.07-15.76-10.55c-4.48-4.48-8.09-9.82-10.55-15.76c-2.37-5.71-3.67-11.99-3.67-18.58 c0-6.59,1.31-12.86,3.67-18.58c2.46-5.93,6.07-11.28,10.55-15.76c4.48-4.48,9.83-8.09,15.76-10.55c5.71-2.37,11.99-3.67,18.58-3.67 C68.03,12.88,74.3,14.19,80.02,16.55L80.02,16.55z" />
                            </g>
                          </svg>
                        </button>
                        <button className=" ">
                          {" "}
                          <div className=" ">
                            <button
                              className=""
                              onClick={() => nextImageOnClick()}
                            >
                              <svg
                                version="1.1"
                                id="Layer_1"
                                className="w-9 h-9 bg-white hover:bg-am rounded-full hover:bg-amber-400 "
                                viewBox="0 0 122.88 122.88"
                              >
                                <g>
                                  <path d="M37.95,4.66C45.19,1.66,53.13,0,61.44,0c16.96,0,32.33,6.88,43.44,18c5.66,5.66,10.22,12.43,13.34,19.95 c3,7.24,4.66,15.18,4.66,23.49c0,16.96-6.88,32.33-18,43.44c-5.66,5.66-12.43,10.22-19.95,13.34c-7.24,3-15.18,4.66-23.49,4.66 c-8.31,0-16.25-1.66-23.49-4.66c-7.53-3.12-14.29-7.68-19.95-13.34C12.34,99.22,7.77,92.46,4.66,84.93C1.66,77.69,0,69.75,0,61.44 c0-8.31,1.66-16.25,4.66-23.49C7.77,30.42,12.34,23.66,18,18C23.65,12.34,30.42,7.77,37.95,4.66L37.95,4.66z M43.11,67.76 c-3.54-0.03-6.38-2.92-6.35-6.46c0.03-3.54,2.92-6.38,6.46-6.35l21.63,0.13l-7.82-7.95c-2.48-2.52-2.45-6.58,0.07-9.05 c2.52-2.48,6.57-2.45,9.05,0.08l18.67,18.97c2.45,2.5,2.45,6.49,0,8.98L66.52,84.72c-2.48,2.52-6.53,2.55-9.05,0.08 c-2.52-2.48-2.55-6.53-0.08-9.05l7.73-7.85L43.11,67.76L43.11,67.76z M42.86,16.55c-5.93,2.46-11.28,6.07-15.76,10.55 c-4.48,4.48-8.09,9.83-10.55,15.76c-2.37,5.71-3.67,11.99-3.67,18.58c0,6.59,1.31,12.86,3.67,18.58 c2.46,5.93,6.07,11.28,10.55,15.76c4.48,4.48,9.83,8.09,15.76,10.55c5.72,2.37,11.99,3.67,18.58,3.67c6.59,0,12.86-1.31,18.58-3.67 c5.93-2.46,11.28-6.07,15.76-10.55c4.48-4.48,8.09-9.82,10.55-15.76c2.37-5.71,3.67-11.99,3.67-18.58c0-6.59-1.31-12.86-3.67-18.58 c-2.46-5.93-6.07-11.28-10.55-15.76c-4.48-4.48-9.83-8.09-15.76-10.55c-5.71-2.37-11.99-3.67-18.58-3.67S48.58,14.19,42.86,16.55 L42.86,16.55z" />
                                </g>
                              </svg>
                            </button>
                          </div>
                        </button>
                      </div>{" "}
                    </div>
                  ) : (
                    <div className="absolute grid">
                      <div className="md:flex mt-44 md:space-x-64 2xl:space-x-44 lg:space-x-44  hidden pl-16">
                        {" "}
                        <button>
                          {" "}
                          <div className="   ">
                            <button
                              className=" "
                              onClick={() => prevImageOnClick()}
                            >
                              <svg
                                version="1.1"
                                id="Layer_1"
                                className="w-9 h-9 bg-white hover:bg-am rounded-full hover:bg-amber-400 "
                                viewBox="0 0 122.88 122.88"
                              >
                                <g>
                                  <path d="M84.93,4.66C77.69,1.66,69.75,0,61.44,0C44.48,0,29.11,6.88,18,18C12.34,23.65,7.77,30.42,4.66,37.95 C1.66,45.19,0,53.13,0,61.44c0,16.96,6.88,32.33,18,43.44c5.66,5.66,12.43,10.22,19.95,13.34c7.24,3,15.18,4.66,23.49,4.66 c8.31,0,16.25-1.66,23.49-4.66c7.53-3.12,14.29-7.68,19.95-13.34c5.66-5.66,10.22-12.43,13.34-19.95c3-7.24,4.66-15.18,4.66-23.49 c0-8.31-1.66-16.25-4.66-23.49c-3.12-7.53-7.68-14.29-13.34-19.95C99.22,12.34,92.46,7.77,84.93,4.66L84.93,4.66z M65.85,47.13 c2.48-2.52,2.45-6.58-0.08-9.05s-6.58-2.45-9.05,0.08L38.05,57.13c-2.45,2.5-2.45,6.49,0,8.98l18.32,18.62 c2.48,2.52,6.53,2.55,9.05,0.08c2.52-2.48,2.55-6.53,0.08-9.05l-7.73-7.85l22-0.13c3.54-0.03,6.38-2.92,6.35-6.46 c-0.03-3.54-2.92-6.38-6.46-6.35l-21.63,0.13L65.85,47.13L65.85,47.13z M80.02,16.55c5.93,2.46,11.28,6.07,15.76,10.55 c4.48,4.48,8.09,9.83,10.55,15.76c2.37,5.71,3.67,11.99,3.67,18.58c0,6.59-1.31,12.86-3.67,18.58 c-2.46,5.93-6.07,11.28-10.55,15.76c-4.48,4.48-9.83,8.09-15.76,10.55C74.3,108.69,68.03,110,61.44,110s-12.86-1.31-18.58-3.67 c-5.93-2.46-11.28-6.07-15.76-10.55c-4.48-4.48-8.09-9.82-10.55-15.76c-2.37-5.71-3.67-11.99-3.67-18.58 c0-6.59,1.31-12.86,3.67-18.58c2.46-5.93,6.07-11.28,10.55-15.76c4.48-4.48,9.83-8.09,15.76-10.55c5.71-2.37,11.99-3.67,18.58-3.67 C68.03,12.88,74.3,14.19,80.02,16.55L80.02,16.55z" />
                                </g>
                              </svg>
                            </button>
                          </div>
                        </button>
                        <button className=" ">
                          {" "}
                          <div className="">
                            <button
                              className=""
                              onClick={() => nextImageOnClick()}
                            >
                              <svg
                                version="1.1"
                                id="Layer_1"
                                className="w-9 h-9 bg-white hover:bg-am rounded-full hover:bg-amber-400 "
                                viewBox="0 0 122.88 122.88"
                              >
                                <g>
                                  <path d="M37.95,4.66C45.19,1.66,53.13,0,61.44,0c16.96,0,32.33,6.88,43.44,18c5.66,5.66,10.22,12.43,13.34,19.95 c3,7.24,4.66,15.18,4.66,23.49c0,16.96-6.88,32.33-18,43.44c-5.66,5.66-12.43,10.22-19.95,13.34c-7.24,3-15.18,4.66-23.49,4.66 c-8.31,0-16.25-1.66-23.49-4.66c-7.53-3.12-14.29-7.68-19.95-13.34C12.34,99.22,7.77,92.46,4.66,84.93C1.66,77.69,0,69.75,0,61.44 c0-8.31,1.66-16.25,4.66-23.49C7.77,30.42,12.34,23.66,18,18C23.65,12.34,30.42,7.77,37.95,4.66L37.95,4.66z M43.11,67.76 c-3.54-0.03-6.38-2.92-6.35-6.46c0.03-3.54,2.92-6.38,6.46-6.35l21.63,0.13l-7.82-7.95c-2.48-2.52-2.45-6.58,0.07-9.05 c2.52-2.48,6.57-2.45,9.05,0.08l18.67,18.97c2.45,2.5,2.45,6.49,0,8.98L66.52,84.72c-2.48,2.52-6.53,2.55-9.05,0.08 c-2.52-2.48-2.55-6.53-0.08-9.05l7.73-7.85L43.11,67.76L43.11,67.76z M42.86,16.55c-5.93,2.46-11.28,6.07-15.76,10.55 c-4.48,4.48-8.09,9.83-10.55,15.76c-2.37,5.71-3.67,11.99-3.67,18.58c0,6.59,1.31,12.86,3.67,18.58 c2.46,5.93,6.07,11.28,10.55,15.76c4.48,4.48,9.83,8.09,15.76,10.55c5.72,2.37,11.99,3.67,18.58,3.67c6.59,0,12.86-1.31,18.58-3.67 c5.93-2.46,11.28-6.07,15.76-10.55c4.48-4.48,8.09-9.82,10.55-15.76c2.37-5.71,3.67-11.99,3.67-18.58c0-6.59-1.31-12.86-3.67-18.58 c-2.46-5.93-6.07-11.28-10.55-15.76c-4.48-4.48-9.83-8.09-15.76-10.55c-5.71-2.37-11.99-3.67-18.58-3.67S48.58,14.19,42.86,16.55 L42.86,16.55z" />
                                </g>
                              </svg>
                            </button>
                          </div>
                        </button>
                      </div>{" "}
                    </div>
                  )}
                  <div>
                    <img
                      className=" aspect-[3/2] md:pr-5 md:h-96 "
                      src={`${SERVER_URL}/file/${property?.propertyPic[curentImage]?.id}`}
                    />
                  </div>

                  <div className="text-center">
                    {" "}
                    {property?.propertyPic.map((image, j) => (
                      <span
                        key={j}
                        className={`${
                          curentImage === j ? "text-red-500" : "text-gray-300"
                        } cursor-pointer px-0.5`}
                        onClick={() => setcurentImage(j)}
                      >
                        ●
                      </span>
                    ))}
                  </div>
                  <div className=" md:pt-10 flex justify-center">
                    <button
                      className="border-2 border-amber-800 hover:text-white rounded-sm px-2 font text-amber-800 py-2 shadow-xl   hover:bg-yellow-900 hover:shadow-md"
                      onClick={() =>
                        handleBook(property?._id) && setModalOpen(true)
                      }
                    >
                      Contact
                    </button>
                  </div>
                </div>
                <br className="md:hidden " />
                <div className=" md:col-span-2 bg-white border-none -mt-5 ">
                  <details
                    class="txt-shadow open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-2 rounded-lg"
                    open
                  >
                    <summary class="text-sm text-amber-700 leading-6  dark:text-white font-semibold select-none">
                      Property Details
                    </summary>
                    <div className="  rounded-2xl  capitalize  ">
                      <div className="md:grid md:grid-cols-2 md:gap-5 px-4 font  txt-shadow hidden">
                        <table className="leading-10 ">
                          <tr>
                            <td>Seller </td>
                            <td className="text-amber-700    dark:text-white">
                              {property?.Seller}
                            </td>
                          </tr>
                          <tr>
                            <td>Location </td>
                            <td className="text-amber-700">
                              {" "}
                              {property?.location} ,{property?.streetName}
                            </td>
                          </tr>
                          <tr>
                            <td>Layoutname </td>
                            <td className="text-amber-700">
                              {property?.layoutName}
                            </td>
                          </tr>
                          <tr>
                            <td>landArea </td>
                            <td className="text-amber-700">
                              {property?.landArea}
                            </td>
                          </tr>
                          <tr>
                            <td> Property Type </td>
                            <td className="text-amber-700">
                              {property?.category?.name}
                            </td>
                          </tr>

                          <tr>
                            <td>facing </td>
                            <td className="text-amber-700">
                              {property?.facing}
                            </td>
                          </tr>
                          <tr>
                            <td>approachRoad </td>
                            <td className="text-amber-700">
                              {property?.approachRoad}
                            </td>{" "}
                          </tr>
                        </table>

                        <table>
                          <tr>
                            <td>builtArea </td>
                            <td className="text-amber-700">
                              {property?.builtArea}
                            </td>
                          </tr>
                          <tr>
                            <td>bedRoom </td>
                            <td className="text-amber-700">
                              {property?.bedRoom}
                            </td>
                          </tr>
                          <tr>
                            <td>floorDetails </td>
                            <td className="text-amber-700">
                              {property?.floorDetails}
                            </td>
                          </tr>

                          <tr>
                            <td>askPrice </td>
                            <td className="text-amber-700">
                              {property?.askPrice}
                            </td>
                          </tr>
                          <tr>
                            <td>nearTown </td>
                            <td className="text-amber-700">
                              {property?.nearTown}
                            </td>
                          </tr>
                          <tr>
                            <td>Costsq </td>
                            <td className="text-amber-700">
                              {" "}
                              ₹.{property?.costSq}sft
                            </td>
                          </tr>
                          <tr className=" truncate">
                            <td>facilities </td>
                            <td className="text-amber-700  overflow-hidden text-ellipsis whitespace-wrap w-72 ">
                              {property?.facilities}
                            </td>
                          </tr>
                        </table>
                      </div>
{/* Mobile view */}
                      <div className="grid md:grid-cols-1  px-1 text-base font-medium  md:hidden ">
                        <table className="text-base leading-10">
                        <tr> <td>Seller </td>
                          <td className="text-amber-700  text-base  dark:text-white">
                            {property?.Seller}
                          </td></tr> 
                          <tr>
                            <td>Location </td>
                            <td className="text-amber-700 ">
                              {" "}
                              {property?.location} ,
                            
                            </td>
                          </tr>
                          <tr> <td>streetName </td>
                          <td className="text-amber-700">
                            {property?.streetName}
                          </td></tr> 
                          <tr> <td>Layoutname </td>
                          <td className="text-amber-700">
                            {property?.layoutName}
                          </td></tr> 
                          <tr>
                            <td>landArea </td>
                            <td className="text-amber-700">
                              {property?.landArea}
                            </td>
                          </tr>
                          <tr>
                            <td> Property Type </td>
                            <td className="text-amber-700">
                              {property?.category?.name}
                            </td>
                          </tr>
                          <tr>
                            <td>facing </td>
                            <td className="text-amber-700">
                              {property?.facing}
                            </td>
                          </tr>
                          <tr>
                            <td>approachRoad </td>
                            <td className="text-amber-700">
                              {property?.approachRoad}
                            </td>{" "}
                          </tr>
                          <tr>
                            {" "}
                            <td>builtArea </td>
                            <td className="text-amber-700">
                              {property?.builtArea}
                            </td>
                          </tr>{" "}
                         <tr> <td>bedRoom </td>
                          <td className="text-amber-700">
                            {property?.bedRoom}
                          </td>{" "}</tr>
                      <tr>    <td>floorDetails </td>
                          <td className="text-amber-700">
                            {property?.floorDetails}
                          </td>{" "}</tr>
                        <tr><td>askPrice </td>
                          <td className="text-amber-700">
                            {property?.askPrice}
                          </td>{" "}</tr>  
                        <tr>  <td>nearTown </td>
                          <td className="text-amber-700">
                            {property?.nearTown}
                          </td>{" "}</tr>
                       <tr>  <td>Costsq </td>
                          <td className="text-amber-700">
                            {" "}
                            ₹.{property?.costSq}sft
                          </td>{" "}</tr>
                       
                        </table>
                        <p className="border-t-2"> <p className="flex justify-center" >facilities </p>
                          <p className="text-amber-700  overflow-hidden text-ellipsis whitespace-wrap w-72 ">
                         {property?.facilities}
                          </p></p> 
                      </div>
                    </div>
                  </details>
                  <br />
                  <div className="bg-white border-none -mt-5 ">
                    <details
                      class=" open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-2 rounded-lg"
                      close
                    >
                      <summary class=" text-sm txt-shadow leading-6 text-amber-700 dark:text-white font-semibold select-none">
                        Description
                      </summary>
                      <div class="mt-3 text-md leading-6 font text-slate-800 dark:text-slate-400 p-3">
                        <p> {property?.Description}</p>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detailspage;
