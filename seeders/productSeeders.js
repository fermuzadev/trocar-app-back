const Product = require("../models/Product");
const { faker } = require("@faker-js/faker");

module.exports = async () => {
  const products = [];

  for (let i = 0; i < 10; i++) {
    products.push(
      new Product({
        stock: 100,
        name: faker.name.jobTitle(),
        photos: [],
      }),
    );
  }

  await Product.insertMany(products);
  console.log("[Database] Se corrió el seeder de Productos.");
};
