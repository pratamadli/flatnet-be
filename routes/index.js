const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const roleRoutes = require("./role");
const paketLayananRoutes = require("./paketLayanan");
const dashboardRoutes = require("./dashboard");
const layananRoutes = require("./layanan");

router.get("/", (req, res) => {
  res.status(200).json({ message: "FLATNET-BE RUN" });
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/role", roleRoutes);
router.use("/paket-layanan", paketLayananRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/layanan", layananRoutes);

module.exports = router;
