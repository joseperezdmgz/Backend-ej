"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createJsonError = require("../../errors/create_error_json");
const { getConnection } = require("../../database");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

async function loginUser(req, res) {
  try {
    await schema.validateAsync(req.body);
    const { email, password } = req.body;

    const user = await getConnection().get("users").find({ email }).value();

    if (!user) {
      const error = new Error("El usuario o la contraseña no son correctos");
      error.status = 403;
      throw error;
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      const error = new Error("El usuario o la contraseña no son correctos");
      error.status = 403;
      throw error;
    }

    const secret = process.env.JWT_SECRET;
    const jwtTokenExpiration = "30m";
    const payload = {
      email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });

    const responde = {
      accessToken: token,
      expiresIn: jwtTokenExpiration,
    };

    res.send(responde);
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = loginUser;
