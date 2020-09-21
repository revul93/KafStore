const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  item: {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'book',
      required: true,
    },
    copy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentAccount: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'في الانتظار',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model('order', OrderSchema);
