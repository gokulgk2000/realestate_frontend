import React, { useState } from "react";
import Image from "../assets/images/home3.webp";
const Sell = () => {
  const [detail, setDetail] = useState({
    location: "",
    layoutName: "",
    landArea: "",
    facing: "",
    approachRoad: "",
    builtArea: "",
    bedRoom: "",
    floorDetails: "",
    status: "",
    nearTown: "",
    costSq: "",
    facilities: "",
    askPrice: "",
  });

  const handleChange = (e) => {
    {
      /**    const name=e.target.name;
       *  const value=e.target.value */
    }
    const { name, value } = e.target;
    setDetail((pre) => {
      return { ...pre, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(detail);
  };

  return (
    <div className="grid grid-cols-5 ml-10 p-1">
      <form onSubmit={handleSubmit} className="col-span-3">
        <div>
          <table>
            <thead>
              <tr className="pl-1 font-bold text-l ">
                <td>
                  <p>Tittle</p>
                </td>
                <td>
                  <p>:Independent House For Sale</p>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-xl">Location :</td>
                <td>
                  <input
                    type="text"
                    name="location"
                    value={detail.location}
                    className="  mt-2 border-2 xl:w-96 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-xl">LayoutName: </td>
                <td>
                  <input
                    type="text"
                    name="layoutName"
                    value={detail.layoutName}
                    className="xl:w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-xl">LandArea :</td>
                <td>
                  <input
                    type="text"
                    name="landArea"
                    value={detail.landArea}
                    className="xl:w-96  mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-xl">Facing:</td>
                <td>
                  <input
                    type="text"
                    name="facing"
                    value={detail.facing}
                    className="xl:w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-xl">ApproachRoad :</td>
                <td>
                  <input
                    type="text"
                    name="approachRoad"
                    value={detail.approachRoad}
                    className="xl:w-96  mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-xl">BuiltArea :</td>
                <td>
                  <input
                    type="text"
                    name="builtArea"
                    value={detail.builtArea}
                    className="xl:w-96  mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-xl">BedRoom :</td>
                <td>
                  <input
                    type="number"
                    name="bedRoom"
                    value={detail.bedRoom}
                    className="xl:w-96  mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-xl">FloorDetails :</td>
                <td>
                  <input
                    type="text"
                    name="floorDetails"
                    value={detail.floorDetails}
                    className="xl:w-96  mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-xl">Status :</td>
                <td>
                  <input
                    type="text"
                    name="status"
                    value={detail.status}
                    className="xl:w-96  mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-xl">NearTown :</td>
                <td>
                  <input
                    type="text"
                    name="nearTown"
                    value={detail.nearTown}
                    className="xl:w-96  mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-xl">CostSq :</td>
                <td>
                  <input
                    type="text"
                    name="costSq"
                    value={detail.costSq}
                    className="xl:w-96  mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-xl">Facilities :</td>
                <td>
                  <input
                    type="text"
                    name="facilities"
                    value={detail.facilities}
                    className="xl:w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-xl">AskPrice :</td>
                <td>
                  <input
                    type="number"
                    name="askPrice"
                    value={detail.askPrice}
                    className="xl:w-96  mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
"
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br />{" "}
          <div className="flex justify-around mr-6  ">
            <button
              type="submit"
              className="bg-blue-400 w-44 hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded mb-20"
            >
              {" "}
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="pr-3 hidden md:block col-span-2">
        <img className="" src={Image} />
      </div>
    </div>
  );
};

export default Sell;
