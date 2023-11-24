import { Request, Response } from "express";
import { User } from "../models/User";
import { Order } from "../models/Order";
import jwt, { Secret } from "jsonwebtoken";
import { sendForgotPassMail } from "../middlewares/sendForgotPassMail";

async function index(req: Request, res: Response) {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(401).json(error);
  }
}

async function show(req: Request, res: Response) {
  try {
    const user = await User.findOne({ email: req.body.email }).select("-password");

    if (user != null) {
      const orders = await Order.find({ user: user.id });

      const userToFront = { ...user, orders };
      return res.status(200).json(userToFront);
    }
  } catch (error) {
    return res.status(401).json(error);
  }
}

async function store(req: Request, res: Response) {
  try {
    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      shippingAddress: req.body.shippingAddress,
    });

    return newUser
      ? res.status(201).json(newUser)
      : res.status(409).send({ message: "Something went wrong, try again later" });
  } catch (error) {
    return res.status(409).send({ message: "Something went wrong, try again later" });
  }
}

async function update(req: Request, res: Response) {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
      },
      { new: true },
    ).select("-password");

    if (user != null) {
      const orders = await Order.find({ user: user.id })
        .sort({ createdAt: -1 })
        .populate("user", "-password");

      const userToFront = { ...user, orders };

      return res.status(202).json(userToFront);
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function destroy(req: Request, res: Response) {
  try {
    await User.findByIdAndDelete(req.body.userId);
    return res.status(200).json("User deleted successfully");
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function requestPass(req: Request, res: Response) {
  try {
    const user = await User.findOne({ email: req.body.email }).select("-password");

    if (user) {
      sendForgotPassMail(user);
      return res.status(200).json("Check your email for more information");
    } else {
      return res.status(400).json("This account does not exist");
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function resetPass(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id);

    if (user != null) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_CUSTOMER_SECRET_KEY as Secret, {
        expiresIn: "10h",
      });

      user.password = String(req.body.password);
      await user.save();

      const userToFront = { ...user, password: undefined, token };

      return res.status(202).json(userToFront);
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function getOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const filteredOrders = orders.filter((order) => order.user._id === req.body.userId);
    return res.status(200).json(filteredOrders);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export default {
  index,
  show,
  store,
  update,
  destroy,
  getOrders,
  requestPass,
  resetPass,
};
