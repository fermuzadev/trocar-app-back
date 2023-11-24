import { Request, Response } from "express";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { sendEmail } from "../middlewares/sendMailOrders";

async function index(req: Request, res: Response) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function show(req: Request, res: Response) {
  try {
    const order = await Order.findById(req.body.orderId);
    return res.json(order);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function store(req: Request, res: Response) {
  const updated = false;

  try {
    const order = await Order.create({
      user: req.body.user,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
      totalQuantity: req.body.totalQuantity,
      status: req.body.status,
      paymentMethod: req.body.paymentMethod,
      deliveryDate: req.body.deliveryDate,
      shippingDate: req.body.shippingDate,
    });

    for (const product of req.body.products) {
      await Product.findByIdAndUpdate(product.id, {
        stock: product.stock - product.quantity,
      });
    }

    sendEmail(order, updated);
    return res.status(201).json(order);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

async function update(req: Request, res: Response) {
  const updated = true;

  try {
    const order = await Order.findByIdAndUpdate(
      req.body.orderId,
      {
        products: req.body.products,
        totalAmount: req.body.totalAmount,
        totalQuantity: req.body.totalQuantity,
        status: req.body.status,
        paymentMethod: req.body.paymentMethod,
        deliveryDate: req.body.deliveryDate,
        shippingDate: req.body.shippingDate,
      },
      { new: true },
    );

    if (order != null) {
      sendEmail(order, updated);
    }
    return res.status(209).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function destroy(req: Request, res: Response) {
  try {
    const order = await Order.findByIdAndDelete(req.body.orderId);
    return res.status(200).send({ message: "Order deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export default { index, show, store, update, destroy };
