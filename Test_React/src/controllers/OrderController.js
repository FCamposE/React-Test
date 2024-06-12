import axios from 'axios';

const API_URL = 'http://localhost:5000/my-orders';

axios.get(API_URL)
  .then(response => {
    console.log('La API está en funcionamiento:', response.data);
  })
  .catch(error => {
    console.error('Error al conectar con la API:', error);
  });

class OrderController {
  async getAllOrders() {
    const response = await axios.get(API_URL);
    return response.data;
  }

  async getOrderById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }

  async createOrder(order) {
    const response = await axios.post(API_URL, order);
    return response.data;
  }

  async editOrder(id, order) {
    const response = await axios.put(`${API_URL}/${id}`, order);
    return response.data;
  }

  async deleteOrder(id) {
    await axios.delete(`${API_URL}/${id}`);
  }
}

export default OrderController;

/*import OrderModel from '../models/OrderModel';

class OrderController {
  constructor() {
    this.orders = [
      new OrderModel(1, 'ORD001', '2023-01-01', 3, 100.0),
      new OrderModel(2, 'ORD002', '2023-02-01', 5, 150.0),
      // Puedes agregar más órdenes de ejemplo aquí
    ];
  }

  getAllOrders() {
    return this.orders;
  }

  deleteOrder(id) {
    this.orders = this.orders.filter(order => order.id !== id);
  }

  editOrder(id, updatedOrder) {
    this.orders = this.orders.map(order => (order.id === id ? updatedOrder : order));
  }

  createOrder(order) {
    this.orders.push(order);
  }
}

export default OrderController;*/