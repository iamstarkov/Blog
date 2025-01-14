module.exports = ({ article }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    </head>
    <body>
    <div>

    <button onclick="tagSelectedText('<h1>', '</h1>')">Header H1</button>
    <button onclick="tagSelectedText('<h2>', '</h2>')">Header H2</button>
    <button onclick="tagSelectedText('<h3>', '</h3>')">Header H3</button>
    <button onclick="tagSelectedText('<b>', '</b>')">Bold text</button>
    <button onclick="tagSelectedText('<i>', '</i>')">Italic</button>
    <button onclick="tagSelectedText('<a href=LINK>', '</a>')">Hyperlink</button>
    <button onclick="tagSelectedText('<strike>', '</strike>')">Bold text TEST</button>

        <form method="POST">
            <label for="title">title</label>
            <input value="${article.title}"name="title"><br><br>
            <label for="body">body</label>
            <textarea id="bodyInput" style="height:400px;width:600px;font-size:14pt;"
                name="body">${article.body}</textarea><br><br>
            <button>Save</button>
        </form>
    </div>
    <script src="../../../admin/article-formatting.js"></script>
    </body>
    </html>
    `
};