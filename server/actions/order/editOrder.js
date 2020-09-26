const Order = require('../../models/Order');
const strings = require('../../static/strings');

module.exports = async (order_id) => {
  const order = await Order.findById(order_id);
  order.status = 'تم الشحن';
  await order.save();
  return strings.SUCCESS;
};
