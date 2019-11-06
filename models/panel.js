var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PanelSchema = new Schema({
  value: { type: String },
  id: { type: String },
  timestamp: { type: Date }
});

// Export model.
module.exports = mongoose.model("Panel", PanelSchema);
