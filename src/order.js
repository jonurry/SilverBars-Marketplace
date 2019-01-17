const checkMissingParameter = (name, value) => {
  if (typeof value === 'undefined') {
    throw `Error creating order, the ${name} parameter is missing.`
  }
}

const checkPositiveNumber = (name, value) => {
  if (typeof value === 'number' && value < 0) {
    throw `Error creating order, ${name} must be a positive number.`
  }
}

const checkValidValues = (name, value, validValues) => {
  if (Array.isArray(validValues) && !validValues.includes(value)) {
    throw `Error creating order, ${name} must be one of ${validValues.join(
      ', '
    )}.`
  }
}

const checkWrongType = (name, value, type) => {
  if (typeof value != type) {
    throw `Error creating order, ${name} must be a ${type}.`
  }
}

const validate = (name, value, type, validValues) => {
  checkMissingParameter(name, value)
  checkWrongType(name, value, type)
  checkPositiveNumber(name, value)
  checkValidValues(name, value, validValues)
}

export default class Order {
  constructor(userId, quantity, price, type) {
    validate('userId', userId, 'number')
    validate('quantity', quantity, 'number')
    validate('price', price, 'number')
    validate('type', type, 'string', ['BUY', 'SELL'])
    this.userId = userId
    this.quantity = quantity
    this.price = price
    this.type = type
  }
}
