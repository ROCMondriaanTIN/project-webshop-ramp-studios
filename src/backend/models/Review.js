const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    rating:{
      type:Integer,
      min:1,
      max:5
    }
  });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;