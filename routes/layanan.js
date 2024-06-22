const express = require("express");
const router = express.Router();
const {
  createLayanan,
  getLayananAll,
  getLayananFilter,
  verifikasiLayanan,
  tolakLayanan,
  validasiLayanan,
  selesaiLayanan,
} = require("../controller/layanan");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, getLayananAll);
router.post("/", authMiddleware, createLayanan);
router.post("/filter", authMiddleware, getLayananFilter);
router.put("/verifikasi", authMiddleware, verifikasiLayanan);
router.put("/tolak", authMiddleware, tolakLayanan);
router.put("/validasi", authMiddleware, validasiLayanan);
router.put("/selesai", authMiddleware, selesaiLayanan);

module.exports = router;
