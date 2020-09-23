const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    postal: {
      type: String,
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  search: [String],
  view: [
    {
      type: Schema.Types.ObjectId,
      ref: 'book',
    },
  ],
  review: [
    {
      writer: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      text: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  complaint: [
    {
      subject: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      action: String,
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
