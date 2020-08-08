const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Complaint({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  type: String,
  describtion: String,
  status: String,
  seen: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
  action: String,
});

module.exports = Complaint = mongoose.model('complaint', ComplaintSchema);
