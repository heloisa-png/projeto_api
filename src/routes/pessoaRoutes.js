const express = require('express');
const router= express.Router();

const pessoaController =  require('../controllers/pessoaController');

router.get('/cpf/:cpf', pessoaController.GetpessoasByCPF);

module.exports = router;