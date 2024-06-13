import React, { useState, useEffect } from 'react';

const EditProductModal = ({ product, onClose, onEditProduct }) => {
  const [productName, setProductName] = useState(product.productName);
  const [unitPrice, setUnitPrice] = useState(product.unitPrice);
  const [quantity, setQuantity] = useState(product.quantity);

  useEffect(() => {
    setProductName(product.productName);
    setUnitPrice(product.unitPrice);
    setQuantity(product.quantity);
  }, [product]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onEditProduct({ ...product, productName, unitPrice: parseFloat(unitPrice), quantity: parseInt(quantity) });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input disabled
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <label>
          Unit Price:
          <input disabled
            type="number"
            step="0.01"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProductModal;
