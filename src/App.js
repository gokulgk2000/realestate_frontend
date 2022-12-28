import React from "react";
import { Route, Routes,Router, Navigate } from "react-router-dom";
import Footer from "./Component/footer/Footer";
import Header from "./Component/header";
import Navbar from "./Component/header/Navbar";
import About from "./Component/pages/About";
import Login from "./Component/pages/auth/Login";
import Register from "./Component/pages/auth/SellerRegister"; 
import Detailspage from "./Component/pages/Detailspage";
import Feedbackpage from "./Component/pages/Feedbackpage";
import Landingpage from "./Component/pages/Landingpage";
import Property from "./Component/pages/Property";
import ProtectedRoutes from "./routers/ProtectedRoutes";
import Sell from "./Component/pages/Sellpage";
import Admin from "./Component/pages/admin/Admin";
import UserList from "./Component/pages/admin/UserList";
import PropertyList from "./Component/pages/admin/PropertyList";
import PropertyDetails from "./Component/pages/admin/PropertyDetails";
import UserDetails from "./Component/pages/admin/UserDetails";
import Dashboard from "./Component/pages/admin/Dashboard";
import Category from "./Component/pages/Category";
import ProfileUpdate from "./Component/pages/auth/ProfileUpdate";
import BuyerList from "./Component/pages/admin/BuyerList";
import BuyerDetails from "./Component/pages/admin/BuyerDetails";
import Requestedpage from "./Component/pages/Requestedpage";
import UserActivities from "./Component/pages/UserActivities";
import RequestedList from "./Component/pages/admin/RequestedList";
import Activities from "./Component/pages/YourProperties";
import YourEdit from "./Component/pages/auth/YourEdit";
import AdminLogin from "./Component/pages/admin/adminlogin/AdminLogin";

import Intrested from "./Component/pages/Intrested";

import Contact from "./Component/pages/Contact";
import AdminProtected from "./Component/pages/admin/adminlogin/AdminProtected";
import { isAuthenticated } from "./Component/pages/auth/Auth";

import AdminNav from "./Component/pages/admin/AdminNav";
import AdminPath, { isAuthAdmin } from "./Component/pages/admin/AuthAdmin";
import Requested from "./Component/pages/Requestedpage";
import Payment from "./Component/pages/PaymentPage/Payment";
import Thankyoupage from "./Component/pages/PaymentPage/Thankyoupage";
import Promotors from "./Component/pages/promotors/Promotors";
import Mediators from "./Component/pages/mediators/Mediators";
import GalleryModel from "./Component/models/GalleryModel";
import PromotersDetails from "./Component/pages/promotors/PromotersDetails";
import BuyerPage from "./Component/pages/BuyerPage";
import Forgetpassword from "./Component/pages/auth/Forgetpassword";
import Passwordpage from "./Component/pages/auth/Passwordpage";
import SelectedUser from "./Component/pages/auth/SelectedUser";
import SellerRegister from "./Component/pages/auth/SellerRegister";
import BuyerRegister from "./Component/pages/auth/BuyerRegister";




const App = () => {
  return (
    <> 
    {isAuthAdmin()||window.location.pathname==="/admin-page"?(<AdminNav/>):( <div className="sticky top-0 z-50"><div className="" ><Navbar/></div></div>)} 
     
      <Routes >
      <Route path="/"  element={<Landingpage />} />
      <Route path="/ProfileUpdate" element={<ProfileUpdate />} />
      <Route path="/category" element={<Category />} />
      <Route path="/property" element={<Property />} />
      <Route path="/promotors" element={<Promotors />} />
      <Route path="/promotorsDetails" element={<PromotersDetails />} />
      <Route path="/mediators" element={<Mediators />} />
        <Route path="/about" element={<About />} />
        <Route path="/sellerregister" element={<SellerRegister />} />
        <Route path="/buyerregister" element={<BuyerRegister />} />
        <Route path="/selecteduser" element={<SelectedUser/>} />

  <Route path="/forget" element={<Forgetpassword/>} />
        <Route path="/password" element={<Passwordpage/>} />
        <Route path="/Intrested" element={<Intrested />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Requested />} />

        <Route path="/requestedpage" element={<Requestedpage />} />
        <Route path="/Detailspage" element={<Detailspage/>} />
        <Route path="/UserActivties" element={<UserActivities/>} />
        <Route path="/yourProperties" element={<Activities/>} />
        <Route path="/yourEdit" element={<YourEdit/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/thankyou" element={<Thankyoupage/>} />
        
        <Route path="/login" element={<Login />} />
      
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedbackpage />} />
        <Route element={<ProtectedRoutes />}>
        <Route path="/sellproperty" element={<Sell />}   />
        <Route path="/buyer" element={<BuyerPage />}   />
        </Route>
        <Route path="admin-page" element={<AdminLogin />} />

        <Route element={<AdminProtected />} >
        <Route   path="admin"  element={<Admin />} >
        <Route  index  element={<Dashboard />} />
        <Route  path="userlist" element={<UserList />} />
        <Route  path="buyerlist" element={<BuyerList />} />
        <Route  path="requestedlist" element={<RequestedList />} />
        <Route  path="intrestedlist" element={<Intrested />} />
        <Route path="propertylist" element={<PropertyList />} />
        <Route path="propertydetails" element={<PropertyDetails />} />
        <Route path="userdetails" element={<UserDetails />} />
        <Route path="buyerdetails" element={<BuyerDetails />} />
</Route>
        </Route>
        
      </Routes>
   {window.location.pathname==="/admin-page"?(<div></div>):( <Footer />)}  
    </>
  );
};

export default App;
