const express = require("express");
const router = express.Router();
const { createtd, gettd } = require("./td_controller");
const { ctd_val } = require("./validators/ctd_val");


router.post("/", ctd_val ,createtd);

router.get("/", gettd);

module.exports = router;
