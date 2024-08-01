const express = require("express");
const router = express.Router();
const {
  getPaketLayanan,
  getPaketLayananAll,
} = require("../controller/paketLayanan");
const authMiddleware = require("../middleware/auth");

router.get("/", getPaketLayananAll);
router.get("/:id", authMiddleware, getPaketLayanan);

module.exports = router;
