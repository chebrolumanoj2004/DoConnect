const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
router.get("/profile", authMiddleware, authController.getProfile);
console.log("Auth routes loaded");

router.get("/test", (req, res) => {
  res.send("Auth route working");
});

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;