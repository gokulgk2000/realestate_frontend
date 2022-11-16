import React, { useState } from "react";
import Image from "../assets/images/home3.webp";
import FileInput from "../reusable/FileInput";
import Input from "../reusable/Input";

const InitialValue = {
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
};
const Sell = () => {
  const [detail, setDetail] = useState(InitialValue);
  const [PropertyPic, setPropertyPic] = useState('');

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
    setDetail(InitialValue);
    setPropertyPic([]);
  };
  const convertBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleImageUpload = async (e) => {
   const target = e.target;
    const allImages = await Promise?.all(
      [...target.files].map(async (files) => {
        return await convertBase64(files);
        // const res = await convertBase64(file);
        // setPropertyPic((preValue) => [...preValue, res]);
      })
    );
    setPropertyPic(allImages);
    console.log("PropertyPic : ", PropertyPic);
  };
  {/* const handleImageUpload=(e)=>{
    setPropertyPic([...e.target.files]);
    setPropertyPic('');
    console.log("PropertyPic : ", PropertyPic);
  }*/}
  

  return (
    <div className="md:grid grid-cols-5 ml-5 p-1">
      <form onSubmit={handleSubmit} className="col-span-3">
        <h4 className="flex item-center justify-around font-bold text-2xl underline pb-3">
          Title:Independent House For Sale
        </h4>
        <div className="sm:grid grid-cols-2 gap-2">
          <Input
            label="location"
            type="text"
            name="location"
            value={detail.location}
            placeholder="enter the location"
            onChange={handleChange}
          />
          <Input
            label="layoutName"
            type="text"
            name="layoutName"
            value={detail.layoutName}
            placeholder="enter the layoutName"
            onChange={handleChange}
          />
          <Input
            label="landArea"
            type="text"
            name="landArea"
            value={detail.landArea}
            placeholder="enter the landArea"
            onChange={handleChange}
          />
          <Input
            label="facing"
            type="text"
            name="facing"
            value={detail.facing}
            placeholder="enter the  facing"
            onChange={handleChange}
          />
          <Input
            label="approachRoad"
            type="text"
            name="approachRoad"
            value={detail.approachRoad}
            placeholder="enter the approachRoad"
            onChange={handleChange}
          />
          <Input
            label="builtArea"
            type="text"
            name="builtArea"
            value={detail.builtArea}
            placeholder="enter the builtArea"
            onChange={handleChange}
          />
          <Input
            label="bedRoom"
            type="text"
            name="bedRoom"
            value={detail.bedRoom}
            placeholder="enter the bedRoom"
            onChange={handleChange}
          />
          <Input
            label="floorDetails"
            type="text"
            name="floorDetails"
            value={detail.floorDetails}
            placeholder="enter the floorDetails"
            onChange={handleChange}
          />
          <Input
            label="status"
            type="text"
            name="status"
            value={detail.status}
            placeholder="enter the status"
            onChange={handleChange}
          />
          <Input
            label="nearTown"
            type="text"
            name="nearTown"
            value={detail.nearTown}
            placeholder="enter the nearTown"
            onChange={handleChange}
          />
          <Input
            label="costSq"
            type="text"
            name="costSq"
            value={detail.costSq}
            placeholder="enter the costSq"
            onChange={handleChange}
          />
          <Input
            label="facilities"
            type="text"
            name="facilities"
            value={detail.facilities}
            placeholder="enter the facilities"
            onChange={handleChange}
          />
          <Input
            label="askPrice"
            type="number"
            name="askPrice"
            value={detail.askPrice}
            placeholder="enter the askPrice"
            onChange={handleChange}
          />
 <FileInput
            label="Property Images"
            multiple={true}
            accept=".png, .jpg, .jpeg,.pdf,.webp"
            onChange={handleImageUpload}
          />
        
        </div>
        <div className="flex justify-around  mr-6 pt-10  ">
          <button
            type="submit"
            className="bg-blue-400 w-44 hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded mb-20"
          >
            Submit
          </button>
         
        </div>
        {/* <div className="gird grid-cols-12 ">
          <ul className="">
            <li>
              <a className="pr-5">Location:</a>
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name="location"
                value={detail.location}
                placeholder="enter the location"
                onChange={handleChange}
                ></input>
            </li>
            <li>
              <a className="pr-5">LayoutName:</a>{" "}
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name="layoutName"
                value={detail.layoutName}
                placeholder="enter the layoutName"
                onChange={handleChange}

              ></input>
            </li>
            <li>
              <a className="pr-5"> LandArea:</a>{" "}
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name=" landArea"
                value={detail. landArea}
                placeholder="enter the landArea"
                onChange={handleChange}

              ></input>
            </li>
            <li>
              <a className="pr-5"> Facing:</a>{" "}
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name=" facing"
                value={detail. facing}
                placeholder="enter the  facing"
                onChange={handleChange}

              />
            </li>
            <li>
              <a className="pr-5">ApproachRoad:</a>{" "}
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name="approachRoad"
                value={detail.approachRoad}
                placeholder="enter the approachRoad"
                onChange={handleChange}

              ></input>
            </li>
            <li>
              <a className="pr-5">BuiltArea:</a>{" "}
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name="builtArea"
                value={detail.builtArea}
                placeholder="enter the builtArea"
                onChange={handleChange}

              ></input>
            </li>
            <li>
              <a className="pr-5">BedRoom:</a>{" "}
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name="bedRoom"
                value={detail.bedRoom}
                placeholder="enter the bedRoom"
                onChange={handleChange}

              ></input>
            </li>
            <li>
              <a className="pr-5">FloorDetails:</a>{" "}
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name="floorDetails"
                value={detail.floorDetails}
                placeholder="enter the floorDetails"
                onChange={handleChange}

              ></input>
            </li>
            <li>
              <a className="pr-5">Status:</a>{" "}
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name="status"
                value={detail.status}
                placeholder="enter the status"
                onChange={handleChange}

              ></input>
            </li>
            <li>
              <a className="pr-5">NearTown:</a>{" "}
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name="nearTown"
                value={detail.nearTown}
                placeholder="enter the nearTown"
                onChange={handleChange}

              ></input>
            </li>
            <li>
              <a className="pr-5">CostSq:</a>{" "}
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name="costSq"
                value={detail.costSq}
                placeholder="enter the costSq"
                onChange={handleChange}

              ></input>
            </li>
            <li>
              <a className="pr-5">Facilities:</a>{" "}
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name="facilities"
                value={detail.facilities}
                placeholder="enter the facilities"
                onChange={handleChange}

              ></input>
            </li>
            <li>
              <a className="pr-5">AskPrice:</a>{" "}
              <input
                className="w-96 mt-2 border-2 border-gray-300 rounded-md shadow-2xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
 "
                type="text"
                name="askPrice"
                value={detail.askPrice}
                placeholder="enter the askPrice"
                onChange={handleChange}

              ></input>
            </li>
          </ul>

          <div className="flex justify-around mr-6  ">
            <button
              type="submit"
              className="bg-blue-400 w-44 hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded mb-20"
            >
              {" "}
              Submit
            </button>
          </div>
        </div> */}
      </form>
      <div className="pr-3 hidden  md:block col-span-2">
        <img className="aspect-[2/3]" src={Image} />
      </div>
    </div>
  );
};

export default Sell;
