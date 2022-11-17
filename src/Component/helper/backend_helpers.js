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
  post(`${BASE_URL}/user/propertyCount`, payload);
  const getAllProperty = (payload) =>
  get(`${BASE_URL}/user/properties`, payload);
  const getPropertyById = (payload) =>
  post(`${BASE_URL}/property/getpropertyById`, payload);

  export {userRegisteration,
    PropertyRegistration,
    userLogin,
    getAllProperty,
    getPropertyCount,
    getPropertyById,
    getPropertybyUserId
}