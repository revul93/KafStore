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
      required: true,
    },
    postal: {
      type: String,
    },
  },
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
