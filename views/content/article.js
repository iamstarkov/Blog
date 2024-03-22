module.exports = (article) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    </head>
    <body>
    <div>
    ${article.title}
    </div>
    <div>
    ${article.body}
    </div>
    </body>
    </html>
    `;
};
