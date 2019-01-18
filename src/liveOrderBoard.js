export default class LiveOrderBoard {
  constructor(orderFactory) {
    this.orderFactory = orderFactory
    this._orders = []
  }

  registerOrder(userId, quantity, price, type) {
    let newOrder = this.orderFactory(userId, quantity, price, type)
    this._orders.push(newOrder)
    return newOrder
  }
}
