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
    type: Schema.Types.ObjectId,
    ref: 'book',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: String,
  amount: Number,
  paymentMethod: String,
});

module.exports = Order = mongoose.model('order', OrderSchema);
