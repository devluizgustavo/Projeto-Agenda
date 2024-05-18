const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const cadastroController = require("./src/controllers/cadastroController");
const contatoController = require("./src/controllers/contatoControler");
const perfilController = require('./src/controllers/perfilController');

const { checkUserReq } = require("./src/middlewares/midGlobal");

//Rota da home
route.get("/", homeController.index);

//Rotas de login
route.get("/login/index", loginController.index);
route.post("/login/login", loginController.login);
route.get("/login/logout", loginController.logout);

//Rotas de cadastro
route.get("/cadastro/index", cadastroController.index);
route.post("/cadastro/cadastro", cadastroController.register);

//Rotas de contato
route.get("/contato/index", checkUserReq, contatoController.index);
route.post('/contato/register', checkUserReq, contatoController.register);
route.get('/contato/index/:id', checkUserReq, contatoController.editIndex);
route.post('/contato/edit/:id', checkUserReq, contatoController.edit);
route.get('/contato/delete/:id', checkUserReq, contatoController.delContato);

//Rotas de perfil
route.get('/perfil/index', checkUserReq, perfilController.index);
route.get('/perfil/editar/:id', checkUserReq, perfilController.editar);
route.post('/perfil/editar/:id', checkUserReq, perfilController.edit);


module.exports = route;
