import React, { useState } from 'react';

const AddProductModal = ({ onClose, onAddProduct }) => {
  const [product, setProduct] = useState({ name: '', quantity: 0, price: 0 });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    onAddProduct(product);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Product</h2>
        <label>
          Product Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleAddProduct}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddProductModal;


/*import React, { useState } from 'react';

const AddProductModal = ({ onClose, onAddProduct }) => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    unitPrice: 0,
    qty: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddProduct = () => {
    onAddProduct({ ...product, id: Date.now() });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Product</h2>
        <form>
          <div>
            <label>Product Name:</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} />
          </div>
          <div>
            <label>Unit Price:</label>
            <input type="number" name="unitPrice" value={product.unitPrice} onChange={handleChange} />
          </div>
          <div>
            <label>Quantity:</label>
            <input type="number" name="qty" value={product.qty} onChange={handleChange} />
          </div>
        </form>
        <button type="button" onClick={handleAddProduct}>Add</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddProductModal;*/
