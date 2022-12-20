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
        <div className="flex justify-center py-5 text-xl font"> Loading...</div>
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
                {property?.Title}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clip-rule="evenodd" />
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
                      <div className="md:grid md:grid-cols-2 md:gap-5 px-4  ">
                        <div className=" md:px-5 md:pb-5 bg-white ">
                          <div className="text-md font py-3 ">
                            <span className="text-amber-700 ">Seller:</span>
                            <span className=" opacity-80 ">
                              {property?.Seller}
                            </span>
                          </div>
                          <div className="text-md  font py-3 hidden md:block">
                            <span className="text-amber-700">Location:</span>
                            <span className=" opacity-80 ">
                              {property?.location},
                            </span>
                            <span className="text-gray-800">
                              {property?.streetName}
                            </span>
                          </div>
                          <div className="text-md  font py-3 md:hidden">
                            <span className="text-amber-700">Location:</span>
                            <span className=" opacity-80 ">
                              {property?.location},
                            </span>
                            <div className="text-gray-800 pl-20 ">
                              {property?.streetName}
                            </div>
                          </div>
                          <div className="text-md font py-3">
                            <span className="text-amber-700"> Layoutname:</span>
                            <span className="  opacity-80  ">
                              {property?.layoutName}
                            </span>
                          </div>
                          <div className="text-md  font py-3">
                            <span className="text-amber-700"> Landarea:</span>
                            <span className=" opacity-80  ">
                              {property?.landArea}
                            </span>
                          </div>{" "}
                          <div className="text-md font py-3">
                            <span className="text-amber-700">
                              {" "}
                              Property Type:
                            </span>
                            <span className="   opacity-80 ">
                              {property?.category?.name}
                            </span>
                          </div>{" "}
                        </div>
                        <div className=" md:px-5 md:pb-5 bg-white">
                          {" "}
                          <div className="text-md font  py-3">
                            <span className="text-amber-700">Facing:</span>
                            <span className="  opacity-80  ">
                              {property?.facing}
                            </span>
                          </div>
                          <div className="text-md font  py-3">
                            <span className="text-amber-700">
                              {" "}
                              Approchroad:
                            </span>
                            <span className="   opacity-80 ">
                              {property?.approachRoad}
                            </span>
                          </div>
                          <div className="text-md  font py-3">
                            <span className="text-amber-700"> Builtarea:</span>
                            <span className="   opacity-80 ">
                              {property?.builtArea}
                            </span>
                          </div>
                          <div className="text-md py-3  font">
                            <span className="text-amber-700"> Bedroom:</span>
                            <span className="  opacity-80  ">
                              {property?.bedRoom}
                            </span>
                          </div>{" "}
                          <div className="text-md font py-3 ">
                            <span className="text-amber-700">
                              {" "}
                              Floordetails:
                            </span>
                            <span className="  opacity-80  ">
                              {" "}
                              {property?.floorDetails}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-2  md:px-5 pb-5 ">
                          <div className="text-md py-3 font">
                            <span className="text-amber-700"> Askprice:</span>
                            <span className="  opacity-80  ">
                              ₹.{property?.askPrice}
                            </span>
                          </div>
                          <div className="text-md  py-3 font">
                            <span className="text-amber-700"> Neartown:</span>
                            <span className="  opacity-80  ">
                              {property?.nearTown}
                            </span>
                          </div>
                          <div className="text-md font py-3 ">
                            <span className="text-amber-700"> Costsq:</span>
                            <span className="   opacity-80 ">
                              ₹.{property?.costSq}sft
                            </span>
                          </div>{" "}
                          <div className="text-md font py-3 truncate">
                            <span className="text-amber-700"> Facilities:</span>
                            <span className=" opacity-80">
                              {property?.facilities}
                            </span>
                          </div>
                        </div>
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
                      <div class="mt-3 text-sm leading-6 font text-slate-600 dark:text-slate-400 p-3">
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
{
  /* <div className="grid md:grid-cols-2 bg-emerald-50 md:px-10  px-5 text-lg   -serif">
        <div className="mr-2 py-">
          <div className="w-full select-none relative aspect-[1]">
            {!loading && (
              <img
                className="w-full mt-2 md:aspect-[3/2]"
                src={property?.propertyPic[imageIndex]}
              />
            )}
            <div
              id="default-carousel"
              className="absolute w-full   top-1/2 transform-translate-y-1/2 px-3    justify-between items-center"
              data-bs-ride="static"
            >
              <button
                type="button"
                className="   absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                data-carousel-prev
              >
                <span
                  className="inline-   justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-blue-500 dark:bg-gray-800 group-hover:bg-emerald-500 dark:group-hover:bg-blue-800 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                  onClick={() => handlePrevClick()}
                >
                  <svg
                    className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  <span className="hidden">Previous</span>
                </span>
              </button>
              <button
                type="button"
                className="   absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                data-carousel-next
              >
                <span
                  className="inline-   justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-blue-500 dark:bg-gray-800 group-hover:bg-emerald-500 dark:group-hover:bg-blue-800 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                  onClick={() => handleNextClick()}
                >
                  <svg
                    className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <span className="hidden">Next</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="">
          <ul className="grid md:grid-cols-2 md:gap-7 capitalize text-xl leading-loose pl-1">
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Seller:</div>
              <div>{property?.Seller}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Location:</div>
              <div>{property?.location}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Layoutname:</div>
              <div>{property?.layoutName}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Landarea:</div>
              <div>{property?.landArea}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Facing:</div>
              <div>{property?.facing}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Approchroad:</div>
              <div>{property?.approachRoad}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Builtarea:</div>
              <div>{property?.builtArea}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Bedroom:</div>
              <div>{property?.bedRoom}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Floordetails:</div>
              <div>{property?.floorDetails}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Status:</div>
              <div>{property?.status}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Neartown:</div>
              <div>{property?.nearTown}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Costsq:</div>
              <div>₹.{property?.costSq}sft</div>
            </li>
            <li className="   justify-start truncate gap-2">
              <div className="text-lg   ">Facilties:</div>
              <div>{property?.facilities}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Askprice:</div>
              <div>₹.{property?.askPrice}</div>
            </li>
            <li className="   justify-start gap-2">
              <div className="text-lg   ">Category:</div>
              <div>{property?.category?.name}</div>
            </li>
          </ul>{" "}
          <p className=" md:    my-4">
            <div className="text-lg   ">Description:</div>
            <div className=" ">{property?.Description}</div>
          </p>
          <div className="   justify-around pt-">
            <button className="bg-blue-500 hover:bg-teal-700 text-white text-lg   -sans py-2 px-4 rounded ">
              Seller Contact
            </button>{" "}
          </div>
        </div>
      </div> */
}
