const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {type: String, default: 'Cart'},
  artikels: [{
    artikel: {
      type: Schema.Types.ObjectId,
      ref: 'artikels'
    },
    amount: {type: Integer, default: 1}
  }], 
  date: {
      type: Date,
      default: Date.now
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;