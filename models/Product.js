const { mongoose } = require("../db");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
  stock: Number,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  name: String,
});
productSchema.set("toJSON", { virtuals: true });

// productSchema.methods.toJSON = function () {
//   const product = this._doc;
//   product.id = this._id.toString();
//   delete product._id;
//   return product;
// };

productSchema.virtual("slug").get(function () {
  return slugify(this.name, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "en", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
});

module.exports = mongoose.model("Product", productSchema);
