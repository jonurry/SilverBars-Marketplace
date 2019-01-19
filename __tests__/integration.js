import createOrder from '../src/order.js'
import LiveOrderBoard from '../src/board.js'
import OrderBoardPrinter from '../src/printer.js'

describe('Integration Tests', () => {
  test('Board should use default order factory and printer if not specified', () => {
    const board = new LiveOrderBoard()
    expect(board.orderFactory).toBeInstanceOf(Function)
    expect(board.printer).toBeInstanceOf(OrderBoardPrinter)
  })

  test('Summary should be empty when no orders have been placed', () => {
    const board = new LiveOrderBoard()
    expect(board.summary()).toEqual('')
  })

  test('Summary should be empty if orders are placed and then cancelled', () => {
    const printer = new OrderBoardPrinter()
    const board = new LiveOrderBoard(createOrder, printer)
    board.registerOrder(1, 2.2, 301, 'BUY')
    board.registerOrder(2, 3.0, 304, 'SELL')
    board.registerOrder(3, 1.3, 305, 'BUY')
    board.cancelOrder(2)
    board.cancelOrder(2)
    board.cancelOrder(1)
    expect(board.summary()).toEqual('')
  })

  test('Summary should display BUY and SELL orders in the correct order', () => {
    const printer = new OrderBoardPrinter()
    const board = new LiveOrderBoard(createOrder, printer)
    board.registerOrder(4, 2.2, 301, 'BUY')
    board.registerOrder(1, 3.5, 306, 'SELL')
    board.registerOrder(2, 1.2, 310, 'SELL')
    board.registerOrder(3, 2.9, 301, 'BUY')
    board.registerOrder(3, 1.5, 307, 'SELL')
    board.registerOrder(2, 1.6, 303, 'BUY')
    board.registerOrder(4, 2.0, 306, 'SELL')
    board.registerOrder(1, 3.5, 305, 'BUY')
    board.registerOrder(4, 0.8, 303, 'BUY')
    expect(board.summary()).toEqual(`BUY: 3.5kg for £305
BUY: 2.4kg for £303
BUY: 5.1kg for £301
SELL: 5.5kg for £306
SELL: 1.5kg for £307
SELL: 1.2kg for £310`)
  })
})
