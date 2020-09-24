const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  copy: [
    {
      seller: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      condition: {
        type: String,
        required: true,
      },
      images: [String],
      date: {
        type: Date,
        default: Date.now,
      },
      isSold: {
        type: Boolean,
        default: false,
      },
    },
  ],
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  section: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  description: String,
  publisher: String,
  publicationYear: Date,
  language: String,
  viewCounter: {
    type: Number,
    default: 0,
  },
  saleTimes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Book = mongoose.model('book', BookSchema);
