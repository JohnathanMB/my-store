const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  image: String,
  isBlock:{
    type: Boolean,
    default: true
  }
})

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel
