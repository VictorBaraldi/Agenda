require('dotenv').config();// variaveis de ambiente do .env -> como senhas e usuario
const express = require('express');
const app = express();

// importando e BD
const mongoose = require('mongoose');//Base de dado
mongoose.connect(process.env.connectServer).then(() =>// conectando na base  
{app.emit('pronto');// quando conectar no BD emite o sinal pronto
console.log('Conectado a base de dados');
}).catch(e => console.log(e));

//importando sessions
const session =  require('express-session');//identificar o nav do cliente, para salvar cookies
const connectMongo = require('connect-mongo');// salva sessões na base
const flash = require('connect-flash');// mensagens autodestrutivas, le e some

// importando o arquivo rotas e path para caminho
const route = require('./routes');
const path = require('path');
const helmet = require('helmet');//segurança
const csfr = require('csurf');//segurança para formulario
app.use(helmet());


//importando o arq middleware 
const { middleWareGlobal, checkCsrfError, csfrMiddleware } = require('./src/middleware/middleware');

//atributos do express
app.use(express.urlencoded({extended:true}));//pode postar formularios p/ dentro da aplicação
app.use(express.json())// mesmo que o de cima, ams json
app.use(express.static(path.resolve(__dirname, 'public')));//usa os metodos estaticos desse arquivo

//criando um cookie pra salvar sessão
const sessionOptions = session({
    secret: 'shauhsauihsaiud', //segredo
    store: connectMongo.create({ mongoUrl: process.env.connectServer}),// armazenar no servidos
    resave: false, //parametro recomendado
    saveUninitialized: false,// parametro recomendado
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, //7 dias em segundos
        httpOnly: true
    }
})
app.use(sessionOptions);
app.use(flash());

//config front - de redenrização na tela
app.set('views', path.resolve(__dirname, 'src', 'views'));// endereço do arquivo views
app.set('view engine', 'ejs');// engine do view

//nossos middlewares
app.use(csfr());
app.use(middleWareGlobal); //middleware global
app.use(checkCsrfError);
app.use(csfrMiddleware);
app.use(route); // usa o intermediador route

app.on('pronto', () => { //a conecção so ocorre quando receber o sinal pronto
    app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta')});
});

