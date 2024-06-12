const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor API iniciado en el puerto ${PORT}`);
});

/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const orders = [];

// Routes
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(order => order.id === parseInt(req.params.id));
  if (order) {
    res.json(order);
  } else {
    res.status(404).send('Order not found');
  }
});

app.post('/api/orders', (req, res) => {
  const order = { ...req.body, id: Date.now() };
  orders.push(order);
  res.status(201).json(order);
});

app.put('/api/orders/:id', (req, res) => {
  const index = orders.findIndex(order => order.id === parseInt(req.params.id));
  if (index !== -1) {
    orders[index] = { ...orders[index], ...req.body };
    res.json(orders[index]);
  } else {
    res.status(404).send('Order not found');
  }
});

app.delete('/api/orders/:id', (req, res) => {
  const index = orders.findIndex(order => order.id === parseInt(req.params.id));
  if (index !== -1) {
    orders.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Order not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});*/
