const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getPetugasAll,
  getPetugasById,
} = require("../controller/user");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, getUsers);
router.get("/petugas", authMiddleware, getPetugasAll);
router.get("/petugas/:id", authMiddleware, getPetugasById);
router.get("/:id", authMiddleware, getUser);
router.post("/", authMiddleware, createUser);
router.put("/", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
