const PedidoRepository = require('../repositories/pedidoRepository');

const parseId = (value) => {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
};

const listarPedidos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        if (page < 1 || limit < 1) {
            return res.status(400).json({ mensagem: 'Página e limite devem ser maiores que zero.' });
        }
        const offset = (page - 1) * limit;

        const pedidos = await PedidoRepository.getAllPedidos(limit, offset);
        
        res.json({
            paginaAtual: page,
            itensPorPagina: limit,
            quantidadeRetornada: pedidos.length,
            dados: pedidos
        });
    } catch (erro) {
        console.error('Erro ao buscar pedidos:', erro.message);
        res.status(500).json({ mensagem: 'Erro interno ao buscar pedidos' });
    }
};

const buscarPedidoPorId = async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.status(400).json({ mensagem: 'O ID informado é inválido.' });
    }

    try {
        const pedido = await PedidoRepository.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
        }
        return res.json(pedido);
    } catch (erro) {
        console.error('Erro ao buscar pedido:', erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao buscar pedido.' });
    }
};

const validarDadosPedido = (dados) => {
    const pessoaId = parseId(dados.pessoa_id);
    const produtoId = parseId(dados.produto_id);
    const quantidade = Number(dados.quantidade);

    if (!pessoaId || !produtoId || !Number.isInteger(quantidade) || quantidade < 1) {
        return null;
    }

    let dataPedido = null;
    if (dados.data_pedido !== undefined) {
        if (typeof dados.data_pedido !== 'string' || Number.isNaN(Date.parse(dados.data_pedido))) {
            return null;
        }
        dataPedido = dados.data_pedido;
    }

    return { pessoaId, produtoId, quantidade, dataPedido };
};

const criarPedido = async (req, res) => {
    const dados = validarDadosPedido(req.body || {});
    if (!dados) {
        return res.status(400).json({
            mensagem: 'Informe pessoa_id, produto_id e uma quantidade inteira maior que zero. data_pedido, se enviado, deve ser uma data válida.'
        });
    }

    try {
        const novoPedido = await PedidoRepository.createPedido(
            dados.pessoaId,
            dados.produtoId,
            dados.quantidade,
            dados.dataPedido
        );
        return res.status(201).json(novoPedido);
    } catch (erro) {
        console.error('Erro ao criar pedido:', erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao criar pedido.' });
    }
};

const atualizarPedido = async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.status(400).json({ mensagem: 'O ID informado é inválido.' });
    }

    const dados = validarDadosPedido(req.body || {});
    if (!dados) {
        return res.status(400).json({
            mensagem: 'Informe pessoa_id, produto_id e uma quantidade inteira maior que zero. data_pedido, se enviado, deve ser uma data válida.'
        });
    }

    try {
        const pedido = await PedidoRepository.updatePedido(
            id,
            dados.pessoaId,
            dados.produtoId,
            dados.quantidade,
            dados.dataPedido
        );
        if (!pedido) {
            return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
        }
        return res.json(pedido);
    } catch (erro) {
        console.error('Erro ao atualizar pedido:', erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao atualizar pedido.' });
    }
};

const deletarPedido = async (req, res) => {
    const id = parseId(req.params.id);
    if (!id) {
        return res.status(400).json({ mensagem: 'O ID informado é inválido.' });
    }

    try {
        const pedido = await PedidoRepository.deletePedido(id);
        if (!pedido) {
            return res.status(404).json({ mensagem: 'Pedido não encontrado.' });
        }
        return res.json({ mensagem: 'Pedido deletado com sucesso.', deletado: pedido });
    } catch (erro) {
        console.error('Erro ao deletar pedido:', erro.message);
        return res.status(500).json({ mensagem: 'Erro interno ao deletar pedido.' });
    }
};

module.exports = {
    listarPedidos,
    buscarPedidoPorId,
    criarPedido,
    atualizarPedido,
    deletarPedido
};