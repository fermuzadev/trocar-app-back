const { mongoose, Schema } = require("../db");

const orderSchema = new mongoose.Schema(
  {
    user: {},
    products: [],
    totalAmount: Number,
    totalQuantity: Number,
    paymentMethod: String,
    status: String,
    shippingDate: Date,
    deliveryDate: Date,
  },
  { timestamps: true },
);

// orderSchema.set("toJSON", { virtuals: true });
orderSchema.methods.toJSON = function () {
  const order = this._doc;
  order.id = this._id.toString();
  delete order._id;
  return order;
};

module.exports = mongoose.model("Order", orderSchema);
