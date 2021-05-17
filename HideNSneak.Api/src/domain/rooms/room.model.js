const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String },
  maxPlayers: { type: Number },
  currentPlayers: { type: Schema.Types.Array },
  timestamp: { type: Date, default: Date.now }
});

RoomSchema.virtual('url').get(function () {
  return '/rooms/' + this.id;
});

module.exports = mongoose.model('RoomModel', RoomSchema);
