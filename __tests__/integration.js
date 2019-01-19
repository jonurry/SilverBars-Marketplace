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
})
