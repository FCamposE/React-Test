class OrderModel {
  constructor(id, orderNumber, date, numberOfProducts, finalPrice) {
    this.id = id;
    this.orderNumber = orderNumber;
    this.date = date;
    this.numberOfProducts = numberOfProducts;
    this.finalPrice = finalPrice;
  }
}

export default OrderModel;