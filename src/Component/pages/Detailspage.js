import React, { useEffect, useState } from "react";
import { getPropertyById } from "../helper/backend_helpers";
import { mobile, monitor, pc, tab } from "../helper/constatnt/ScreenSize";
import useMediaQuery from "../helper/hook/useMediaQuery";
import { useQuery } from "../helper/hook/useQuery";

const Detailspage = (props) => {
  const [isBiggerthanPC] = useMediaQuery(monitor);
  const [isBiggerthanTwo] = useMediaQuery(monitor,mobile);

  const query = useQuery();
  const [loading, setLoading] = useState(true);
  const [property, setproperty] = useState({});
  const [curentImage, setcurentImage] = useState(0);
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
  return (
    <>
      {loading ? (
        <>Loadingggggg....</>
      ) : (
        <div>
          <div className=" md:pt-28 md:pr-10 md:pl-10 pb-5 ">
            <div className="py-4 px-8 bg-white shadow-lg ">
              <div className=" 2xl:grid   grid-cols-3 py- md:pr-">
                {" "}
                <div className="">     
         {isBiggerthanTwo?(<div className="absolute grid">
             <div className="md:flex mt-44 md:space-x-48 hidden  xl:space-x-80 md:pl-9  lg:pl-15">   <button  className=" bg-orange-200 hover:bg-amber-500 "
                          onClick={() => prevImageOnClick()}>  
                       prev
                      </button>
                 <button className=" "> <div className=" ">
                        <button
                          className="bg-orange-200 hover:bg-amber-500"
                          onClick={() => nextImageOnClick()}
                        >
                       next
                        </button>
                      </div></button></div> </div>):(<div className="absolute grid">
             <div className="md:flex mt-44 md:space-x-96 hidden pl-12">   <button>  <div className="   ">
                        <button
                          className=" bg-orange-200 hover:bg-amber-500 "
                          onClick={() => prevImageOnClick()}
                        >
                         prev
                        </button>
                      </div></button>
                 <button className=" "> <div className="">
                        <button
                          className="bg-orange-200 hover:bg-amber-500"
                          onClick={() => nextImageOnClick()}
                        >
                        next
                        </button>
                      </div></button></div> </div>) }      
               

         
 
               
                  <img
                      className=" aspect-[3/2] md:pr-5 md:h-96 "
                      src={property?.propertyPic[curentImage]}
                    />
                 
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
                      <div className="md:grid grid-cols-2 md:gap-5 md:px-4  ">
                        <div className=" md:px-5 pb-5 bg-white ">
                          <div className="text-md font py-3 ">
                            <span className="text-amber-700 ">Seller:</span>
                            <span className=" opacity-80 ">{property?.Seller}</span>
                          </div>
                          <div className="text-md  font py-3 hidden md:block">
                           <span className="text-amber-700" >Location:</span> 
                            <span className=" opacity-80 ">{property?.location},</span>
                            <span className="text-gray-800">
                              {property?.streetName}
                            </span>
                          </div>
                          <div className="text-md  font py-3 md:hidden">
                           <span className="text-amber-700" >Location:</span> 
                            <span className=" opacity-80 ">{property?.location},</span>
                            <div className="text-gray-800 pl-20 ">
                              {property?.streetName}
                            </div>
                          </div>
                          <div className="text-md font py-3">
                           <span className="text-amber-700"> Layoutname:</span>
                            <span className="  opacity-80  ">{property?.layoutName}</span>
                          </div>
                          <div className="text-md  font py-3">
                           <span className="text-amber-700"> Landarea:</span>
                            <span className=" opacity-80  ">{property?.landArea}</span>
                          </div>{" "}
                          <div className="text-md font py-3">
                           <span className="text-amber-700"> Property Type:</span>
                            <span className="   opacity-80 ">
                              {property?.category?.name}
                            </span>
                          </div>{" "}
                        </div>
                        <div className=" md:px-5 pb-5 bg-white">
                          {" "}
                          <div className="text-md font  py-3">
                            <span className="text-amber-700">Facing:</span>
                            <span className="  opacity-80  ">{property?.facing}</span>
                          </div>
                          <div className="text-md font  py-3">
                           <span className="text-amber-700"> Approchroad:</span>
                            <span className="   opacity-80 ">
                              {property?.approachRoad}
                            </span>
                          </div>
                          <div className="text-md  font py-3">
                           <span className="text-amber-700">  Builtarea:</span>
                            <span className="   opacity-80 ">{property?.builtArea}</span>
                          </div>
                          <div className="text-md py-3  font">
                           <span className="text-amber-700"> Bedroom:</span>
                            <span className="  opacity-80  ">{property?.bedRoom}</span>
                          </div>{" "}
                          <div className="text-md font py-3 ">
                           <span className="text-amber-700"> Floordetails:</span>
                            <span className="  opacity-80  ">
                              {" "}
                              {property?.floorDetails}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-2  md:px-5 pb-5 ">
                          <div className="text-md py-3 font">
                          <span className="text-amber-700">  Askprice:</span>
                            <span className="  opacity-80  ">₹.{property?.askPrice}</span>
                          </div>
                          <div className="text-md  py-3 font">
                           <span className="text-amber-700"> Neartown:</span>
                            <span className="  opacity-80  ">{property?.nearTown}</span>
                          </div>
                          <div className="text-md font py-3 ">
                           <span className="text-amber-700"> Costsq:</span>
                            <span className="   opacity-80 ">₹.{property?.costSq}sft</span>
                          </div>{" "}
                          <div className="text-md font py-3 truncate">
                           <span className="text-amber-700"> Facilities:</span>
                            <span className=" opacity-80">{property?.facilities}</span>
                           
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
