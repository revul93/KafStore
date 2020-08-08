const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  seller: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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
      isAvailable: {
        type: Boolean,
        default: true,
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
  division: {
    type: String,
    required: true,
  },
  subdivison: {
    type: String,
    required: true,
  },

  coverImage: {
    type: String,
    required: true,
  },
  describtion: String,
  publisher: String,
  publicationYear: Date,
  language: String,
  translated: Boolean,
  translator: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Book = mongoose.model('book', BookSchema);
