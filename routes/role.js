const express = require("express");
const router = express.Router();
const { getRole, getRoles } = require("../controller/role");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, getRoles);
router.get("/:id", authMiddleware, getRole);

module.exports = router;
