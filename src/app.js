//ele pega da pasta node_modulos
//importações
const express = require('express'):
const cors = require('cors');
const produtosRoutes = require('./routes/produtoRoutes')

//monitora as rotas 
const app = express();

app.use(express.json());
app.use(cors());
app.use('/produtos',produtosRoutes);

module.exports = app;