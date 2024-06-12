import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage';
import UserPage from './views/UserPage';
import MyOrdersPage from './views/MyOrdersPage';
import OrderForm from './views/OrderForm';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/user" element={<UserPage/>} />
      <Route path="/my-orders" element={<MyOrdersPage/>} />
      <Route path="/orders/" element={<OrderForm />} />
      <Route path="/orders/:id" element={<OrderForm />} />
    </Routes>
  </Router>
);

export default AppRoutes;
