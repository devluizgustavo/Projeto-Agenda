const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController"); //Indicar o controller
const contats = require("./src/controllers/contatoController"); //Indicar outro controller

//               Middleware
route.get('/', homeController.form); //--> Pegar a função form do módulo do controller

//Como podemos ver, ele faz uma corrente, tinha dados de um cliente no primeiro middleware, que foi passado como referência para todas as requisições de TODOS os middlewares, e eu loguei eles em todos...Por que é uma corrente.

route.post("/", homeController.trataDados); //--> Pegar a função trataDados do controller
route.get("/contato/:idContato?/:numero?", contats.mostraInfo); //--> Pegar a função mostraInfo

module.exports = route; //--> Exportar as rotas para usar no index
