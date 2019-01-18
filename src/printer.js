const formatLineItems = (orders, type) => {
  return orders.map(
    order => `${type}: ${formatQuantity(order.quantity)}kg for £${order.price}`
  )
}

const formatQuantity = quantity => {
  return (Math.round(quantity * 10) / 10).toFixed(1)
}

const filterOrdersByType = (orders, type) => {
  return orders.filter(order => order.type == type)
}

const mergeByPrice = orders => {
  // first, convert data into a Map with reduce
  let prices = orders.reduce((prev, curr) => {
    let count = prev.get(curr.price) || 0
    prev.set(curr.price, curr.quantity + count)
    return prev
  }, new Map())

  // then, map the prices object back to an array
  let reducedObjArr = [...prices].map(([price, quantity]) => {
    return { price, quantity }
  })

  return reducedObjArr
}

const sortByPriceAsc = orders => {
  return orders.sort((a, b) => {
    return a.price - b.price
  })
}

export default class OrderBoardPrinter {
  summary(orders) {
    let buyOrders = sortByPriceAsc(
      mergeByPrice(filterOrdersByType(orders, 'BUY'))
    )
    return formatLineItems(buyOrders, 'BUY').join('\n')
  }
}
