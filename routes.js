const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const {loginRequired} = require('./src/middleware/middleware')



//rotas da home           
route.get('https://victorbaraldi.tech/', homeController.index);

//rotas de login
route.get('https://victorbaraldi.tech/login', loginController.index);
route.post('https://victorbaraldi.tech/login/register', loginController.register);
route.post('https://victorbaraldi.tech/login/login', loginController.login);
route.get('https://victorbaraldi.tech/logout', loginController.logout);

//rotas de contato
route.get('https://victorbaraldi.tech/contato', loginRequired, contatoController.index);
route.post('https://victorbaraldi.tech/contato/register', loginRequired, contatoController.register);
route.get('https://victorbaraldi.tech/contato/:id', loginRequired, contatoController.editI);
route.post('https://victorbaraldi.tech/contato/edit/:id', loginRequired, contatoController.edit);
route.get('https://victorbaraldi.tech/contato/delete/:id', loginRequired, contatoController.delete)
module.exports = route;