const path = require('path'); //importanto path 

module.exports = { //exporta o que está dentro
    mode: 'development', //não deixa mudar o arquivo
    entry: './frontend/index.js', // indica o arquivo de entrada
    output: { //onde sai o bundle
        path : path.resolve(__dirname, 'public', 'assets', 'js'), //aqui indica o caminho da saida
        filename: 'bundle.js'
    } ,
    module: {
        rules: [{
            exclude: /node_modules/, //pra não ler a pasta node que é grtande e ficar lento
            test: /\.js$/, //teste com final .js
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }, {
            test: /\.css$/, 
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map' // mapeia erros no arquivo original
}