const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  isAuthenticated,
} = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.use("/protected", authMiddleware, isAuthenticated, (req, res) => {
  res.json({ message: "This is a protected route" });
});

module.exports = router;
