const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true, auto: true },
  userId: { type: String },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  zoom: { type: Number },
  radius: { type: Number },
  color: { type: { key: String, value: String } },
  playerRadius: { type: Number },
  accuracy: { type: Number },
  address: { type: String },
  timestamp: { type: Date, default: Date.now }
});

LocationSchema.virtual('url').get(function () {
  return '/locations/' + this.id;
});

module.exports = mongoose.model('LocationModel', LocationSchema);
