import validator from "validator";

export default class Cadastro {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const email_inp = el.querySelector('input[name="email"]');
    const nome_inp = el.querySelector('input[name="nome"]');
    const pass_inp = el.querySelector('input[name="password"]');
    let err = false;

    for (let err of this.form.querySelectorAll(".alert")) {
      err.remove();
    }

    if (!validator.isAlpha(nome_inp.value)) this.showError("Digite apenas letras neste campo.", nome_inp);

    if (!nome_inp.value) this.showError("Você precisa informar o seu nome.", nome_inp);

    if (!validator.isEmail(email_inp.value)) {
      this.showError("Email incorreto.", email_inp);
      err = true;
    }

    if (pass_inp.value.length < 3 || pass_inp.value.length > 50) {
      this.showError("Senha precisa ter entre 3 e 50 caracteres.", pass_inp);
      err = true;
    }

    if (!err) el.submit();
  }

  showError(msg, inp) {
    const div = document.createElement("div");
    div.classList.add("alert", "alert-danger", "mt-2", "p-2");
    div.innerHTML = msg;
    inp.insertAdjacentElement("afterend", div);
  }
}
