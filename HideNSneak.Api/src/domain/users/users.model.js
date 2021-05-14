const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

UserSchema.virtual('url').get(function () {
  return '/users/' + this.id;
});

module.exports = mongoose.model('UserModel', UserSchema);
