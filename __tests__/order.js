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
})
