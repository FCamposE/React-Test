const db = require('./dbConfig');

exports.getAllOrders = async (req, res) => {
    try {
      const [orders, fields] = await db.execute('SELECT * FROM ordenes');
      res.json(orders);
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
      res.status(500).json({ error: 'Error al obtener ordenes' });
    }
  };

  exports.createOrder = async (req, res) => {
    const { orderNumber, date, numProducts, finalPrice } = req.body;
    try {
      await db.execute('INSERT INTO ordenes (orderNumber, date, numProducts, finalPrice) VALUES (?, ?, ?, ?)',
        [orderNumber, date, numProducts, finalPrice]);
      res.status(201).json({ message: 'Orden creada correctamente' });
    } catch (error) {
      console.error('Error al crear la orden:', error);
      res.status(500).json({ error: 'Error al crear la orden' });
    }
  };

exports.deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
      await db.execute('DELETE FROM ordenes WHERE id = ?', [orderId]);
      res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error' });
    }
  };

  exports.getOrderById = async (req, res) => {
    const orderId = req.params.orderId;
  
    try {
      const [order, fields] = await db.execute('SELECT * FROM ordenes WHERE id = ?', [orderId]);
  
      if (order.length > 0) {
        res.json(order[0]);
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
    const { orderNumber, date, numProducts, finalPrice } = req.body;
    try {
      await db.execute('UPDATE ordenes SET orderNumber = ?, date = ?, numProducts = ?, finalPrice = ? WHERE id = ?', [orderNumber, date, numProducts, finalPrice, orderId]);
      res.status(200).json({ message: 'Orden actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar la orden:', error);
      res.status(500).json({ error: 'Error al actualizar la orden' });
    }
  };

// Agrega funciones similares para actualizar y eliminar órdenes según sea necesario

/*<th>ID</th>
<th>Order #</th>
<th>Date</th>
<th># Products</th>
<th>Final Price</th>
<th>Options</th>*/