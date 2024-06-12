import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrderController from '../controllers/OrderController';
import AddProductModal from './AddProductModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const orderController = new OrderController();

  const [order, setOrder] = useState({
    orderNumber: '',
    date: '',
    numProducts: 0,
    finalPrice: 0,
    products: 0
  });

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  //const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/orders/${id}`);
          setOrder(response.data);
        } catch (error) {
          console.error('Error al obtener la orden:', error);
        }
      }
    };

    fetchOrder();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/orders/${id}`, order);
      } else {
        await axios.post('http://localhost:5000/orders', order);
      }
      navigate('/my-orders');
    } catch (error) {
      console.error('Error al guardar la orden:', error);
    }
  };

  const handleAddProduct = (product) => {
    //const updatedProducts = [...order.products, product];
    const updatedNumProducts = order.numProducts + parseInt(product.quantity);
    const updatedFinalPrice = order.finalPrice + parseFloat(product.price * product.quantity);
    console.log(product.price);
    console.log(product.quantity);
    console.log(order.finalPrice);
    console.log((product.price * product.quantity));
    console.log(order.finalPrice + parseFloat(product.price * product.quantity));

    setOrder((prevOrder) => ({
      ...prevOrder,
      //products: updatedProducts,
      numProducts: updatedNumProducts,
      finalPrice: updatedFinalPrice,
    }));
    setShowAddProductModal(false);
  };

  const handleRemoveProduct = (productId) => {
    /*const productToRemove = order.products.find(product => product.id === productId);
    if (productToRemove) {
      const updatedProducts = order.products.filter(product => product.id !== productId);
      const updatedNumProducts = order.numProducts - parseInt(productToRemove.quantity);
      const updatedFinalPrice = order.finalPrice - (parseFloat(productToRemove.price) * parseInt(productToRemove.quantity));

      setOrder((prevOrder) => ({
        ...prevOrder,
        products: updatedProducts,
        numProducts: updatedNumProducts,
        finalPrice: updatedFinalPrice,
      }));
    }*/
    setShowConfirmDeleteModal(false);
  };

  const handleSaveOrder = async () => {
    if (id) {
      await orderController.editOrder(order.id, order);
    } else {
      await orderController.createOrder({ ...order, id: Date.now() });
    }
    navigate('/orders');
  };

  return (
    <div>
      <h1>{id ? 'Edit Order' : 'Add Order'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Order Number:
          <input
            type="text"
            name="orderNumber"
            value={order.orderNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input disabled
            type="text"
            name="date"
            value={order.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Number of Products:
          <input disabled
            type="number"
            name="numProducts"
            value={order.numProducts}
            readOnly
          />
        </label>
        <label>
          Final Price:
          <input disabled
            type="number"
            name="finalPrice"
            value={order.finalPrice}
            readOnly
          />
        </label>
        <button type="submit">{id ? 'Update Order' : 'Create Order'}</button>
        <button type="button" onClick={() => setShowAddProductModal(true)}>Add Product</button>
      </form>
      {showAddProductModal && (
        <AddProductModal
          onClose={() => setShowAddProductModal(false)}
          onAddProduct={handleAddProduct}
        />
      )}
      {showConfirmDeleteModal && (
        <ConfirmDeleteModal
          product={productToDelete}
          onClose={() => setShowConfirmDeleteModal(false)}
          onConfirm={() => handleRemoveProduct(productToDelete.id)}
        />
      )}
    </div>
  );
};

export default OrderForm;
