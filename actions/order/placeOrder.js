const Order = require('../../models/Order');
const Book = require('../../models/Book');
const strings = require('../../static/strings');

module.exports = async (data) => {
  const order = new Order(data);
  const book = await Book.findById(order.item.book);

  if (!order || !book) throw strings.NO_DATA;

  // TODO: check if book already sold ?

  book.copy[
    book.copy.findIndex(
      (copy) => copy._id.toString() === order.item.copy._id.toString()
    )
  ].isSold = true;

  await order.save();
  await book.save();
  return strings.SUCCESS;
};
