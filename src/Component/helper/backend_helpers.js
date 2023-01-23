import { get, post, put } from "../helper/api_helper";
import { SERVER_URL } from "../helper/configuration";
const BASE_URL = `${SERVER_URL}/api`;
const userRegisteration = (payload) =>
  post(`${BASE_URL}/user/register`, payload);


const Login = (payload) => post(`${BASE_URL}/user/login`, payload);
const allFacilatorsList = (payload) => get(`${BASE_URL}/user/getfacilator`, payload);

const PropertyRegistration = (payload) =>
  post(`${BASE_URL}/property/Sellproperty`, payload);

const userLogin = (payload) =>
  post(`${BASE_URL}/user/login`, payload);
const logoutUser = (payload) =>
  get(`${BASE_URL}/user/logout`, payload);
const getAdminById = (payload) =>
  get(`${BASE_URL}/admin/getAdminById`, payload);
const getAdproperties = (payload) =>
  post(`${BASE_URL}/admin/getAdproperty`, payload);



const getPropertybyUserId = (payload) =>
  post(`${BASE_URL}/property/getpropertyByUserId`, payload);
const getPremiumProperty = (payload) =>
  post(`${BASE_URL}/admin/topProperty`, payload);
const getPremiumPromotors = (payload) =>
  post(`${BASE_URL}/admin/topPromotors`, payload);
const getPropertyCount = (payload) =>
  post(`${BASE_URL}/property/propertyCount`, payload);
const getSearchAllProperty = (payload) =>
  get(`${BASE_URL}/property/searchProperties`, payload);
const getProById = (payload) =>
  post(`${BASE_URL}/property/getproById`, payload);
const allPromotorsList = (payload) =>
  get(`${BASE_URL}/property/allPromotorsList`, payload);
const getPropertyById = (payload) =>
  post(`${BASE_URL}/property/getpropertyById`, payload);
const getPropertiescategoryId = (payload) =>
  post(`${BASE_URL}/category/getPropertiescategoryId `, payload);
const getCategory = (payload) =>
  post(`${BASE_URL}/category/getcategory`, payload);
const AdUpload = (payload) =>
  post(`${BASE_URL}/admin/adproperty`, payload);
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
const getrequestedByUserId = (payload) =>
  post(`${BASE_URL}/requested/getrequestedByUserId`, payload);
const getrequested = (payload) =>
  post(`${BASE_URL}/requested/requested`, payload);
const getAllrequested = (payload) =>
  get(`${BASE_URL}/requested/getAllrequested`, payload);
const getIntrestedPropertyBybuyerId = (payload) =>
  post(`${BASE_URL}/intrested/getIntrestedByBuyerId`, payload);
const IntrestedByPropertyId = (payload) =>
  post(`${BASE_URL}/intrested/createIntrestedProperty`, payload);
const removeProperty = (payload) =>
  put(`${BASE_URL}/admin/removeProperty`, payload);
const updateTopProperty = (payload) =>
  put(`${BASE_URL}/admin/updateTopProperty`, payload);
const updateTopPromotors = (payload) =>
  put(`${BASE_URL}/admin/updateTopPromotors`, payload);
  const updateTopFacilators = (payload) =>
  put(`${BASE_URL}/admin/updateTopFacilators`, payload);
const orderlist = (payload) =>
  put(`${BASE_URL}/admin/listProperty`, payload);
  const orderPromotors = (payload) =>
  put(`${BASE_URL}/admin/listPromotors`, payload);
  const orderFacilators = (payload) =>
  put(`${BASE_URL}/admin/listFacilators`, payload);
const GETALLUSERSBYLIMIT = (payload) =>
  post(`${BASE_URL}/admin/getAllUsersPage`, payload);
const getuserdetails = (payload) =>
  post(`${BASE_URL}/admin/getUserById`, payload);
const getbuyerdetails = (payload) =>
  post(`${BASE_URL}/buyer/getBuyerById`, payload);
const buyerReg = (payload) => post(`${BASE_URL}/buyer/buyerregister`, payload);
const buyerRegister = (payload) => post(`${BASE_URL}/user/register`, payload);

const updateProperty = (payload) => put(`${BASE_URL}/admin/adminedit`, payload);
const updateProfileById = (payload) =>
  put(`${BASE_URL}/user/profileEdit`, payload);
const FeedbackRegistration = (payload) =>
  post(`${BASE_URL}/feedback/feedbackregister`, payload);
const getuserProperty = (payload) =>
  post(`${BASE_URL}/property/getpropertyByUserId`, payload);
const getPaymentId = (payload) =>
  post(`${BASE_URL}/payment/getPaymentId`, payload);

const getforget = (payload) => post(`${BASE_URL}/user/forgotpassword`, payload);
const getpassword = (payload) => put(`${BASE_URL}/user/resetpassword`, payload);
const getInterest = (payload) => post(`${BASE_URL}/intrested/createInterest`, payload);
const getinterestbyId = (payload) => post(`${BASE_URL}/intrested/getinterested`, payload);
const getUnInterest = (payload) => put(`${BASE_URL}/intrested/removeInterest`, payload);

 







export {
  userRegisteration,
  getAdminById,
  getAdproperties,
  orderPromotors,
  orderFacilators,
  updateTopPromotors,
  updateTopFacilators,
  AdUpload,
  getinterestbyId,
  allFacilatorsList,
  getUnInterest,
  allPromotorsList,
  getInterest,
  IntrestedByPropertyId,
  buyerRegister,
  Login,
  logoutUser,
  adminLogin,
  getpassword,
  getforget,
  FeedbackRegistration,
  getuserProperty,
  getPaymentId,
  getuserdetails,
  buyerReg,
  getbuyerdetails,
  PropertyRegistration,
  userLogin,
  getPremiumProperty,
  getPremiumPromotors,
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
  orderlist,
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
  addUser,
  getrequested,
  getrequestedByUserId,
  getCategory,
  getIntrestedPropertyBybuyerId,
  findCategory,
  getPropertiescategoryId,
};
