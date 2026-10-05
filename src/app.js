//ele pega da pasta node_modulos
//importações
const express = require('express');
const cors = require('cors');

const produtosRoutes = require('./routes/produtoRoutes')
const pessoasRoutes = require('./routes/pessoaRoutes');
const pedidosRoutes = require('./routes/pedidoRoutes');


//rotas 
const app = express();

app.use(express.json());
app.use(cors());

app.use('/produtos',produtosRoutes);
app.use('/pessoas',pessoasRoutes);
app.use('/pedidos', pedidosRoutes);


module.exports = app;
