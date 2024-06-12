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

  const handleDeleteOrder = async () => { // Elimina el parámetro orderId
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
    // Aquí puedes manejar la lógica para crear una nueva orden
    // Por ejemplo, abrir un formulario modal para crear una nueva orden
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
              
              <td>
                <button onClick={() => handleEdit(order.id)}>Edit</button>
                <button onClick={() => {
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

/*import React, { useState } from 'react';
import OrderController from '../controllers/OrderController';

const MyOrdersPage = () => {
  const orderController = new OrderController();
  const [orders, setOrders] = useState(orderController.getAllOrders());

  const handleDelete = (id) => {
    orderController.deleteOrder(id);
    setOrders(orderController.getAllOrders());
  };

  const handleEdit = (id) => {
    // Aquí puedes manejar la lógica de edición
    // Por ejemplo, abrir un formulario modal para editar la orden
    console.log(`Edit order with ID: ${id}`);
  };

  const handleCreate = () => {
    // Aquí puedes manejar la lógica para crear una nueva orden
    // Por ejemplo, abrir un formulario modal para crear una nueva orden
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
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderNumber}</td>
              <td>{order.date}</td>
              <td>{order.numberOfProducts}</td>
              <td>{order.finalPrice}</td>
              <td>
                <button onClick={() => handleEdit(order.id)}>Edit</button>
                <button onClick={() => handleDelete(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreate}>Create New Order</button>
    </div>
  );
};

export default MyOrdersPage;*/

 /*return (
    <div>
      <h1>My Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order Number: {order.orderNumber}, Date: {order.date}, Products: {order.numProducts}, Final Price: ${order.finalPrice}
          </li>
        ))}
      </ul>
    </div>
  );*/
