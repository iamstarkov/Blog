module.exports = {
  getError(errors, prop) {
    try {
      return errors.mapped()[prop].msg;
    } catch (err) {
      return "";
    }
  },
  addLinesToArticle(article) {
    const oldBody = article.body;
    article.body = oldBody.replace(/<\/p><p>/g, "</p>\r\n<p>");
    return article;
  },
  removeLinesFromArticle(article) {
    const oldBody = article.body;
    article.body = oldBody.replace(/<\/p>\r\n<p>/g, "</p><p>");
    return article;
  },
};
