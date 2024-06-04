const express = require("express");
const router = express.Router();
const {
createUser
} = require("../controller/user");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, createUser);


module.exports = router;
