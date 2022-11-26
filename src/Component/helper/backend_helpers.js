import { del, get, post, put } from "../helper/api_helper";
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
  const allPropertiesList = () => get(`${BASE_URL}/admin/allPropertiesList`);
  const removeUser = (payload) => put(`${BASE_URL}/admin/removeUser`, payload);
  const removeProperty = (payload) =>
  put(`${BASE_URL}/admin/removeProperty`, payload);
  const GETALLUSERSBYLIMIT = (payload) =>
  post(`${BASE_URL}/admin/getAllUsersPage`, payload);
  export {userRegisteration,
    PropertyRegistration,
    userLogin,
    getSearchAllProperty,
    getPropertyCount,
    getPropertyById,
    getUserById,
    getPropertyDetailsById,
    allUsersList,
    allPropertiesList,
    removeUser,
    removeProperty,
    getPropertybyUserId,


    GETALLUSERSBYLIMIT,
   

    getCategory,
    findCategory,
    getPropertiescategoryId

}