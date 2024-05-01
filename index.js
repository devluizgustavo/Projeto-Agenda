const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config(); //Requerir o dotenv para esconder a variável com a senha do db

//Requisição do módulo mongoose
const mongoose = require("mongoose");

//Conectar ao banco com a variável oculta
mongoose.connect(process.env.dbstring)
  .then(() => {
    console.log("Conectado ao banco de dados");
    app.emit("MongoDB"); //Emitir um evento ao app, que o mongo db será prioridade, e deverá ser executao primeiro
    })
  .catch(e => console.log(e));

const rotas = require("./routes");
const path = require("path");
const midGlobal = require("./src/middlewares/midGlobal");

app.use(express.urlencoded({ extended: true })); //Ativar os dados virem para o backend
app.use(express.static(path.resolve(__dirname, "public"))); //Pegar caminho arquivo estático
app.use(express.json()); //Transformar arquivos em JSON para exibi-los
app.use(midGlobal); //Pegar o middleware global
app.use(rotas); //Usar as rotas de routes.js

//Ativar o sinal com on, e depois que acontecer a execução do banco, ai sim é para executar o servidor
app.on("MongoDB", () => {
  app.listen(port, () => {
    console.log("Servidor rodando na porta 3000");
  });
});

app.set("views", path.resolve(__dirname, "src", "views")); //Setar aonde está a pasta view
app.set("view engine", "ejs"); //Setar a engine da view
