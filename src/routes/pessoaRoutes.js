const express = require('express');
const router= express.Router();
const produtoController =  require('../controllers/produtoController');

router.get('/cpf/:cpf', pessoaController.buscaPessoaPorCpf);


module.exports = router