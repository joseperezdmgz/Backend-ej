"use strict";
const { getConnection } = require("../../database");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const createJsonError = require("../../errors/create_error_json");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  repetirPassword: Joi.ref("password"),
});

async function createUser(req, res) {
  try {
    const { email, password } = req.body;
    await schema.validateAsync(req.body);

    const passwordHash = await bcrypt.hash(password, 12);

    const emailRepeat = await getConnection()
      .get("users")
      .find({ email })
      .value();

    if (!emailRepeat) {
      const createUser = await getConnection()
        .get("users")
        .push({ email, password: passwordHash })
        .write();
      res.send({ message: "User create" });
    } else {
      const error = new Error("Este email ya está registrado");
      error.status = 409;
      throw error;
    }
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createUser;
