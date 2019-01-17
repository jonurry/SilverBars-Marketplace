import Order from '../src/order.js'

describe('#constructor', () => {
  test('it should create an order', () => {
    const USER_ID = 1
    const QUANTITY = 2.0
    const PRICE_PER_KG = 305
    const TYPE = 'BUY'
    let order = new Order(USER_ID, QUANTITY, PRICE_PER_KG, TYPE)
    expect(order.userId).toEqual(USER_ID)
    expect(order.quantity).toEqual(QUANTITY)
    expect(order.price).toEqual(PRICE_PER_KG)
    expect(order.type).toEqual(TYPE)
  })

  describe('invalid parameters', () => {
    test('userId should be a number', () => {
      expect(() => {
        new Order('1')
      }).toThrowError('Error creating order, userId must be a number.')
    })

    test('quantity should be a number', () => {
      expect(() => {
        new Order(1, '3.5')
      }).toThrowError('Error creating order, quantity must be a number.')
    })

    test('price should be a number', () => {
      expect(() => {
        new Order(1, 3.5, {})
      }).toThrowError('Error creating order, price must be a number.')
    })

    test('type should be a string', () => {
      expect(() => {
        new Order(1, 3.5, 310, [])
      }).toThrowError('Error creating order, type must be a string.')
    })
  })
})
