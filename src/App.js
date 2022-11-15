import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Component/footer/Footer";
import Header from "./Component/header";
import Navbar from "./Component/header/Navbar";
import About from "./Component/pages/About";
import Login from "./Component/pages/auth/Login";
import Register from "./Component/pages/auth/Register";
import Detailspage from "./Component/pages/Detailspage";
import FeaturedProperty from "./Component/pages/FeaturedProperty";
import Landingpage from "./Component/pages/Landingpage";
import Sell from "./Component/pages/Sellpage";

const App = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/about" element={<About />} />
        <Route path="/Detailspage" element={<Detailspage/>} />
        <Route path="/featuredproperty" element={<FeaturedProperty />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
