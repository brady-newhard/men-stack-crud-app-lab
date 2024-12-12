const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, required: true },
  image: String
})

const Bike = mongoose.model('Bike', bikeSchema);
module.exports = Bike;


