const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
// var { expressjwt: checkJwt } = require("express-jwt");

router.get("/", messageController.index);

module.exports = router;
