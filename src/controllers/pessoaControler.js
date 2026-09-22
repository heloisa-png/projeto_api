const PessoaRepository = require('../repositories/produtoRepository');

//busca por cpf
const GetpessoasByCPF = async (req, res) => {
    try {
        const cpf = req.params;
        const produto = await PessoaRepository.buscarByCPF(cpf);
        console.log(resultado);

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        };

        //aqui vai pegar o erro
    } catch (erro) {
        console.erro(erro.mensage)
        response.status(500).json({ mensagem: 'Erro interno.' })

    };
};

module.export = {
    GetpessoasByCPF
};