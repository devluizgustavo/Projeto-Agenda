import validator from "validator";

export default class Perfil {
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
    const nome_inp = el.querySelector('input[name="nome"]');
    const email_inp = el.querySelector('input[name="email"]');
    let err = false;

    for (let err of this.form.querySelectorAll(".alert")) {
      err.remove();
    }
    
    if (!validator.isAlpha(nome_inp.value)) {
      this.showError("Nome não pode conter números.", nome_inp);
      err = true;
    }

    if (!nome_inp.value) {
      this.showError("Campo nome não pode ser nulo.", nome_inp);
      err = true;
    }

    if (!validator.isEmail(email_inp.value)) {
      this.showError("Email inválido.", email_inp);
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
