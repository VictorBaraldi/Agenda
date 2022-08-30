const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    telefone: {type: String, required: false, default: ''},
    criado: {type: Date, default: Date.now},
});

const ContatoModel = mongoose.model('Home', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    edit = async function (id) {
        if(typeof id !== 'string') return;
        this.valida();
        if (this.errors.length > 0) return;
        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new:true}) // o new retorna os dados novos
    }

    buscaId = async function(id) {
        if(typeof id !== 'string') return;
        const user = await ContatoModel.findById(id);
        return user;
    }

    buscaContato= async function() {
        const contatos = await ContatoModel.find().sort({criadoEm: -1}); //ordem decrescente
        return contatos;
    }

    delete = async function(id) {
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findOneAndDelete( {id:id} );
        return contato;
    }

    async register() {
        this.valida();

        if (this.errors.length > 0)
            return;
        this.contato = await ContatoModel.create(this.body);
    }
    valida() {
        this.cleanUp();

        // Validação
        // O e-mail precisa ser válido
        if (this.body.email && !validator.isEmail(this.body.email))
            this.errors.push('E-mail inválido.');
        if (!this.body.nome)
            this.errors.push('Nome é obrigatório.');
        if (!this.body.email && !this.body.telefone)
            this.errors.push('Pelo menos uma forma de contato deve ser enviado: e-mail ou telefone');

    }
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
        };
    }
}

module.exports = Contato;

