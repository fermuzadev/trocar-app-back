const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");

faker.locale = "en";

module.exports = async () => {
  const users = [];
  paymentMethods = ["Visa", "Mastercard", "Paypal"];

  for (let i = 0; i < 10; i++) {
    users.push(
      new User({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        password: await bcrypt.hash(process.env.SESSION_CREDENTIAL, 10),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address:
          faker.address.streetAddress() +
          ", " +
          faker.address.city() +
          ", " +
          faker.address.country(),
       
      }),
    );
  }
  // for (const user of users) {
  //   const products = await Product.find().populate("container").populate("style");
  //   let totalAmount = 0;

  //   if (Math.random() > 0.5 ? 1 : 0) {
  //     for (const product of products) {
  //       if (Math.random() > 0.5 ? 1 : 0) {
  //         const productQuantity = Math.floor(Math.random() * 5);
  //         if (productQuantity > 0) {
  //           totalAmount += Number((product.style.price * product.container.volume).toFixed(2));
  //           const productObj = { product: product, productQuantity: productQuantity };
  //           productsArr.push(productObj);
  //         }
  //       }
  //     }
  //     const startDate = new Date('2023-01-01');
  //     const endDate = new Date('2023-6-30');
  //     const randomDate = faker.date.between(startDate, endDate);

  //     const order = new Order({
  //       user: user._id,
  //       products: productsArr,
  //       totalAmount: totalAmount,
  //       status: "paid",
  //       paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
  //       deliveryDate: randomDate,
  //       shippingDate: new Date(randomDate.getFullYear(), randomDate.getMonth(), randomDate.getDate() - 1)
  //     });
  //     await order.save();
  //   }
  // }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
