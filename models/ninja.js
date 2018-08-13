const mongoose = require('mongoose');

//create a geo location Schema
const GeoSchema = mongoose.Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates:{
    type:[Number],
    index: '2dsphere'
  }
});


//create ninja schema and model
const NinjaSchema = mongoose.Schema({
  name:{
    type: String,
    required:[true,"Name field is required"]
  },
  rank: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
});

const Ninja = mongoose.model('ninja',NinjaSchema);

module.exports = Ninja;
