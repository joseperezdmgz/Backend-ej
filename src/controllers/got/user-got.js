"use strict";
const fetch = require("node-fetch");
const createJsonError = require("../../errors/create_error_json");

async function gotCharacters(req, res) {
  try {
    await fetch("https://anapioficeandfire.com/api/characters")
      .then((response) => response.json())
      .then((data) => res.send(data));
  } catch (error) {
    createJsonError(error, res);
  }
}
async function gotHouses(req, res) {
  try {
    await fetch("https://anapioficeandfire.com/api/houses")
      .then((response) => response.json())
      .then((data) => res.send(data));
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = {
  gotHouses,
  gotCharacters,
};
