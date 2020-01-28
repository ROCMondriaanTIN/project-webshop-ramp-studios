const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  product: {type: String},          // productnaam
  brand: {type: String},            // merk
  description: {type: String},      // omschrijving
  price:{type: Double},             // prijs
  quantityInStock: {type: Integer}, //aantal op voorraad
  reviews: [ { post: { type: Schema.Types.ObjectId, ref: 'posts'} } ] // nog niet getest 
});

module.exports = Product = mongoose.model('product', ProductSchema);