const validate = (name, value, type) => {
  if (typeof value != type) {
    throw `Error creating order, ${name} must be a ${type}.`
  }
}

export default class Order {
  constructor(userId, quantity, price, type) {
    validate('userId', userId, 'number')
    validate('quantity', quantity, 'number')
    this.userId = userId
    this.quantity = quantity
    this.price = price
    this.type = type
  }
}
