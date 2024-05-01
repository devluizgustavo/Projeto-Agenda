exports.mostraInfo = (req, res) => {
    console.log(req.params);
    res.send(`Seu ID é: ${req.params.idContato}\nTelefone: ${req.params.numero}`);
}