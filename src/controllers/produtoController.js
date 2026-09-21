const ProdutoRepository = require('../repositories/produtoRepository');

//tratar o erro
const listarProdutos = (req, res) => {
    try {
        const resultado = await ProdutoRepository.getALLprodutos();
        console.log(resultado)
        responde.json(resultado)
    } catch (erro) {
        console.erro(erro.menssage);
        response.status(500).json(mensagem: 'Erro interno.')
    }
};

//controler2
//det de todos os produtos, produtos por id 

// pegar produtos por id
const GetprodutosPorID = (req, res) => {
    try {

        const resultado = await ProdutoRepository.getAllprodutosbyID();
        console.log(resultado);
        
        //aqui vai pegar o erro
    } catch (erro){
        console.erro(erro.mensage)
    }

}

modules.exports = listarProdutos