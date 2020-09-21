const Order = require('../../models/Order');
const strings = require('../../static/strings');

module.exports = async (order_id) => {
  const order = await Order.findById(order_id)
    .populate('seller', ['name'])
    .populate('buyer', ['name'])
    .populate('item.book', ['title', 'author', 'copy']);
  if (!order) {
    throw strings.NO_DATA;
  }

  return order;
};
