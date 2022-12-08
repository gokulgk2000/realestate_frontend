import React from "react";
import { Route, Routes,Router, Navigate } from "react-router-dom";
import Footer from "./Component/footer/Footer";
import Header from "./Component/header";
import Navbar from "./Component/header/Navbar";
import About from "./Component/pages/About";
import Login from "./Component/pages/auth/Login";
import Register from "./Component/pages/auth/Register";
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
import Requested from "./Component/pages/Requested";
import RequestedModel from "./Component/models/RequestedModel";
import Requestedpage from "./Component/pages/Requestedpage";
import UserActivities from "./Component/pages/UserActivities";
import RequestedList from "./Component/pages/admin/RequestedList";
import Intrested from "./Component/pages/admin/Intrested";
import Activities from "./Component/pages/YourActivities";
import YourEdit from "./Component/pages/auth/YourEdit";



const App = () => {
  return (
    <> 
      <Header />
      <Navbar /> 
      <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/ProfileUpdate" element={<ProfileUpdate />} />

      <Route path="/category" element={<Category />} />
      <Route path="/property" element={<Property />} />
        <Route path="/about" element={<About />} />
        <Route path="/request" element={<Requested />} />
        <Route path="/requestedpage" element={<Requestedpage />} />
        <Route path="/Detailspage" element={<Detailspage/>} />
        <Route path="/UserActivties" element={<UserActivities/>} />
        <Route path="/yourActivities" element={<Activities/>} />
        <Route path="/yourEdit" element={<YourEdit/>} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedbackpage />} />
        <Route element={<ProtectedRoutes />}>
        <Route path="/sellproperty" element={<Sell />}   />
        </Route>
        <Route path="admin" element={<Admin />} >
        <Route index  element={<Dashboard />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route  path="userlist" element={<UserList />} />
        <Route  path="buyerlist" element={<BuyerList />} />
        <Route  path="requestedlist" element={<RequestedList />} />
        <Route  path="intrestedlist" element={<Intrested />} />
        <Route path="propertylist" element={<PropertyList />} />
        <Route path="propertydetails" element={<PropertyDetails />} />
        <Route path="userdetails" element={<UserDetails />} />
        <Route path="buyerdetails" element={<BuyerDetails />} />


        </Route >
        
      </Routes>
      <Footer />
    </>
  );
};

export default App;
