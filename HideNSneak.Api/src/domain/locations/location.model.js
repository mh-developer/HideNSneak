const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    id: { type: Schema.Types.ObjectId, required: true, auto: true },
    userId: { type: String },
    lng: { type: String, required: true },
    lat: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

LocationSchema.virtual("url").get(function () {
    return "/locations/" + this.id;
});

module.exports = mongoose.model("LocationModel", LocationSchema);
