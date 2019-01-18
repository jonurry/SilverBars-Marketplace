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
const orderFactory = jest.fn()
orderFactory.mockReturnValueOnce(buyOrder).mockReturnValueOnce(sellOrder)

describe('Live Order Board', () => {
  describe('#constructor', () => {
    test('it should take an Order factory method as the first parameter', () => {
      const liveOrderBoard = new LiveOrderBoard(orderFactory)
      expect(liveOrderBoard.orderFactory).toBe(orderFactory)
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

    test('it should use the factory to create Orders', () => {
      const liveOrderBoard = new LiveOrderBoard(orderFactory)
      liveOrderBoard.registerOrder(
        buyOrder.userId,
        buyOrder.quantity,
        buyOrder.price,
        buyOrder.type
      )
      expect(orderFactory).toHaveBeenCalledTimes(1)
      expect(orderFactory.mock.calls[0][0]).toBe(buyOrder.userId)
      expect(orderFactory.mock.calls[0][1]).toBe(buyOrder.quantity)
      expect(orderFactory.mock.calls[0][2]).toBe(buyOrder.price)
      expect(orderFactory.mock.calls[0][3]).toBe(buyOrder.type)
    })
  })
})
