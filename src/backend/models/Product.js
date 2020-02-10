const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const productSchema = new Schema({
  name: {type: String},          // productnaam
  brand: {type: String},            // merk
  images: [{
    image: {type: String}
  }],
  category: {type: String},
  description: {type: String},      // omschrijving
  price: {type: Number},             // prijs
  sale: {type: Boolean, default: false},
  quantityInStock: {type: Number}, //aantal op voorraad
  reviews: [{ 
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
      type: Number,
      min:1,
      max:5
    }
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model('Product', productSchema);