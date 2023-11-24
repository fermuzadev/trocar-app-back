import { Request, Response } from "express";
import Product from "../models/Product";

async function index(req: Request, res: Response) {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function show(req: Request, res: Response) {
  try {
    const product = await Product.findById(req.params.id);
    return res.json(product);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

async function store(req: Request, res: Response) {
  try {
    const newProduct = await Product.create({
      stock: req.body.stock,
      name: req.body.name,
    });

    const product = await Product.findOne({ _id: newProduct._id });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json(error);
  }
}

async function update(req: Request, res: Response) {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      stock: req.body.stock,
    });

    const productToFront = await Product.findById(req.params.id);
    return res.status(201).json(productToFront);
  } catch (error) {
    return res.status(404).json(error);
  }
}

async function destroy(req: Request, res: Response) {
  try {
    await Product.findByIdAndDelete(req.body.productId);
    return res.status(200).send({ message: "Product deleted" });
  } catch (error) {
    return res.status(404).send({ message: "Something went wrong, try again later" });
  }
}

export default { index, show, store, update, destroy };