// routes/authRoutes.js

const express = require("express"); // Already there, keep
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware"); 

router.post("/request-otp", authController.requestOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/me", authMiddleware, authController.getMe); 

module.exports = router;