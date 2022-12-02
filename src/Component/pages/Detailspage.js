import React, { useEffect, useState } from "react";
import { getPropertyById } from "../helper/backend_helpers";
import { useQuery } from "../helper/hook/useQuery";

const Detailspage = (props) => {
  const query = useQuery();
  const [loading, setLoading] = useState(true);
  const [property, setproperty] = useState({});

  const propertyDetails = async () => {
    const res = await getPropertyById({ propertyId: query.get("uid") });

    if (res.success) {
      setproperty(res?.property);
      console.log("data", res);
    } else {
      console.log("Error while fetching property");
    }
  };
  const [imageIndex, setImageIndex] = useState(0);
  const handleNextClick = () => {
    if (imageIndex < property?.propertyPic?.length - 1) {
      setImageIndex((prevState) => prevState + 1);
    } else {
      setImageIndex(0);
    }
  };
  const handlePrevClick = () => {
    if (imageIndex < 1) {
      setImageIndex(property?.propertyPic?.length - 1);
    } else {
      setImageIndex((prevState) => prevState - 1);
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
  return (
    <div>
      {" "}
      <div className="pt-20 pr-52 pl-20">
        <div className="py-4 px-8 bg-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 py-8 pr-8 ">
            {" "}
            <img
              className="w-full mt-2 md:aspect-[3/2]"
              src={property?.propertyPic}
            />
          </div>
        </div>
      </div>

<div className="flex">
<div className="pl-96 py-4">

  <div className=" grid py-4 px-8  bg-white shadow-lg gap ">
<div className="grid  grid-rows-4 grid-flow-col gap-5">
<div className="font  flex  text-xl ">Seller: <p className=" ">{property?.Seller}</p></div>
            <div className="font flex  text-lg ">Location:<p className="  ">{property?.location}</p></div>
            <div className="font flex  text-lg">
              Layoutname:<p className=" text-base pt-1 ">{property?.layoutName}</p>
            </div>
            <div className="font flex  text-lg">Landarea:<p className="  ">{property?.landArea}</p></div>
            <div className="font flex  text-lg">Facing:<p className=" text-base pt-1 ">{property?.facing}</p></div>

<div className="font flex  text-lg">
  Approchroad:<p className=" text-base pt-1 ">{property?.approachRoad}</p>
</div>

<div className="font flex  text-lg">Builtarea:<p className=" text-base pt-1 ">{property?.builtArea}</p></div>

<div className="font flex  text-lg">Bedroom:<p className=" text-base pt-1 ">{property?.bedRoom}</p></div>
<div className="font flex  text-lg">
              Floordetails:<p className=" text-base pt-1 "> {property?.floorDetails}</p>
            </div>

            <div className="font flex  text-lg">Status:<p className=" text-base pt-1 ">{property?.status}</p></div>

            <div className="font flex  text-lg">Neartown:<p className=" text-base pt-1 ">{property?.nearTown}</p></div>

            <div className="font flex  text-lg">Costsq:<p className=" text-base pt-1 ">₹.{property?.costSq}sft</p></div>

</div>
<div>

</div>
  </div>
</div>
</div>



      <div className="py-2 pr-52 pl-20"> 
        <div className="py-4 px-8 bg-white shadow-lg">
         
          <div className="grid grid-rows-4 grid-flow-col capitalize gap-4 pb-8  ">
            <div className="font  flex  text-xl ">Seller: <p className=" text-base pt-1 ">{property?.Seller}</p></div>
            <div className="font flex  text-lg ">Location:<p className=" text-base pt-1 ">{property?.location}</p></div>
            <div className="font flex  text-lg">
              Layoutname:<p className=" text-base pt-1 ">{property?.layoutName}</p>
            </div>
            <div className="font flex  text-lg">Landarea:<p className=" text-base pt-1 ">{property?.landArea}</p></div>
            <div className="font flex  text-lg">Facing:<p className=" text-base pt-1 ">{property?.facing}</p></div>

            <div className="font flex  text-lg">
              Approchroad:<p className=" text-base pt-1 ">{property?.approachRoad}</p>
            </div>

            <div className="font flex  text-lg">Builtarea:<p className=" text-base pt-1 ">{property?.builtArea}</p></div>

            <div className="font flex  text-lg">Bedroom:<p className=" text-base pt-1 ">{property?.bedRoom}</p></div>

            <div className="font flex  text-lg">
              Floordetails:<p className=" text-base pt-1 "> {property?.floorDetails}</p>
            </div>

            <div className="font flex  text-lg">Status:<p className=" text-base pt-1 ">{property?.status}</p></div>

            <div className="font flex  text-lg">Neartown:<p className=" text-base pt-1 ">{property?.nearTown}</p></div>

            <div className="font flex  text-lg">Costsq:<p className=" text-base pt-1 ">₹.{property?.costSq}sft</p></div>

            <div className="font flex  text-lg">
              Facilties:<p className=" text-base pt-1 ">{property?.facilities}</p>
            </div>

            <div className="font flex  text-lg">Askprice:<p className=" text-base pt-1 ">₹.{property?.askPrice}</p></div>

            <div className="font flex  text-lg">
              Category:<p className=" text-base pt-1 ">{property?.category?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detailspage;
{
  /* <div className="grid md:grid-cols-2 bg-emerald-50 md:px-10  px-5 font flex  text-lg-serif">
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
              className="absolute w-full   top-1/2 transform-translate-y-1/2 px-3 flex  text-lg justify-between items-center"
              data-bs-ride="static"
            >
              <button
                type="button"
                className="flex  text-lg absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                data-carousel-prev
              >
                <span
                  className="inline-flex  text-lg justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-blue-500 dark:bg-gray-800 group-hover:bg-emerald-500 dark:group-hover:bg-blue-800 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
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
                className="flex  text-lg absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                data-carousel-next
              >
                <span
                  className="inline-flex  text-lg justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-blue-500 dark:bg-gray-800 group-hover:bg-emerald-500 dark:group-hover:bg-blue-800 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
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
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Seller:</div>
              <div>{property?.Seller}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Location:</div>
              <div>{property?.location}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Layoutname:</div>
              <div>{property?.layoutName}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Landarea:</div>
              <div>{property?.landArea}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Facing:</div>
              <div>{property?.facing}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Approchroad:</div>
              <div>{property?.approachRoad}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Builtarea:</div>
              <div>{property?.builtArea}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Bedroom:</div>
              <div>{property?.bedRoom}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Floordetails:</div>
              <div>{property?.floorDetails}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Status:</div>
              <div>{property?.status}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Neartown:</div>
              <div>{property?.nearTown}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Costsq:</div>
              <div>₹.{property?.costSq}sft</div>
            </li>
            <li className="flex  text-lg justify-start truncate gap-2">
              <div className="font flex  text-lg">Facilties:</div>
              <div>{property?.facilities}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Askprice:</div>
              <div>₹.{property?.askPrice}</div>
            </li>
            <li className="flex  text-lg justify-start gap-2">
              <div className="font flex  text-lg">Category:</div>
              <div>{property?.category?.name}</div>
            </li>
          </ul>{" "}
          <p className=" md:flex  text-lg  my-4">
            <div className="font flex  text-lg">Description:</div>
            <div className=" ">{property?.Description}</div>
          </p>
          <div className="flex  text-lg justify-around pt-">
            <button className="bg-blue-500 hover:bg-teal-700 text-white font flex  text-lg-sans py-2 px-4 rounded ">
              Seller Contact
            </button>{" "}
          </div>
        </div>
      </div> */
}
