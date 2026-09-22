const ProdutoRepository = require('../repositories/produtoRepository');
//controler2

//listar produtos
const listarProdutos = async (req, res) => {

    try {
        const resultado = await ProdutoRepository.getALLprodutos();
        console.log(resultado);
        responde.json(resultado);
    } catch (erro) {
        console.erro(erro.menssage);
        response.status(500).json({ mensagem: 'Erro interno.' });
    };

};

// pegar produtos por id
const GetprodutosID = async (req, res) => {

    try {
        const id = req.params;
        const produto = await ProdutoRepository.getprodutosbyID(id);
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

//criar produto
const criarProduto = async (req, res) => {
    try {
        const { nome, preco, descricao } = req.body;

        if (!nome || preco === undefined) {
            return response.status(400).json({ mensagem: 'Nome e preço obrigatórios.' });
        }

        const novoProduto = await ProdutoRepository.createProduto(nome, preco, descricao);
        return res.status(201).json(novoProduto);
    } catch (erro) {
        console.error(erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao cadastrar produto.' });
    }
};

module.exports = {
    listarProdutos,
    GetprodutosID,
    criarProduto,


}