const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");

router.get("/", (req, res) => {
  res.status(200).json({ message: "FLATNET-BE RUN" });
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = router;
