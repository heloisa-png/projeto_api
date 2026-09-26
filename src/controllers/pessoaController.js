const PessoaRepository = require('../repositories/pessoaRepository');

//Funções q vão capturar o erro caso tenha 

//busca por cpf
const GetpessoasByCPF = async (req, res) => {
    try {
        const cpf = req.params.cpf;
        const pessoa = await PessoaRepository.buscarByCPF(cpf);
        console.log(pessoa);

        if (!pessoa) {
            return res.status(404).json({ mensagem: 'pessoa não encontrada.' });
        }

        return res.json(pessoa);

    } catch (erro) {
        console.erro(erro.mensage)
        
        return res.status(500).json({
            mensagem: 'Erro interno.'
        })

    };
};

const listarPessoas = async (req, res) => {

    try {
        const resultado = await PessoaRepository.getALLpessoas();
        console.log(resultado);
        res.json(resultado);
    } catch (erro) {
        console.error(erro.menssage);
        response.status(500).json({ mensagem: 'Erro interno.' });
    };

};

//Falta perminar 
const ADDpessoa = async (req, res) => {
    try {
        const { nome, preco, descricao } = req.body;

        if (!nome || preco === undefined) {
            return response.status(400).json({ mensagem: 'Nome e preço obrigatórios.' });
        }

        const novoProduto = await ProdutoRepository.getALLpessoas(nome, preco, descricao);
        return res.status(201).json(novoProduto);
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao cadastrar produto.' });
    }
};


module.exports = {
    GetpessoasByCPF,
    listarPessoas,
    ADDpessoa
};
