const validate = (name, value, type) => {
  if (typeof value != type) {
    throw `Error creating order. userId must be a ${type}.`
  }
}

export default class Order {
  constructor(userId, quantity, price, type) {
    validate('userId', userId, 'number')
    this.userId = userId
    this.quantity = quantity
    this.price = price
    this.type = type
  }
}
