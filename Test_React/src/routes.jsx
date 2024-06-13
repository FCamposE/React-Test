import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage';
import UserPage from './views/UserPage';
import MyOrdersPage from './views/MyOrdersPage';
import OrderForm from './views/OrderForm';

import ProductList from './views/ProductList';
import ProductForm from './views/ProductForm';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/my-orders" element={<MyOrdersPage />} />
      <Route path="/orders/" element={<OrderForm />} />
      <Route path="/orders/:id" element={<OrderForm />} />

      <Route path="/products" element={<ProductList />} />
      <Route path="/products/add" element={<ProductForm />} />
      <Route path="/products/edit/:id" element={<ProductForm/>} />
    </Routes>
  </Router>
);

export default AppRoutes;
