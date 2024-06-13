const db = require('./dbConfig');

exports.getAllProducts = async (req, res) => {
    try {
      const [products] = await db.execute('SELECT * FROM products');
      res.status(200).json(products);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  };
  
  exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
      if (rows.length === 0) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Error fetching product' });
    }
  };

  exports.createProduct = async (req, res) => {
    const { name, price } = req.body;
    try {
      await db.execute('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
      res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Error creating product' });
    }
  };

  exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    try {
      await db.execute('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id]);
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Error updating product' });
    }
  };

  exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      await db.execute('DELETE FROM products WHERE id = ?', [id]);
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Error deleting product' });
    }
  };