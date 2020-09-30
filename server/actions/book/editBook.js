const queryBook = require('./queryBook');

module.exports = async (data) => {
  let book = await queryBook(data.book_id);
  if (!book) {
    return null;
  }
  if (data.title) book.title = data.title;
  if (data.author) book.author = data.author;
  if (data.isbn) book.isbn = data.isbn;
  if (data.description) book.description = data.description;
  if (data.section) book.section = data.section;
  if (data.coverImage) book.coverImage = data.coverImage;
  if (data.publisher) book.publisher = data.publisher;
  if (data.publicationYear) book.publicationYear = data.publicationYear;
  if (data.language) book.language = data.language;
  if (data.copy_id) {
    const copyIndex = book.copy.findIndex(
      (copy) => copy._id.toString() === data.copy_id
    );
    book.copy[copyIndex].price = data.price;
    book.copy[copyIndex].condition = data.condition;
  }

  await book.save();
  return book;
};
