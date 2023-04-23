import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthorizeSeller from "./Components/Authorize";
import AuthorizeCustomer from "./Components/Customer";
import Home from "./Components/Home";
import LoginSeller from "./Components/LoginSeller";
import SellerDashboard from "./Components/SellerDashboard";
import CustomerDashboard from "./Components/CustomerDashboard";
import LoginCustomer from "./Components/LoginCustomer";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Orders from "./Components/Orders";
import SellerProducts from "./Components/SellerProducts";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seller" element={<AuthorizeSeller />} />
          <Route path="/customer" element={<AuthorizeCustomer />} />
          <Route path="/login-seller" element={<LoginSeller />} />
          <Route path="/login-customer" element={<LoginCustomer />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/seller-products" element={<SellerProducts />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
