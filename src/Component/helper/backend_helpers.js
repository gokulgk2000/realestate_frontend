import {  get, post, put } from "../helper/api_helper";
import { SERVER_URL } from "../helper/configuration";
const BASE_URL = `${SERVER_URL}/api`;
const userRegisteration = (payload) =>
  post(`${BASE_URL}/user/register`, payload);
const userLogin = (payload) =>
  post(`${BASE_URL}/user/login`, payload);
  const PropertyRegistration = (payload) =>
  post(`${BASE_URL}/property/Sellproperty`, payload);
  const getPropertybyUserId = (payload) =>
  post(`${BASE_URL}/property/getpropertyByUserId`, payload);
  const getPropertyCount = (payload) =>
  post(`${BASE_URL}/property/propertyCount`, payload);
  const getSearchAllProperty = (payload) =>
  get(`${BASE_URL}/property/searchProperties`, payload);
  const getProById = (payload) =>
  post(`${BASE_URL}/property/getproById`, payload);
  const getPropertyById = (payload) =>
  post(`${BASE_URL}/property/getpropertyById`, payload);
  const getPropertiescategoryId = (payload) =>
  post(`${BASE_URL}/category/getPropertiescategoryId `, payload);
  const getCategory = (payload) =>
  post(`${BASE_URL}/category/getcategory`, payload);
  const findCategory = (payload) =>
  get(`${BASE_URL}/category/findCategory`, payload);
  //admin
  const getUserById = (payload) => post(`${BASE_URL}/admin/getUserById`, payload);
  const getPropertyDetailsById = (payload) =>
  post(`${BASE_URL}/admin/getPropertyDetailsById`, payload);
  const allUsersList = () => get(`${BASE_URL}/admin/allUsersList`);
  const allBuyerList = () => get(`${BASE_URL}/buyer/allBuyerList`);
  const allPropertiesList = () => get(`${BASE_URL}/admin/allPropertiesList`);
  const removeUser = (payload) => put(`${BASE_URL}/admin/removeUser`, payload);
  const removeBuyer = (payload) => put(`${BASE_URL}/admin/removeBuyer`, payload);
  const addUser = (payload) => put(`${BASE_URL}/admin/addUser`, payload);
  const addBuyer = (payload) => put(`${BASE_URL}/admin/addBuyer`, payload);
  const addProperty = (payload) => put(`${BASE_URL}/admin/addProperty`, payload);
  const getrequestedByUserId = (payload) => post(`${BASE_URL}/requested/getrequestedByUserId`, payload);
  const getrequested = (payload) => get(`${BASE_URL}/requested/getAllrequested`, payload);
  const getIntrestedPropertyById = (payload) => post(`${BASE_URL}/intrested/getIntrestedByUserId`, payload);
  const removeProperty = (payload) =>
  put(`${BASE_URL}/admin/removeProperty`, payload);
  const GETALLUSERSBYLIMIT = (payload) =>
  post(`${BASE_URL}/admin/getAllUsersPage`, payload);
  const getuserdetails = (payload) =>
  post(`${BASE_URL}/admin/getUserById`, payload);
  const getbuyerdetails = (payload) =>
  post(`${BASE_URL}/buyer/getBuyerById`, payload);
  const buyerReg = (payload) =>
  post(`${BASE_URL}/buyer/buyerregister`, payload);
const updateProperty = (payload) =>
  put(`${BASE_URL}/admin/adminedit`, payload);
  const updateProfileById = (payload) =>
  put(`${BASE_URL}/user/profileEdit`, payload);
  export {userRegisteration,
    getuserdetails,
    buyerReg,
    getbuyerdetails,
    PropertyRegistration,
    userLogin,
    getSearchAllProperty,
    getPropertyCount,
    getProById,
    getUserById,
    getPropertyDetailsById,
    allUsersList,
    allBuyerList,
    allPropertiesList,
    removeUser,
    removeBuyer,
    removeProperty,
    getPropertybyUserId,
    updateProperty,
    getPropertyById,
    GETALLUSERSBYLIMIT,
    updateProfileById,
    addBuyer,
    addProperty,
    addUser ,
    getrequested,
    getrequestedByUserId,
    getCategory,
    getIntrestedPropertyById,
    findCategory,
    getPropertiescategoryId
}







