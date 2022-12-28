import {  get, post, put } from "../helper/api_helper";
import { SERVER_URL } from "../helper/configuration";
const BASE_URL = `${SERVER_URL}/api`;
const userRegisteration = (payload) =>
  post(`${BASE_URL}/user/register`, payload);
const userLogin = (payload) =>
  post(`${BASE_URL}/user/login`, payload);
const logoutUser = (payload) =>
  get(`${BASE_URL}/user/logout`, payload);
  const PropertyRegistration = (payload) =>
  post(`${BASE_URL}/property/Sellproperty`, payload);
  const getPropertybyUserId = (payload) =>
  post(`${BASE_URL}/property/getpropertyByUserId`, payload);
  const getPremiumProperty = (payload) =>
  post(`${BASE_URL}/admin/topProperty`, payload);
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
  const adminLogin = (payload) => post(`${BASE_URL}/admin/adminLogin`, payload);
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
  const getrequested = (payload) => post(`${BASE_URL}/requested/requested`, payload);
  const getAllrequested = (payload) => get(`${BASE_URL}/requested/getAllrequested`, payload);
  const getIntrestedPropertyBybuyerId = (payload) => post(`${BASE_URL}/intrested/getIntrestedByBuyerId`, payload);
  const removeProperty = (payload) =>
  put(`${BASE_URL}/admin/removeProperty`, payload);
  const updateTopProperty = (payload) =>
  put(`${BASE_URL}/admin/updateTopProperty`, payload);
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
  const FeedbackRegistration = (payload) =>
  post(`${BASE_URL}/feedback/feedbackregister`, payload);
  const getuserProperty = (payload) =>
  post(`${BASE_URL}/property/getpropertyByUserId`, payload);
  const getPaymentId = (payload) =>
  post(`${BASE_URL}/payment/getPaymentId`, payload);
  export {userRegisteration,logoutUser,
    adminLogin,
    FeedbackRegistration,
    getuserProperty,
    getPaymentId,
    getuserdetails,
    buyerReg,
    getbuyerdetails,
    PropertyRegistration,
    userLogin,
    getPremiumProperty,
    getSearchAllProperty,
    getPropertyCount,
    getProById,
    getUserById,
    getPropertyDetailsById,
    allUsersList,
    allBuyerList,
    allPropertiesList,
    removeUser,
    updateTopProperty,
    removeBuyer,
    removeProperty,
    getPropertybyUserId,
    updateProperty,
    getPropertyById,
    getAllrequested,
    GETALLUSERSBYLIMIT,
    updateProfileById,
    addBuyer,
    addProperty,
    addUser ,
    getrequested,
    getrequestedByUserId,
    getCategory,
    getIntrestedPropertyBybuyerId,
    findCategory,
    getPropertiescategoryId
}







