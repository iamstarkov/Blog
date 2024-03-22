const express = require("express");
const router = express.Router();
const displayArticle = require("../../views/content/article");
const articlesRepo = require("../../repositories/articles");

//TEST!!!!!!!!!

const imagesRepo = require("../../repositories/pictures");
const displayImage = require("../../views/content/pictureTEST");

router.get("/pictureTEST", async (req, res) => {
  const id = "c941dc5f";
  const image = await imagesRepo.getOneBy({ id });
  res.send(displayImage(image));
});

//TEST
router.get("/articles/:id", async (req, res) => {
  const id = req.params.id;
  const article = await articlesRepo.getOneBy({ id });
  res.send(displayArticle(article));
});

module.exports = router;
