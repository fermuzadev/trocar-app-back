import { Schema, model, Document, Mongoose } from "mongoose";

interface Order extends Document {
  user: any;
  products: any[];
  totalAmount: number;
  totalQuantity: number;
  paymentMethod: string;
  status: string;
  shippingDate: Date;
  deliveryDate: Date;
  createdAt: Date;
}

const orderSchema: Schema<Order> = new Schema(
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

orderSchema.methods.toJSON = function (): any {
  const order = this._doc;
  order.id = this._id.toString();
  delete order._id;
  return order;
};

const Order = model<Order>("Order", orderSchema);

export { Order };
