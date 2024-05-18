const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const { type } = require("jquery");

const LoginSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = []; // Se tiver erros, alocar aqui dento...
    this.user = null;
  }

  async login() {
    this.valida();
    if (this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("Usuário não existe.");
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha inválida");
      this.user = null;
      return;
    }
  }

  async register() {
    this.validaRegistro();
    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt); //Cliptografar senha

    this.user = await LoginModel.create(this.body);
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push("Usuário já existe");
  }

  validaRegistro() {
    this.cleanUp();
    //Validação
    if (!this.body.nome) this.errors.push("Campo nome não pode ser nulo");

    //Email precisa ser válido
    if (!validator.isEmail(this.body.email))
      this.errors.push("E-mail inválido");

    //Senha precisa ter entre 3 e 50 caracteres
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres");
    }

    if (!validator.isAlpha(this.body.nome)) this.errors.push("Nome invalido.");
  }

  validaPerfil() {
    this.cleanUp();

    if (!validator.isAlpha(this.body.nome))
      this.errors.push("Nome inválido");

    if (!validator.isEmail(this.body.email))
      this.errors.push("E-mail invalido");
  }

  valida() {
    this.cleanUp();
    //Validação
    //Email precisa ser válido
    if (!validator.isEmail(this.body.email))
      this.errors.push("E-mail inválido");

    //Senha precisa ter entre 3 e 50 caracteres
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres");
    }
  }

  async editar(id) {
    if (typeof id !== "string") return;
    this.validaPerfil();
    if (this.errors.length > 0) return;
    this.user = await LoginModel.findByIdAndUpdate(id, this.body, {
      new: true,
    }); //--> Encontrar pelo id e atualizar os dados
  }

  //Responsável por garantir que tudo que foi enviado ao body seja string
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    //Garantir que tenhamos apenas os campos que precisamos(email-senha);
    this.body = {
      nome: this.body.nome,
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login;
