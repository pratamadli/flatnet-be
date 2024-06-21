const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const roleRoutes = require("./role");
const paketLayananRoutes = require("./paketLayanan");
const dashboardRoutes = require("./dashboard");

router.get("/", (req, res) => {
  res.status(200).json({ message: "FLATNET-BE RUN" });
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/role", roleRoutes);
router.use("/paket-layanan", paketLayananRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
