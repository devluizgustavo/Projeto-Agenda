module.exports = (req, res, next) => {
  //--> Função Middleware GLOBAL

  //Agora vamos fazer um if para o formulário
  if (req.body.nome) {
    console.log(`Vi que você postou: ${req.body.nome}`);
  }

  next();
};
