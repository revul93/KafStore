const Book = require('../../models/Book');
const User = require('../../models/User');
const getUserCopies = require('./getUserCopies');

module.exports = async (user_id) => {
  if (user_id) {
    return await getRecommendedOfUser(user_id);
  } else {
    return await getRecommendedOfGuest();
  }
};

const getRecommendedOfUser = async (user_id) => {
  const mostViewedBook = await getMostViewedBook();
  const lastViewedBook = await getLastViewedBookOfUser(user_id);
  const similarBookToLastViewedBook = await getSimilarBookToLastViewedBook(
    lastViewedBook
  );
  const bookOfHighestRatingUser = await getBookOfHighestRatingUser();

  let recommendedBooks = [];
  if (mostViewedBook) recommendedBooks.push(mostViewedBook);
  if (lastViewedBook) recommendedBooks.push(lastViewedBook);
  if (similarBookToLastViewedBook)
    recommendedBooks.push(lastsimilarBookToLastViewedBookViewedBook);
  if (bookOfHighestRatingUser) recommendedBooks.push(bookOfHighestRatingUser);

  return await extendRecommendedBooks(recommendedBooks);
};

const getRecommendedOfGuest = async () => {
  const mostViewedBook = await getMostViewedBook();
  const mostAddedBook = await getMostAddedBook();
  const bookOfHighestRatingUser = await getBookOfHighestRatingUser();

  let recommendedBooks = [];
  if (mostViewedBook) recommendedBooks.push(mostViewedBook);
  if (mostAddedBook) recommendedBooks.push(mostAddedBook);
  if (bookOfHighestRatingUser) recommendedBooks.push(bookOfHighestRatingUser);

  return await extendRecommendedBooks(recommendedBooks);
};

const getMostViewedBook = async () => {
  try {
    let mostViewedBooks = await Book.find({ 'copy.isSold': false }).sort({
      viewCounter: -1,
    });
    let mostViewedBook;
    for (i = 0; i < mostViewedBooks.length; i++) {
      mostViewedBook = mostViewedBooks[i];
      if (mostViewedBook.copy.filter((copy) => !copy.isSold).length > 0) {
        break;
      }
    }
    return mostViewedBook;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getMostAddedBook = async () => {
  try {
    const mostAddedBooks = (
      await Book.find({ 'copy.isSold': false })
    ).sort((book, nextBook) =>
      book.copy.length > nextBook.copy.length ? -1 : 1
    );
    let mostAddedBook;
    for (let i = 0; i < mostAddedBooks.length; i++) {
      mostAddedBook = mostAddedBooks[i];
      if (mostAddedBook.copy.filter((copy) => !copy.isSold).length > 0) {
        break;
      }
    }
    return mostAddedBook;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getBookOfHighestRatingUser = async () => {
  const getTotalRating = (user) =>
    user.review.reduce((totalRating, review) => totalRating + review.rating, 0);

  try {
    const users = await User.find();
    const highestRatingUsers = users.sort((user, nextUser) =>
      getTotalRating(user) > getTotalRating(nextUser) ? -1 : 1
    );

    for (let i = 0; i < highestRatingUsers.length; i++) {
      let booksOfHighestRatingUser = await getUserCopies(
        highestRatingUsers[i]._id
      );
      let bookOfHighestRatingUser;
      for (let j = 0; j < booksOfHighestRatingUser.length; j++) {
        bookOfHighestRatingUser = booksOfHighestRatingUser[j];
        if (
          bookOfHighestRatingUser.copy.filter((copy) => !copy.isSold).length > 0
        ) {
          return bookOfHighestRatingUser;
        }
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getLastViewedBookOfUser = async (user_id) => {
  try {
    const user = await User.findById(user_id);
    if (user.view) {
      const lastViewedBook = await Book.find({
        _id: user.view[0],
        'copy.isSold': false,
      })[0];
      return lastViewedBook;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getSimilarBookToLastViewedBook = async (similarBook) => {
  try {
    if (!similarBook) {
      return null;
    }
    const result = Book.find({
      section: 'similarBook.section',
      'copy.isSold': false,
    });
    if (result && result.length > 0) {
      console.log(result);
      if (result[0]._id.toString() === similarBook._id.toString()) {
        return result[1];
      } else {
        return result[0];
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const removeDuplicateBooks = (books) => {
  // console.log('----------');
  // books.forEach((book) => console.log(Array.isArray(book)));
  if (!books || books.length === 0) return null;
  try {
    return books.reduce((result, book) => {
      if (result.length === 0) {
        result.push(book);
      } else if (
        !result.find(
          (bookAdded) => bookAdded._id.toString() === book._id.toString()
        )
      ) {
        result.push(book);
      }
      return result;
    }, []);
  } catch (error) {
    console.error(error);
    return books;
  }
};

const extendRecommendedBooks = async (recommendedBooks) => {
  try {
    let extendedRecommendedBooks = removeDuplicateBooks(recommendedBooks);

    const books = await Book.find({ 'copy.isSold': false });
    for (
      let i = 0;
      extendedRecommendedBooks.length < 4 && i < books.length / 2;
      i++
    ) {
      extendedRecommendedBooks.push(
        books[Math.floor((Math.random() * 1000) % books.length)]
      );
      extendedRecommendedBooks = removeDuplicateBooks(extendedRecommendedBooks);
    }
    return extendedRecommendedBooks;
  } catch (error) {
    console.log(error);
    return null;
  }
};
