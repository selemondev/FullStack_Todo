const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getCredentials } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
router.get("/credentials", protect, getCredentials)
router.post("/register", registerUser)
router.post("/login", loginUser)
module.exports = router;
