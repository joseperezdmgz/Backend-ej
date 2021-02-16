"use strict";

const { Router } = require("express");
const loginUser = require("../controllers/users/login-users");
const router = Router();
const createUser = require("../controllers/users/register-users");
const validateAuth = require("../middlewares/validate-auth");

router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;
