import LiveOrderBoard from '../src/board.js'

import OrderBoardPrinter from '../src/printer.js'
jest.mock('../src/printer.js')

const buyOrder = {
  userId: 1,
  quantity: 2.5,
  price: 303,
  type: 'BUY'
}
const buyOrder2 = {
  userId: 3,
  quantity: 1.4,
  price: 306,
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
      const orderFactory = jest.fn()
      const liveOrderBoard = new LiveOrderBoard(orderFactory)
      expect(liveOrderBoard.orderFactory).toBe(orderFactory)
    })

    test('it should take a Summary Printer as the second parameter', () => {
      const printer = jest.fn()
      const liveOrderBoard = new LiveOrderBoard(null, printer)
      expect(liveOrderBoard.printer).toBe(printer)
    })

    test('it should start with an empty array of orders', () => {
      const liveOrderBoard = new LiveOrderBoard(null, null)
      expect(liveOrderBoard._orders).toEqual([])
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
      const orderFactory = jest.fn()
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

    describe('it should add the orders to the board', () => {
      let liveOrderBoard
      const orderFactory = jest.fn()
      orderFactory.mockReturnValueOnce(buyOrder).mockReturnValueOnce(sellOrder)

      beforeAll(() => {
        liveOrderBoard = new LiveOrderBoard(orderFactory)
        liveOrderBoard.registerOrder(
          buyOrder.userId,
          buyOrder.quantity,
          buyOrder.price,
          buyOrder.type
        )
        liveOrderBoard.registerOrder(
          sellOrder.userId,
          sellOrder.quantity,
          sellOrder.price,
          sellOrder.type
        )
      })

      test('there should be 2 orders on the board', () => {
        expect(liveOrderBoard._orders.length).toBe(2)
      })

      test('the first order should be BUY', () => {
        expect(liveOrderBoard._orders[0]).toEqual(buyOrder)
      })

      test('the second order should be SELL', () => {
        expect(liveOrderBoard._orders[1]).toEqual(sellOrder)
      })
    })

    describe('#cancelOrder', () => {
      let liveOrderBoard
      const orderFactory = jest.fn()

      beforeEach(() => {
        orderFactory
          .mockReturnValueOnce(buyOrder)
          .mockReturnValueOnce(sellOrder)
          .mockReturnValueOnce(buyOrder2)
        liveOrderBoard = new LiveOrderBoard(orderFactory)
        liveOrderBoard.registerOrder(
          buyOrder.userId,
          buyOrder.quantity,
          buyOrder.price,
          buyOrder.type
        )
        liveOrderBoard.registerOrder(
          sellOrder.userId,
          sellOrder.quantity,
          sellOrder.price,
          sellOrder.type
        )
        liveOrderBoard.registerOrder(
          buyOrder2.userId,
          buyOrder2.quantity,
          buyOrder2.price,
          buyOrder2.type
        )
      })

      test('it should cancel the first order', () => {
        liveOrderBoard.cancelOrder(1)
        expect(liveOrderBoard._orders.length).toBe(2)
        expect(liveOrderBoard._orders[0]).toEqual(sellOrder)
        expect(liveOrderBoard._orders[1]).toEqual(buyOrder2)
      })

      test('it should cancel the second order', () => {
        liveOrderBoard.cancelOrder(2)
        expect(liveOrderBoard._orders.length).toBe(2)
        expect(liveOrderBoard._orders[0]).toEqual(buyOrder)
        expect(liveOrderBoard._orders[1]).toEqual(buyOrder2)
      })

      test('it should cancel the third order', () => {
        liveOrderBoard.cancelOrder(3)
        expect(liveOrderBoard._orders.length).toBe(2)
        expect(liveOrderBoard._orders[0]).toEqual(buyOrder)
        expect(liveOrderBoard._orders[1]).toEqual(sellOrder)
      })
    })
  })

  describe('#summary', () => {
    test('it should delegate to the printer', () => {
      const mockPrinter = new OrderBoardPrinter()
      const liveOrderBoard = new LiveOrderBoard(null, mockPrinter)
      liveOrderBoard.summary()
      expect(mockPrinter.summary).toHaveBeenCalledTimes(1)
      expect(mockPrinter.summary).toHaveBeenCalledWith(liveOrderBoard._orders)
    })
  })
})
