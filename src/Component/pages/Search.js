import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProById, getPropertiescategoryId, getuserdetails } from '../helper/backend_helpers';
import { useQuery } from '../helper/hook/useQuery';

const Search = () => {
    const query = useQuery();
    const id = query.get("id");
    
    const [searchText, setSearchText] = useState(id);
   
    const currentUser = JSON.parse(localStorage?.getItem("authUser"));
    const [user, setUser] = useState("");
    const [property, setproperty] = useState("");   
  const [propertyId, setPropertyId] = useState([]);


  const getuser = async () => {
    const payload = {
      userId: currentUser?.userID,
    };
    const res = await getuserdetails(payload);
    if (res.success) {
      setUser(res?.User);
    } else {
      console.log("errors", res);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  const categories = async () => {
    const res = await getPropertiescategoryId({
      id,
      searchText,
    });

    if (res.success) {
      setproperty(res.category);

      console.log("first",res)

    } else {
    }
  };
 

  useEffect(() => {
    categories();
  }, [searchText]);

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
    <div> <div className="flex   md:hidden ">
    <div className="flex justify-center rounded-lg  ">
      <select className="px-2 border h-10 "id="ok" value="select">
        <option>
          {" "}
          <button class="  py-1 px-4 bg-white text-gray-600 rounded absolute opcity-80   group-hover:block group-hover:  md:w-32 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
            {" "}
            category
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>{" "}
          </button>{" "}
        </option>
        <option value="residential" className=" border-0   ">
          Residential
        </option>

        <option value="villa" className=" border-0">
          Villa
        </option>

        <option value="land" className=" border-0">
          Land
        </option>
        <option value="appartment" className=" border-0">
          Appartment
        </option>

        <option value="commercial" className=" border-0">
          Commercial
        </option>
      </select>
      <div className="flex  p- border-2 h-10 bg-slate-200">
        <form action="">
          <input
            type="text"
            id="message"
            value={searchText}
            name="search"
            placeholder="Search Property...."
            className=" px-2 bg-slate-200 w-36  rounded-tl-full rounded-bl-full border-0 focus:outline-0 "
            onChange={(e) => setSearchText(e.target.value)} 
          />
        </form>
      </div>
     
    </div>
  </div></div>
  )
}

export default Search