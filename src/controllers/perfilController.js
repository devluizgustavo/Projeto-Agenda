const Login = require('../models/loginModel');

exports.index = (req, res) => {
    res.render("perfil")
}

exports.editar= (req, res) => {
  res.render("perfil-editar")
}



exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render("404");
    const login = new Login(req.body);
    await login.editar(req.params.id);

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => res.redirect(`/perfil/index`));
      return;
    }

    req.flash("success", "Dados editados com sucesso.");
    req.session.save(() =>
      res.redirect(`/perfil/index`)
    );
    return;

  } catch(e) {
    res.render('404');
    console.log(e);
  }
}