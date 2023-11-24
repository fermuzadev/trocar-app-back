const { mongoose } = require("../db");
const User = require("./User");

const messageSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Message", messageSchema);
