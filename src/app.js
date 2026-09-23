//ele pega da pasta node_modulos
//importações
const express = require('express');
const cors = require('cors');

const produtosRoutes = require('./routes/produtoRoutes')
const pessoasRoutes = require('./routes/pessoaRoutes');


//monitora as rotas 
const app = express();

app.use(express.json());
app.use(cors());

app.use('/produtos',produtosRoutes);
app.use('/pessoas',pessoasRoutes);


module.exports = app;
