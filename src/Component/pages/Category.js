import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findCategory } from "../helper/backend_helpers";

const Category = () => {
  const [categorylist, setCategorylist] = useState([]);

  useEffect(() => {
    const getAllCategory = async () => {
      const res = await findCategory({});
      console.log("getAllCategory", res);
      if (res.success) {
        setCategorylist(res.category);
      }
    };
    getAllCategory();
  }, []);

  return (
     <div className="md:grid grid-cols-5 gap-2 px-5 shadow-sm shadow-black">
      {categorylist?.map((cat, i) => (
        <div key={i}> <Link to={`/property?id=${cat?._id}`}> 
        
          <div className="scale-75  hover:scale-95 ease-in duration-500 group-hover:animate-shine from-transparent to-white bg-gradient-to-r z-5 ">
          
           <div className="capitalize font-extrabold text-2xl flex justify-center text-rose-700 mb-3">  {cat?.name} </div>
            <img src={cat?.img} className="h-60 w-96 "  />
          </div>
          </Link>  </div>
      ))}
    </div>
  );
};

export default Category;
