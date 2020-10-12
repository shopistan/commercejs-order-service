const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    status: { type: String },
    items:   [{ type:mongoose.Schema.Types.ObjectId, ref:"OrderItem"}],
    customer: { type:mongoose.Schema.Types.ObjectId, ref:"OrderCustomer"}
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model('Order', schema);
