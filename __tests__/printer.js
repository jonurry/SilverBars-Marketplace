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

  test('Print SELL Orders (lowest price first)', () => {
    const sellOrders = [
      {
        userId: 1,
        quantity: 3.5,
        price: 306,
        type: 'SELL'
      },
      {
        userId: 2,
        quantity: 1.2,
        price: 310,
        type: 'SELL'
      },
      {
        userId: 3,
        quantity: 1.5,
        price: 307,
        type: 'SELL'
      },
      {
        userId: 4,
        quantity: 2.0,
        price: 306,
        type: 'SELL'
      }
    ]
    const expectedOutput = `SELL: 5.5kg for £306
SELL: 1.5kg for £307
SELL: 1.2kg for £310`
    const printer = new OrderBoardPrinter()
    expect(printer.summary(sellOrders)).toEqual(expectedOutput)
  })

  test('There are no Orders', () => {
    const printer = new OrderBoardPrinter()
    expect(printer.summary([])).toEqual('')
  })
})
