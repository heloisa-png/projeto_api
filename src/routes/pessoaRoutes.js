const express = require('express');
const router= express.Router();

const pessoaController =  require('../controllers/produtoController');

router.get('/cpf/:cpf', pessoaController.buscaPessoaPorCpf);


module.exports = router;