const Book = require('../../models/Book');
const queryBook = require('./queryBook');
const strings = require('../../static/strings');

module.exports = async (user_id, data) => {
  let book = await queryBook(data.isbn);
  if (!book) {
    book = new Book();
    book.isbn = data.isbn;
  }

  if (data.title) book.title = data.title;
  if (data.author) book.author = data.author;
  if (data.section) book.section = data.section;
  if (data.coverImage) book.coverImage = data.coverImage;
  if (data.description) book.description = data.description;
  if (data.publisher) book.publisher = data.publisher;
  if (data.publicationYear) book.publicationYear = data.publicationYear;
  if (data.language) book.language = data.language;

  let copyIndex =
    !book.copy || book.copy.length == 0
      ? -1
      : book.copy.findIndex((copy) => copy._id.toString() == data.copy_id);

  let copy = {
    seller: user_id,
    price: data.price,
    condition: data.condition,
    images: data.images.split(','),
  };

  if (copyIndex != -1) {
    book.copy[copyIndex].price = copy.price;
    book.copy[copyIndex].condition = copy.condition;
    book.copy[copyIndex].images = copy.images;
  } else {
    book.copy.push(copy);
  }

  await book.save();
  return book;
};
