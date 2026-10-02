const ProdutoRepository = require('../repositories/produtoRepository');

//Pega do repositorio e captura os erros e mostra as mensagens

const listarProdutos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const offset = (page - 1) * limit;

        const produtos = await ProdutoRepository.getALLprodutos(limit, offset);
        
        res.json({
            paginaAtual: page,
            itensPorPagina: limit,
            quantidadeRetornada: produtos.length,
            dados: produtos
        });
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ mensagem: 'Erro interno' });
    }
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

//atualizar
const atualizarProduto = async (req, res) => {
    try {
        const id = parseInt(req.params.id); // Tenta converter o ID da URL para número
        
        if (isNaN(id)) {
            return res.status(400).json({ mensagem: 'O ID informado na URL é inválido.' });
        }

        const { nome, preco, descricao } = req.body;
        
        // 2ª Barreira: Impede a atualização incompleta
        if (!nome || !preco || !descricao) {
            return res.status(400).json({ 
                mensagem: 'Para atualizar, você deve enviar nome, preco e descricao obrigatoriamente.' 
            });
        }
        
        const resultado = await ProdutoRepository.updateProduto(id, nome, preco, descricao);
        
        // 3ª Barreira: Verifica se o produto realmente existia no banco
        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado no banco de dados.' });
        }
        
        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ mensagem: 'Erro ao atualizar' });
    }
};

//deletar 
const deletarProduto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ mensagem: 'ID informado é inválido.' });

        const resultado = await ProdutoRepository.deleteProduto(id);
        
        if (resultado.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado para exclusão' });
        }
        
        res.json({ 
            mensagem: 'Produto deletado com sucesso', 
            deletado: resultado.rows[0] 
        });
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ mensagem: 'Erro ao deletar' });
    }
};


module.exports = {
    listarProdutos,
    GetprodutosID,
    criarProduto,
    atualizarProduto,
    deletarProduto
}