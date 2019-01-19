import createOrder from '../src/order.js'
import OrderBoardPrinter from '../src/printer.js'

export default class LiveOrderBoard {
  constructor(orderFactory = createOrder, printer = new OrderBoardPrinter()) {
    this.orderFactory = orderFactory
    this.printer = printer
    this._orders = []
  }

  cancelOrder(position) {
    this._orders.splice(position - 1, 1)
  }

  registerOrder(userId, quantity, price, type) {
    let newOrder = this.orderFactory(userId, quantity, price, type)
    this._orders.push(newOrder)
    return newOrder
  }

  summary() {
    return this.printer.summary(this._orders)
  }
}
