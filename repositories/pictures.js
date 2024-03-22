const fs = require("fs");
const Repository = require("./repository");

class PicturesRepositories extends Repository {}

module.exports = new PicturesRepositories("pictures.json");
