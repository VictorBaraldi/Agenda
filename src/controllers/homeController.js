const Contato = require('../models/contatoModel')

exports.index = async(req, res) => {
    const contato = new Contato(req.body)
    const contatos = await contato.buscaContato();
    res.render('index', {contatos} )
  };

