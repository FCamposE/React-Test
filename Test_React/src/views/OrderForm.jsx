import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    orderNumber: '',
    date: '',
    numProducts: 0,
    finalPrice: 0,
    status: 'pending',
    products: []
  });

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

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

  useEffect(() => {
    if (!id) {
      const currentDate = new Date().toISOString().slice(0, 10);
      setOrder((prevOrder) => ({
        ...prevOrder,
        date: currentDate,
      }));
    }
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
    const totalProductPrice = parseInt(product.quantity, 10) * parseFloat(product.unitPrice);
    const updatedNumProducts = order.numProducts + parseInt(product.quantity);
    const updatedFinalPrice = parseFloat(order.finalPrice) + totalProductPrice;

    setOrder((prevOrder) => ({
      ...prevOrder,
      products: [...prevOrder.products, product],
      numProducts: updatedNumProducts,
      finalPrice: updatedFinalPrice,
    }));
    setShowAddProductModal(false);
  };

  const handleEditProduct = (updatedProduct) => {
    const updatedProducts = order.products.map((product) =>
      product.productId === updatedProduct.productId ? updatedProduct : product
    );

    const updatedNumProducts = updatedProducts.reduce((acc, prod) => acc + prod.quantity, 0);
    const updatedFinalPrice = updatedProducts.reduce((acc, prod) => acc + prod.quantity * prod.unitPrice, 0);

    setOrder((prevOrder) => ({
      ...prevOrder,
      products: updatedProducts,
      numProducts: updatedNumProducts,
      finalPrice: updatedFinalPrice,
    }));
    setShowEditProductModal(false);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/orders/${id}/products/${productId}`);

      if (response.status === 200) {
        const updatedProducts = order.products.filter((product) => product.productId !== productId);
        const updatedNumProducts = updatedProducts.reduce((acc, prod) => acc + prod.quantity, 0);
        const updatedFinalPrice = updatedProducts.reduce((acc, prod) => acc + prod.quantity * prod.unitPrice, 0);

        setOrder((prevOrder) => ({
          ...prevOrder,
          products: updatedProducts,
          numProducts: updatedNumProducts,
          finalPrice: updatedFinalPrice,
        }));
      }

      setShowConfirmDeleteModal(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn(`Producto con ID ${productId} no encontrado en la base de datos, eliminando del frontend.`);

        const updatedProducts = order.products.filter((product) => product.productId !== productId);
        const updatedNumProducts = updatedProducts.reduce((acc, prod) => acc + prod.quantity, 0);
        const updatedFinalPrice = updatedProducts.reduce((acc, prod) => acc + prod.quantity * prod.unitPrice, 0);

        setOrder((prevOrder) => ({
          ...prevOrder,
          products: updatedProducts,
          numProducts: updatedNumProducts,
          finalPrice: updatedFinalPrice,
        }));
      } else {
        console.error('Error al eliminar el producto:', error);
      }
      setShowConfirmDeleteModal(false);
    }
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
          <input
            type="text"
            name="date"
            value={order.date}
            onChange={handleChange}
            disabled
          />
        </label>
        <label>
          Number of Products:
          <input
            type="number"
            name="numProducts"
            value={order.numProducts}
            readOnly
          />
        </label>
        <label>
          Final Price:
          <input
            type="number"
            name="finalPrice"
            value={order.finalPrice}
            readOnly
          />
        </label>
        <label>
          Status:
          <select name="status" value={order.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button type="submit">{id ? 'Update Order' : 'Create Order'}</button>
        <button type="button" onClick={() => setShowAddProductModal(true)}>Add Product</button>
      </form>
      <h2>Products in this order</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.unitPrice}</td>
              <td>{product.quantity}</td>
              <td>{product.unitPrice * product.quantity}</td>
              <td>
                <button onClick={() => { setProductToEdit(product); setShowEditProductModal(true); }}>Edit</button>
                <button onClick={() => { setProductToDelete(product); setShowConfirmDeleteModal(true); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddProductModal && (
        <AddProductModal
          onClose={() => setShowAddProductModal(false)}
          onAddProduct={handleAddProduct}
          existingProducts={order.products}
        />
      )}
      {showEditProductModal && (
        <EditProductModal
          product={productToEdit}
          onClose={() => setShowEditProductModal(false)}
          onEditProduct={handleEditProduct}
        />
      )}
      {showConfirmDeleteModal && (
        <ConfirmDeleteModal
          product={productToDelete}
          onClose={() => setShowConfirmDeleteModal(false)}
          onConfirm={() => handleDeleteProduct(productToDelete.productId)}
        />
      )}
    </div>
  );
};

export default OrderForm;
