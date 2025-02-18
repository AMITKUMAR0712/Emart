import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from './Components/Home/Home';
import NavigationBar from './Components/Home/nav';
import Login from './Components/Login/login';
import ProductPage from './Components/Categories/Electronics'; // Updated to import correct ProductPage
import ProductDetails from './Components/Categories/ProductDetails';
import CartPage from './Components/Categories/CartPage';
import PaymentPage from './Components/Categories/PaymentPage';
import OrderConfirmationPage from './Components/Categories/OrderConfirmationPage';
import Signup from './Components/Signup/Signup';
import Support from './Components/Home/Support';
import ProfilePage from './Components/Profile/MyProfile'
import CheckoutView from './Components/Profile/Checkout';
import Invoice from './Components/Profile/Invoice'

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryId" element={<ProductPage />} /> 
          <Route path="/category/:categoryId/subcategory/:subcategoryId" element={<ProductPage />} /> 
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/support" element={<Support/>} />
          <Route path="/orderconfirmationPage" element={<OrderConfirmationPage />} /> 
          <Route path="/account/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutView />} />
          <Route path="/invoice" element={<Invoice />} />
          
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
