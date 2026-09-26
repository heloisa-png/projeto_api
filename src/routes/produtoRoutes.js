const express = require('express');
const router= express.Router();
const produtoController =  require('../controllers/produtoController');

router.get('/', produtoController.listarProdutos);
router.get('/:id', produtoController.GetprodutosID);
router.post('/', produtoController.criarProduto); 

module.exports = router;
//depois da barra eu coloco o nome q a essoa vai usar p pesquisar depois? provavel q sim


//Pega as funções do controller e repositorio e adiciona eles em uma rota p pesquinar na url do navegador