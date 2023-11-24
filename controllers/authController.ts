import { Request, Response } from "express";
import {User} from "../models/User";
import {Order} from "../models/Order";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

async function login(req: Request, res: Response) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const checkPass = await bcrypt.compare(req.body.password, user.password);

      if (checkPass) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_CUSTOMER_SECRET_KEY as Secret, {
          expiresIn: "10h",
        });
        
        const orders = await Order.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate("user", "-password");
        
        
        const userToFront = { ...user, password: undefined, token, orders }; //

        return res.status(201).json(userToFront);
      } else {
        return res.status(401).send({ message: "Incorrect password, try again." });
      }
    } else {
      return res.status(401).send({ message: "Incorrect email, try again." });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function signUp(req: Request, res: Response) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res
        .status(409)
        .send({ message: "User already registered, try with another email or username" });
    } else {
      const newUser = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        shippingAddress: req.body.shippingAddress,
        password: req.body.password,
      });

      if (newUser) {
        const createdUser = await User.findOne({
          email: newUser.email,
        });
        if(createdUser != null){

          const token = jwt.sign({ id: createdUser.id }, process.env.JWT_CUSTOMER_SECRET_KEY as Secret, {
            expiresIn: "10h",
          });
        

          const userToFront = { ...createdUser, password: undefined, token,  }; //

          
          return res.status(201).json(userToFront);
        }
      } else {
        return res.status(502).send({ message: "User cannot be created, try later" });
      }
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function logOut(req: Request, res: Response) {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export default { login, signUp, logOut };