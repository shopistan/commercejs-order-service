const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    sku: { type: String, required: true},
    quantity: { type: Number },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model('OrderItem', schema);
