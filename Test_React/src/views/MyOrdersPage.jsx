import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/my-orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error al obtener órdenes:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async () => {
    try {
      await axios.delete(`http://localhost:5000/my-orders/${orderIdToDelete}`);
      setOrders(orders.filter(order => order.id !== orderIdToDelete));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error al eliminar la orden:', error);
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/orders/${id}`;
  };

  const handleCreate = () => {
    console.log('Create a new order');
  };

  return (
    <div>
      <h1>My Orders</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order #</th>
            <th>Date</th>
            <th># Products</th>
            <th>Final Price</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderNumber}</td>
              <td>{order.date}</td>
              <td>{order.numProducts}</td>
              <td>{order.finalPrice}</td>
              <td>{order.status}</td>
              <td>
                <button disabled={order.status === 'completed'} onClick={() => handleEdit(order.id)}>Edit</button>
                <button disabled={order.status === 'completed'} onClick={() => {
                  setOrderIdToDelete(order.id); 
                  setShowDeleteConfirmation(true);
                  }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/orders">Create new order</Link>
      {showDeleteConfirmation && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Delete this order?</p>
            <button onClick={handleDeleteOrder}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
