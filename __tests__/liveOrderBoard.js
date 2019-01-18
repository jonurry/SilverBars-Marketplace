import LiveOrderBoard from '../src/liveOrderBoard.js'

const buyOrder = {
  userId: 1,
  quantity: 2.5,
  price: 303,
  type: 'BUY'
}
const sellOrder = {
  userId: 2,
  quantity: 1.7,
  price: 307,
  type: 'SELL'
}
const buyOrderFactory = jest.fn(() => buyOrder)
const sellOrderFactory = jest.fn(() => sellOrder)

describe('Live Order Board', () => {
  describe('#constructor', () => {
    test('it should take an Order factory method as the first parameter', () => {
      const liveOrderBoard = new LiveOrderBoard(buyOrderFactory)
      expect(liveOrderBoard.orderFactory).toBe(buyOrderFactory)
    })
  })

  describe('#registerOrder', () => {
    test('it should register a BUY Order', () => {
      const liveOrderBoard = new LiveOrderBoard(buyOrderFactory)
      expect(liveOrderBoard.registerOrder(buyOrder)).toBe(buyOrder)
    })

    test('it should register a SELL Order', () => {
      const liveOrderBoard = new LiveOrderBoard(sellOrderFactory)
      expect(liveOrderBoard.registerOrder(sellOrder)).toBe(sellOrder)
    })
  })
})
