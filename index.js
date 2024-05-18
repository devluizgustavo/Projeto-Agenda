require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
mongoose
  .connect(process.env.dbstring)
  .then(() => {
    app.emit("MongoDB");
  })
  .catch((e) => console.log(e));

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flashMsg = require("connect-flash");
const rotas = require("./routes");
const path = require("path");
const helmet = require("helmet");
const csrf = require("csurf");
const midGlobal = require("./src/middlewares/midGlobal");

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://cdn.jsdelivr.net"
  );
  next();
});

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const sessionConfig = session({
  secret: "123sadf24gvcddf()",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
  store: MongoStore.create({ mongoUrl: process.env.dbstring }),
});

app.use(sessionConfig);
app.use(flashMsg());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf());
app.use(midGlobal.midGlobal);
app.use(midGlobal.checkCsrfError);
app.use(midGlobal.csrfMiddleware);
app.use(rotas);

app.on("MongoDB", () => {
  app.listen(port, () => {
    console.log("Servidor rodando na porta 3000");
  });
});
