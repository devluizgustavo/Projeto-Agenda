const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  telefone: { type: String, required: false, default: "" },
  date_c: { type: Date, default: Date.now }, //Salvar data
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  async edit(id) {
    if (typeof id !== "string") return;
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
      new: true,
    }); //--> Encontrar pelo id e atualizar os dados
  }

  async register() {
    this.valida();
    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body); //Salvar contato em contato
  }

  valida() {
    this.cleanUp();
    //Validação
    if (!validator.isAlpha(this.body.nome)) this.errors.push("Digite apenas letras no campo nome.")
    //Se caso tiver um valor no email, valide, se não, não continue o if...
    if (this.body.email && !validator.isEmail(this.body.email))
      this.errors.push("E-mail inválido");
    if (!this.body.nome) this.errors.push("Nome é um campo obrigatório.");
    if (!this.body.email && !this.body.telefone)
      this.errors.push(
        "É necessário que tenha ao menos um contato: e-mail ou telefone."
      );
  }

  //Responsável por garantir que tudo que foi enviado ao body seja string
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      nome: this.body.nome,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone,
    };
  }

  //Métodos estáticos --> Não acessam o prototype da classe e não precisam ser instanciados

  static async buscaPorId(id) {
    if (typeof id !== "string") return;
    const contato = await ContatoModel.findById(id);
    return contato;
  }

  static async buscaContatos() {
    const all_contatos = await ContatoModel.find().sort({ createBy: -1 }); //Pegar os contatos em ordem decrescente
    return all_contatos;
  }

  static async delete(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findOneAndDelete({_id: id});
    return contato;
  }
}

module.exports = Contato;
