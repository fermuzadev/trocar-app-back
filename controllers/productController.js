const Product = require("../models/Product");

async function index(req, res) {
  const products = await Product.find();

  return res.status(200).json(products);
}

async function show(req, res) {
  const product = await Product.findById(req.params.id);

  return res.json(product);
}

async function store(req, res) {
  console.log(req.body.container);
  try {
    const newProduct = await Product.create({
      stock: req.body.stock,
      name: req.body.name,
    });
    const product = await Product.findOne(newProduct);
    return res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function update(req, res) {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      stock: req.body.stock,
    });
    const productToFront = await Product.findById(req.params.id);

    res.status(201).json(productToFront);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function destroy(req, res) {
  try {
    await Product.findByIdAndDelete(req.body.productId);

    return res.status(200).send({ message: "Product deleted" });
  } catch (err) {
    return res.status(404).send({ message: "Something went wrong, try again later" });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
