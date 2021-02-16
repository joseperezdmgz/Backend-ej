"use strict";

const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/backend", require("./routes/user-routes"));

module.exports = app;
