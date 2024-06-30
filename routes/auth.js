const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  isAuthenticated,
  getAuth,
} = require("../controller/auth");
const authMiddleware = require("../middleware/auth");
const {
  registerValidation,
  loginValidation,
} = require("../controller/auth/validation");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", authMiddleware, logout);
router.get("/user", authMiddleware, getAuth);
router.use("/protected", authMiddleware, isAuthenticated, (req, res) => {
  res.json({ message: "This is a protected route" });
});

module.exports = router;
