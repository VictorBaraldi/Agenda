const { async } = require('regenerator-runtime');
const Contato = require('../models/contatoModel')


exports.index = (req,res) => {
    res.render('contato', {
        contato: {}
    });
};

exports.register = async (req,res) => {
   try{
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length >0) {
        req.flash('errors', contato.errors);
        req.session.save(() => res.redirect('/contato'));
        return;
    }

    req.flash('success', 'Contato registrado com sucesso')
    req.session.save(function() {
        return res.redirect(`/contato/${contato.contato._id}`);
      });
    
    } catch(e) {console.log(e); res.render('404')}
};

exports.editI = async (req,res) => {
    if(!req.params.id) return res.render('404');
    const contatos = new Contato(req.body);
    const contato = await contatos.buscaId(req.params.id);
    if (!contatos) return res.render('404');

    res.render('contato', {
        contato: contato
    });
}

exports.edit = async (req,res) => {
    try {
    if(!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.errors.length >0) {
        req.flash('errors', contato.errors);
        req.session.save(() => res.redirect('/contato'));
        return;
    }

    req.flash('success', 'Contato editado com sucesso')
    req.session.save(function() {
        return res.redirect(`/contato/${contato.contato._id}`);
      });
    } catch(e) {console.log(e); res.render('404')}
}

exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const contatos = new Contato(req.body);
    const contato = await contatos.delete(req.params.id);
    if (!contato) return res.render('404');
    
    req.flash('success', 'Contato apagado com sucesso')
    req.session.save(function() {
        return res.redirect(`/`);
      });
}

