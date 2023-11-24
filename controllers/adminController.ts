import { Request, Response } from "express";
import {Admin} from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

async function index(req: Request, res: Response) {
  try {
    const admin = await Admin.find().select("-password");
    return res.json(admin);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function login(req: Request, res: Response) {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (admin) {
      const checkPass = await bcrypt.compare(req.body.password, admin.password);

      if (checkPass) {
        const token = jwt.sign({ id: admin.id }, process.env.JWT_ADMIN_SECRET_KEY as Secret, {
          expiresIn: "9h",
        });

        const adminToFront = {...admin, password: undefined, token}

        return res.status(201).json(adminToFront);
      } else {
        return res.status(401).send({ message: "Incorrect Credentials" });
      }
    } else {
      return res.status(401).send({ message: "Incorrect Credentials" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function store(req: Request, res: Response) {
  try {
    const admin = await Admin.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    return res.status(200).json(admin);
  } catch (error) {
    return res.status(404).send({ message: "Something went wrong, try again later" });
  }
}

async function update(req: Request, res: Response) {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
      },
      { new: true },
    );

    return res.status(200).json(admin);
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong, try again later" });
  }
}

async function destroy(req: Request, res: Response) {
  try {
    await Admin.findByIdAndDelete(req.body.adminId);
    return res.status(200).send({ message: "Admin deleted" });
  } catch (error) {
    return res.status(404).send({ message: "Something went wrong, try again later" });
  }
}

export default {
  index,
  login,
  store,
  update,
  destroy,
};