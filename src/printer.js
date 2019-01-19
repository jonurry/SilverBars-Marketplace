// Returns an array of formatted orders e.g.
// BUY: 1.2kg for £307
// SELL: 5.5kg for £306
const formatLineItems = (orders, type) => {
  return orders.map(
    order => `${type}: ${formatQuantity(order.quantity)}kg for £${order.price}`
  )
}

// Quality is formatted to 1 decimal place e.g. 2.0, 3.6
const formatQuantity = quantity => {
  return (Math.round(quantity * 10) / 10).toFixed(1)
}

// Returns a new array of orders where the order type is either BUY or SELL
const filterOrdersByType = (orders, type) => {
  return orders.filter(order => order.type == type)
}

// Returns a new array containing unique prices and the
// accumulated quantities bought or sold at those prices
const mergeByPrice = orders => {
  // Convert Orders array into a Map where the keys are the unique prices
  // and the values are the accumulated quantities at those prices
  let prices = orders.reduce((prev, curr) => {
    let count = prev.get(curr.price) || 0
    prev.set(curr.price, curr.quantity + count)
    return prev
  }, new Map())

  // Convert the Map back into an Array
  return [...prices].map(([price, quantity]) => {
    return { price, quantity }
  })
}

// Sort orders by price, ascending by default,
// descending if second param is false
const sortByPrice = (orders, asc = true) => {
  return orders.sort((a, b) => {
    return asc ? a.price - b.price : b.price - a.price
  })
}

export default class OrderBoardPrinter {
  summary(orders) {
    let buyOrders = sortByPrice(
      mergeByPrice(filterOrdersByType(orders, 'BUY')),
      false
    )
    let sellOrders = sortByPrice(
      mergeByPrice(filterOrdersByType(orders, 'SELL'))
    )
    return formatLineItems(buyOrders, 'BUY')
      .concat(formatLineItems(sellOrders, 'SELL'))
      .join('\n')
  }
}
