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
    board.cancelOrder(1)
    board.cancelOrder(1)
    expect(board.summary()).toEqual('')
  })
})
