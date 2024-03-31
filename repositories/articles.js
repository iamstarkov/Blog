const fs = require("fs");
const Repository = require("./repository");
const picturesRepo = require("./pictures");

class ArticlesRepositories extends Repository {
  async getTitles() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encode: "utf8",
      })
    );
  }

  // Тут мы получаем title и body в качестве attrs. В body есть \r\n. Заменить на </p> при нажатии на enter при сохранении? нажатии на enter?
  async create(attrs) {
    const gotAll = await this.getAll();
    attrs.id = this.randomId();
    let oldBody = attrs.body;
    oldBody = oldBody.replace(/<\/p>\r\n<p>/g, "</p><p>");

    const findAllPictureIds = async (text) => {
      const regEx = /\{\s*'picture id'\s*:\s*([a-f0-9]+)\s*\}/g;

      let matches;
      let newBody;

      while ((matches = regEx.exec(text)) !== null) {
        const id = matches[1];
        const picture = await picturesRepo.getOneBy({ id });

        const pictureTag = `
        <figure>
        <img src="data:image/png;base64, ${picture.imageBody}"/>
        </figure>
        `;

        newBody = text.replace(matches[0], pictureTag);
      }

      return newBody;
    };

    attrs.body = await findAllPictureIds(oldBody);

    console.log(attrs);

    gotAll.push(attrs);
    await this.writeAll(gotAll);
  }
}

module.exports = new ArticlesRepositories("articles.json");
