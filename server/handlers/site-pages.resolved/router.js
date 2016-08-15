"use strict";

const Router = require("koa-router");

const router = new Router();

router.get("/", require("./controllers/getIndexPage").getIndexPage);
router.post("/send", require("./controllers/sendMail").postMail);

module.exports = router;
