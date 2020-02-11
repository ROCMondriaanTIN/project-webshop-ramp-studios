const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const productSchema = new Schema({
  name: {type: String},          // productnaam
  brand: {type: String},            // merk
  images: [{type: String}],
  description: {type: String},      // omschrijving
  price: {type: Number},             // prijs
  quantityInStock: {type: Number}, //aantal op voorraad
  reviews: [ { post: { type: Schema.Types.ObjectId, ref: 'posts'} } ] // nog niet getest 
});

module.exports = Product = mongoose.model('Product', productSchema);