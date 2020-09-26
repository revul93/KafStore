const queryBook = require('./queryBook');

module.exports = async (data) => {
  let book = await queryBook(data.book_id);
  if (!book) {
    return null;
  }

  const copyIndex = book.copy.findIndex(
    (copy) => copy._id.toString() === data.copy_id
  );
  book.copy[copyIndex].price = data.price;
  book.copy[copyIndex].condition = data.condition;
  await book.save();
  return book;
};
