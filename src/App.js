import React from "react";
import { Route, Routes,Router } from "react-router-dom";
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

const App = () => {
  return (
    <> 
      <Header />
      <Navbar />
    
      <Routes>
        <Route element={<ProtectedRoutes />}>
        <Route path="/sell" element={<Sell />}   />
        </Route>
        <Route path="/" element={<Landingpage />} />
        <Route path="/about" element={<About />} />
        <Route path="/Detailspage" element={<Detailspage/>} />
        <Route path="/property" element={<Property />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedbackpage />} />
      </Routes>
  
      <Footer />
    </>
  );
};

export default App;
