import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductModal = ({ onClose, onAddProduct, existingProducts }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        const filteredProducts = response.data.filter(
          (product) => !existingProducts.some((p) => p.productId === product.id)
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, [existingProducts]);

  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = products.find((p) => p.id === parseInt(productId));
    if (product) {
      setSelectedProductId(product.id);
      setSelectedProductName(product.name);
      setSelectedProductPrice(product.price);
    } else {
      setSelectedProductId('');
      setSelectedProductName('');
      setSelectedProductPrice(0);
    }
  };

  /*const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = products.find((p) => p.id === parseInt(productId));
    setSelectedProduct(product);
  };*/

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedProductId  && quantity > 0) {
      onAddProduct({
        productId: selectedProductId,
        productName: selectedProductName,
        unitPrice: selectedProductPrice,
        quantity: parseInt(quantity),
      });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Product</h2>
        <label>
          Product:
          <select onChange={handleProductChange} value={selectedProductId}>
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        {selectedProductId && (
          <>
            <label>
              Unit Price:
              <input
                type="number"
                value={selectedProductPrice}
                readOnly
              />
            </label>
          </>
        )}
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </label>
        <button onClick={handleSubmit}>Add Product</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddProductModal;



/*import React, { useState } from 'react';
import axios from 'axios';

const AddProductModal = ({ onClose, onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddProduct({ productName, unitPrice: parseFloat(unitPrice), quantity: parseInt(quantity) });
  };

  const handleProductSelection = (event) => {
    const productId = event.target.value;
    setSelectedProductId(productId);

    // Fetch product details based on productId if needed
    // Example: fetchProductDetails(productId);
    
    // Update product details in the state based on the selected product
    const selectedProduct = products.find((product) => product.id === productId);
    if (selectedProduct) {
      setProductDetails({
        productName: selectedProduct.productName,
        unitPrice: selectedProduct.unitPrice,
        quantity: 1  // Reset quantity to default when selecting a new product
      });
    }
  };

    return (
      <div className="modal">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <label>
              Product Name:
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </label>
            <label>
              Unit Price:
              <input
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
            <button type="submit">Add Product</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
    );
  };

  export default AddProductModal;*/



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
