const Message = require("../models/Message");

async function index(req, res) {
  const messages = await Message.find();
  return res.json(messages);
}

module.exports = {
  index,
};
