const Login = require('../models/loginModel');

exports.index = (req, res) => {
    return res.render('cadastro');
}

exports.register = async (req, res) => {
    try {
      const login = new Login(req.body);
      await login.register();
  
      if (login.errors.length > 0) {
        req.flash("errors", login.errors);
        req.session.save(function () {
          return res.redirect("/cadastro/index");
        });
        return;
      }
  
      req.flash("success", 'Seu usuário foi criado com sucesso.');
      req.session.save(function () {
        return res.redirect("/cadastro/index");
      });
    } catch (e) {
      console.log(e);
      return res.render('404');
    }
  };

