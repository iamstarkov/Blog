module.exports = (picture) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    </head>
    <body>
    <div>
            <figure>
              <img src="data:image/png;base64, ${picture.body}"/>
            </figure>
    </div>
    <div>
    ${picture.name}
    </div>
    </body>
    </html>
    `;
};
