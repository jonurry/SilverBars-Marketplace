import OrderBoardPrinter from '../src/printer.js'

describe('OrderBoardPrinter', () => {
  test('Print BUY Orders (highest price first)', () => {
    const buyOrders = [
      {
        userId: 1,
        quantity: 2.5,
        price: 303,
        type: 'BUY'
      },
      {
        userId: 2,
        quantity: 1.4,
        price: 306,
        type: 'BUY'
      },
      {
        userId: 2,
        quantity: 1.2,
        price: 307,
        type: 'BUY'
      },
      {
        userId: 2,
        quantity: 1.6,
        price: 306,
        type: 'BUY'
      }
    ]
    const expectedOutput = `BUY: 1.2kg for £307
BUY: 3.0kg for £306
BUY: 2.5kg for £303`
    const printer = new OrderBoardPrinter()
    expect(printer.summary(buyOrders)).toEqual(expectedOutput)
  })
})
