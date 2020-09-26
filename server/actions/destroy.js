// const User = require('../models/User');
// const Book = require('../models/Book');
// const Order = require('../models/Order');

// module.exports = async () => {
//   try {
//     // const users = await User.find();
//     // users.forEach((user) => (user.view = []));
//     // users.forEach((user) => (user.complaint = []));
//     // users.forEach((user) => (user.review = []));
//     // users.forEach(async (user) => await user.save());
//     const books = await Book.find();
//     // books.forEach((book) => (book.viewCounter = 0));
//     // books.forEach(async (book) => await book.save());
//     books.forEach(
//       async (book) =>
//         book.copy && book.copy.forEach((copy) => (copy.isSold = false))
//     );
//     books.forEach(async (book) => book.save());
//     // );
//   } catch (error) {
//     console.error(error);
//   }
// };
