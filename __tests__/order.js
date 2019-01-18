import Order from '../src/order.js'

describe('Order', () => {
  describe('#constructor', () => {
    describe('valid parameters', () => {
      test('it should create a BUY order', () => {
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

      test('it should create a SELL order', () => {
        const USER_ID = 2
        const QUANTITY = 2.9
        const PRICE_PER_KG = 312
        const TYPE = 'SELL'
        let order = new Order(USER_ID, QUANTITY, PRICE_PER_KG, TYPE)
        expect(order.userId).toEqual(USER_ID)
        expect(order.quantity).toEqual(QUANTITY)
        expect(order.price).toEqual(PRICE_PER_KG)
        expect(order.type).toEqual(TYPE)
      })
    })

    describe('invalid parameters', () => {
      describe('wrong type used', () => {
        test('userId should be a number', () => {
          expect(() => {
            new Order('1')
          }).toThrowError('Error creating order, userId must be a number.')
        })

        test('quantity should be a number', () => {
          expect(() => {
            new Order(1, '3.5')
          }).toThrowError('Error creating order, quantity must be a number.')
        })

        test('price should be a number', () => {
          expect(() => {
            new Order(1, 3.5, {})
          }).toThrowError('Error creating order, price must be a number.')
        })

        test('type should be a string', () => {
          expect(() => {
            new Order(1, 3.5, 310, [])
          }).toThrowError('Error creating order, type must be a string.')
        })
      })

      describe('missing parameters', () => {
        test('userId is missing', () => {
          expect(() => {
            new Order()
          }).toThrowError(
            'Error creating order, the userId parameter is missing.'
          )
        })

        test('quantity is missing', () => {
          expect(() => {
            new Order(5)
          }).toThrowError(
            'Error creating order, the quantity parameter is missing.'
          )
        })

        test('price is missing', () => {
          expect(() => {
            new Order(5, 10)
          }).toThrowError(
            'Error creating order, the price parameter is missing.'
          )
        })

        test('type is missing', () => {
          expect(() => {
            new Order(5, 5.4, 314)
          }).toThrowError(
            'Error creating order, the type parameter is missing.'
          )
        })
      })

      describe('numbers must be positive', () => {
        test('userId must be a positive number', () => {
          expect(() => {
            new Order(-20)
          }).toThrowError(
            'Error creating order, userId must be a positive number.'
          )
        })

        test('quantity must be a positive number', () => {
          expect(() => {
            new Order(10, -5)
          }).toThrowError(
            'Error creating order, quantity must be a positive number.'
          )
        })

        test('price must be a positive number', () => {
          expect(() => {
            new Order(31, 2.2, -3)
          }).toThrowError(
            'Error creating order, price must be a positive number.'
          )
        })
      })

      describe('type should be \'BUY\' or \'SELL\' only', () => {
        test('\'TRADE\' is not a valid type', () => {
          expect(() => {
            new Order(1, 3.5, 310, 'TRADE')
          }).toThrowError(
            'Error creating order, type must be one of BUY, SELL.'
          )
        })
      })
    })
  })
})
