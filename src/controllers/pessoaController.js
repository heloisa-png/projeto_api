const PessoaRepository = require('../repositories/pessoaRepository');

//busca por cpf
const GetpessoasByCPF = async (req, res) => {
    try {
        const cpf = req.params.cpf;
        const pessoa = await PessoaRepository.buscarByCPF(cpf);
        console.log(pessoa);

        if (!pessoa) {
            return res.status(404).json({ mensagem: 'pessoa não encontrada.' });
        };

        return res.json(pessoa);

        //aqui vai pegar o erro
    } catch (erro) {
        console.erro(erro.mensage)
        
        return res.status(500).json({
            mensagem: 'Erro interno.'
        })

    };
};

module.exports = {
    GetpessoasByCPF
};

//atualizar