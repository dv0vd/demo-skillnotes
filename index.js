const { getBasePath } = require('./utils');

require('dotenv').config()

function appInit() {
  const express = require("express");
  const app = express();
  const http = require('http')
  const webRouter = require("./routes/web")
  const apiRouter = require("./routes/api")

  app.set("view engine", "njk");

  app.use(express.json());
  app.use(express.static("public"));
  app.use(getBasePath(), webRouter)
  app.use(getBasePath(), apiRouter)

  app.use((req, res) => {
    res.status(404).render('404.njk');
  });

  const port = process.env.PORT || 3000;
  const server = http.createServer(app)

  server.listen(port, () => {
    console.log(`  Listening on http://localhost:${port}`);
  });

  return [app, server];
}

function main() {
  const [app, server ]= appInit();
  viewsEngineInit(app);
}

function viewsEngineInit(app) {
  const nunjucks = require("nunjucks");
  nunjucks.configure("views", {
    autoescape: true,
    express: app,
  });
}

main();
