const express = require("express");
const login = require("../controllers/login.js");
const router = express.Router();

router.post("/login", login);

export default router;
