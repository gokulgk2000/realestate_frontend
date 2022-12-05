import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { allPropertiesList, allUsersList } from "../../helper/backend_helpers";

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const res = await allUsersList({});
      if (res.success) {
        setAllUsers(res.users);
      }
    };
    getAllUsers();
  }, []);
  useEffect(() => {
    const getAllProperties = async () => {
      const res = await allPropertiesList({});
      if (res.success) {
        setAllProperties(res.properties);
      }
    };
    getAllProperties();
  }, []);

  return (
   
    
      <div className="md:grid grid-cols-5 font py-4">
        <div className=" font- Arial pt-5  bg-stone-200 px-6  md:text-left text-md">
          <h3 className=" font-light text-amber-700 text-xl font-SFMono-Regular">
            Menu
          </h3>
          <Link
            className="flex font-Arial opacity-90 pt-3 leading-loose"
            to={`/admin/Dashboard`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-amber-700"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
            Admin Dashboard
          </Link>
          <h3 className="  font-light text-amber-700  text-xl font- Arial leading-loose">
            Sub-Menu
          </h3>
          <ul className="font- Arial  leading-loose">
          
            <li className="flex ">
              <Link
                className="flex font-Arial opacity-90  pt-3 leading-loose"
               to={`/admin/userlist`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-amber-700"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Sellers{" "}
              </Link>
            </li>
            <li className="flex ">
              <Link
                className="flex font-Arial opacity-90  pt-3 leading-loose"
                to={`/admin/buyerlist`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-amber-700"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Buyers{" "}
              </Link>
            </li>
            <li className="flex lead">
              <Link
                className="flex font-Arial opacity-90 pt-3 leading-loose"
                to={`/admin/PropertyList`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6  text-amber-700"
                >
                  <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
                  <path
                    fillRule="evenodd"
                    d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Properties
              </Link>
            </li>
          </ul>
        </div>
        <div className="md: col-span-4 bg-stone-100">
        <div className="md: col-span-4">
       <Outlet />

        </div>
      </div>
    </div>
  );
};

export default Admin;
