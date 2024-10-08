import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/authentication/SignUp";
import Login from "../components/authentication/Login";
import Home from "../components/Home";
import ShopkeeperSignUp from "../components/authentication/ShopkeeperSignUp";
import RegisterShop from "../components/RegisterShop";
import ShopEnter from "../components/ShopEnter";
import ShopPage from "../components/ShopPage";
import AddProducts from "../components/AddProducts";
import Products from "../components/Products";
const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Shopkeeper/signUp" element={<ShopkeeperSignUp />} />
        <Route path="/register/shop" element={<RegisterShop />} />
        <Route path="/shop/enter" element={<ShopEnter />} />
        <Route path="/search/shop/enter" element={<ShopPage />} />
        <Route path="/add/products" element={<AddProducts />} />
        <Route path="/all/products/shop" element={<Products/>}/>
      </Routes>
    </>
  );
};

export default AllRoutes;
