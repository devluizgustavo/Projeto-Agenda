import validator from "validator";

export default class Contato {
  constructor(formContato) {
    this.form = document.querySelector(formContato);
  }

  init() {
    this.events();
  }

  events() {
    const tel_inp = document.querySelector('input[name="telefone"]');
    if (!this.form) return;

    tel_inp.addEventListener("input", () => {
      let limpaValue = tel_inp.value.replace(/\D/g, "").substring(0, 11);
      const numArray = limpaValue.split("");
      let numFormatado = "";

      if (numArray.length > 0)
        numFormatado += `(${numArray.slice(0, 2).join("")})`;
      if (numArray.length > 2)
        numFormatado += ` ${numArray.slice(2, 7).join("")}`;
      if (numArray.length > 6)
        numFormatado += `-${numArray.slice(7, 11).join("")}`;

      tel_inp.value = numFormatado;
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const nome_inp = el.querySelector('input[name="nome"]');
    const email_inp = el.querySelector('input[name="email"]');
    const tel_inp = el.querySelector('input[name="telefone"]');
    let err = false;

    for (let err of this.form.querySelectorAll(".alert")) {
      err.remove();
    }

    if (!nome_inp.value) {
      this.showError("Campo nome é obrigatorio.", nome_inp);
      err = true;
    }

    if (!email_inp.value && !tel_inp.value) {
      this.showError("Digite ao menos um tipo de contato.", email_inp);
      this.showError("Digite ao menos um tipo de contato.", tel_inp);
      err = true;
    }

    if (tel_inp.value.length !== 15) {
      this.showError("Numero invalido.", tel_inp);
      err = true;
    }
    
    if ((!email_inp.value && tel_inp.value)) {
      err = false;
     } else {
       if (!validator.isEmail(email_inp.value)) {
         this.showError("Email invalido.", email_inp);
         err = true;
      }
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
