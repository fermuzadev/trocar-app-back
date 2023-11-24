import { Schema, model, Document, Mongoose } from "mongoose";
import slugify from "slugify";

interface Product extends Document {
  stock: number;
  updatedAt: Date;
  name: string;
  reports: any[];
}

const productSchema: Schema<Product> = new Schema({
  stock: Number,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  name: String,
  reports: [],
});

productSchema.set("toJSON", { virtuals: true });

productSchema.virtual("slug").get(function (this: Product): string {
  return slugify(this.name, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "en", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
});

export default model<Product>("Product", productSchema);

const Product = model<Product>("Product", productSchema);

export {Product}