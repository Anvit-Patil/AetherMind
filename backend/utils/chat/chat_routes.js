const express = require("express");
const router = express.Router();
const { createchat } = require("./chat_controller");

router.post('/', createchat);

module.exports = router;