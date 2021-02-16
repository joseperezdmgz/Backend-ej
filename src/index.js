"use strict";
const app = require("./app");
require("dotenv").config();

const port = process.env.SERVER_PORT || 3080;

const { createConnection } = require("./database");

createConnection();

app.listen(port, () => console.log(`Listening ${port}...`));
