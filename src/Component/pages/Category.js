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
     <div className="grid grid-cols-5 gap-3 px-5">
      {categorylist?.map((cat, i) => (
        <div key={i}> <Link to={`/property?id=${cat?._id}`}> 
        
          <div>
          
           <div className="font-extrabold">  {cat?.name} </div>
            <img src={cat?.img} className="aspect-[2]" />
          </div>
          </Link>  </div>
      ))}
    </div>
  );
};

export default Category;
