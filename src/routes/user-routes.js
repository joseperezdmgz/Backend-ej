"use strict";

const { Router } = require("express");
const loginUser = require("../controllers/users/login-users");
const router = Router();
const createUser = require("../controllers/users/register-users");
const validateAuth = require("../middlewares/validate-auth");
const { gotCharacters, gotHouses } = require("../controllers/got/user-got");

router.post("/register", createUser);
router.post("/login", loginUser);

router.get("/got/characters", validateAuth, gotCharacters);
router.get("/got/houses", validateAuth, gotHouses);

module.exports = router;
