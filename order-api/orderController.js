const db = require('./dbConfig');

exports.getAllOrders = async (req, res) => {
  try {
    const [orders, fields] = await db.execute('SELECT * FROM orders');
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).json({ error: 'Error al obtener ordenes' });
  }
};

exports.createOrder = async (req, res) => {
  const { orderNumber, date, numProducts, finalPrice, products, status } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO orders (orderNumber, date, numProducts, finalPrice, status) VALUES (?, ?, ?, ?, ?)',
      [orderNumber, date, numProducts, finalPrice, status]
    );

    const orderId = result.insertId; 

    for (const product of products) {
      await db.execute(
        'INSERT INTO order_products (orderId, productId, quantity) VALUES (?, ?, ?)',
        [orderId, product.productId, product.quantity]
      );
    }

    res.status(201).json({ message: 'Orden creada correctamente', orderId });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ error: 'Error al crear la orden' });
  }
};

exports.deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    await db.execute('DELETE FROM orders WHERE id = ?', [orderId]);
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error' });
  }
};

exports.getOrderById = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const [order] = await db.execute('SELECT * FROM orders WHERE id = ?', [orderId]);

    if (order.length > 0) {
      const [products] = await db.execute(
        'SELECT p.id AS productId, p.name AS productName, p.price AS unitPrice, op.quantity ' +
        'FROM products p ' +
        'JOIN order_products op ON p.id = op.productId ' +
        'WHERE op.orderId = ?',
        [orderId]
      );

      res.json({
        ...order[0],
        products
      });
    } else {
      res.status(404).json({ message: `Order with ID ${orderId} not found` });
    }
  } catch (error) {
    console.error('Error al obtener la orden:', error);
    res.status(500).json({ error: 'Error al obtener la orden' });
  }
};

exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { orderNumber, date, numProducts, finalPrice, products, status } = req.body;

  try {
    await db.execute(
      'UPDATE orders SET orderNumber = ?, date = ?, numProducts = ?, finalPrice = ?, status = ? WHERE id = ?',
      [orderNumber, date, numProducts, finalPrice, status, orderId]
    );

    for (const product of products) {
      if (product.productId) {
        const [existingRelation] = await db.execute(
          'SELECT * FROM order_products WHERE orderId = ? AND productId = ?',
          [orderId, product.productId]
        );

        if (existingRelation.length > 0) {
          await db.execute(
            'UPDATE order_products SET quantity = ? WHERE orderId = ? AND productId = ?',
            [product.quantity, orderId, product.productId]
          );
        } else {
          await db.execute(
            'INSERT INTO order_products (orderId, productId, quantity) VALUES (?, ?, ?)',
            [orderId, product.productId, product.quantity]
          );
        }
      }
    }
    res.status(200).json({ message: 'Orden actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la orden:', error);
    res.status(500).json({ error: 'Error al actualizar la orden' });
  }
};

exports.deleteOrderProduct = async (req, res) => {
  const { orderId, productId } = req.params;
  try {
    const [rows] = await db.execute('SELECT * FROM order_products WHERE orderId = ? AND productId = ?', [orderId, productId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado en la orden' });
    }
    
    await db.execute('DELETE FROM order_products WHERE orderId = ? AND productId = ?', [orderId, productId]);

    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
