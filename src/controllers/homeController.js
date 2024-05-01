exports.form = (req, res, next) => {
  console.log("cliente respondido.");
  res.render("index"); //--> Renderizar a minha view
  //--> Caso a requisição terminasse aqui, usariamos a palavra return, mais vamos usar mais um middleware, com next(), portanto o next vai ter que ser inserido no argumento.
  // console.log(
  //   // `(pagina inicial) --> Os dados estão aqui também: ${req.session.nome}`
  // );
  return;
};

exports.trataDados = (req, res) => {
  res.send(req.body);
  return;
};
