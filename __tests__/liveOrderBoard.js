import LiveOrderBoard from '../src/liveOrderBoard.js'

const orderFactory = jest.fn()

describe('Live Order Board', () => {
  describe('#constructor', () => {
    test('it should take an Order factory method as the first parameter', () => {
      const liveOrderBoard = new LiveOrderBoard(orderFactory)
      expect(liveOrderBoard.orderFactory).toBe(orderFactory)
    })
  })
})
