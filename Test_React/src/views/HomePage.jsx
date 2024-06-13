import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome back!</h1>
      <table>
        <thead>
          <tr>
            <th>What do you want to do</th>
            <th>?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>My Orders</td>
            <td><Link to="/my-orders">See my orders</Link></td>
          </tr>
          <tr>
            <td>New Order</td>
            <td><Link to="/orders">Create a new Order</Link></td>
          </tr>
          <tr>
            <td>Products</td>
            <td><Link to="/products">See the products</Link></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
