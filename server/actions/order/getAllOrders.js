const Order = require('../../models/Order');
const strings = require('../../static/strings');

module.exports = async () => {
  const order = await Order.find()
    .populate('seller', ['name'])
    .populate('buyer', ['name'])
    .populate('item.book', ['title', 'author', 'copy']);
  if (!order) {
    throw strings.NO_DATA;
  }

  return order;
};
