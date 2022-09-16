const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const {loginRequired} = require('./src/middleware/middleware')



//rotas da home           
route.get('/agenda/', homeController.index);

//rotas de login
route.get('/agenda/login', loginController.index);
route.post('/agenda/login/register', loginController.register);
route.post('/agenda/login/login', loginController.login);
route.get('/agenda/logout', loginController.logout);

//rotas de contato
route.get('/agenda/contato', loginRequired, contatoController.index);
route.post('/agenda/contato/register', loginRequired, contatoController.register);
route.get('/agenda/contato/:id', loginRequired, contatoController.editI);
route.post('/agenda/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/agenda/contato/delete/:id', loginRequired, contatoController.delete)
module.exports = route;