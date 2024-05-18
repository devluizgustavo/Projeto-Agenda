import "core-js/stable";
import "regenerator-runtime/runtime";

import Login from "./modules/validaLogin";
import Cadastro from "./modules/validaCadastro";
import Contato from "./modules/validaContato";
import Perfil from "./modules/validaPerfil";

const login = new Login(".form-login");
const cadastro = new Cadastro(".form-cadastro");
const contato = new Contato(".form-contato");
const perfil = new Perfil(".form-perfil");

login.init();
cadastro.init();
contato.init();
perfil.init();

// import "./assets/css/style.css";

// console.log('Ola')
