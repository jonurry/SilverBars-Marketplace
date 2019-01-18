export default class LiveOrderBoard {
  constructor(orderFactory) {
    this.orderFactory = orderFactory
  }

  registerOrder(userId, quantity, price, type) {
    return this.orderFactory(userId, quantity, price, type)
  }
}
