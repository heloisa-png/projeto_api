const express = require('express');
const router= express.Router();

const pessoaController =  require('../controllers/pessoaController');

router.get('/:cpf', pessoaController.GetpessoasByCPF);
router.get('/', pessoaController.listarPessoas);
router.post('/', pessoaController.ADDpessoa); 


module.exports = router;