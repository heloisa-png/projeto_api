const pool = require('../config/db');

const getAllPedidos = async (limit, offset) => {
    const sql = `
        SELECT 
            pedidos.id AS pedido_id,
            pedidos.pessoa_id,
            pedidos.produto_id,
            pessoas.nome AS cliente,
            produtos.nome AS produto,
            pedidos.quantidade,
            pedidos.data_pedido
        FROM pedidos
        INNER JOIN pessoas ON pedidos.pessoa_id = pessoas.id
        INNER JOIN produtos ON pedidos.produto_id = produtos.id
        ORDER BY pedidos.data_pedido DESC
        LIMIT $1 OFFSET $2;
    `;
    const resultado = await pool.query(sql, [limit, offset]);
    return resultado.rows;
};

const getPedidoById = async (id) => {
    const sql = `
        SELECT
            pedidos.id AS pedido_id,
            pedidos.pessoa_id,
            pedidos.produto_id,
            pessoas.nome AS cliente,
            produtos.nome AS produto,
            pedidos.quantidade,
            pedidos.data_pedido
        FROM pedidos
        INNER JOIN pessoas ON pedidos.pessoa_id = pessoas.id
        INNER JOIN produtos ON pedidos.produto_id = produtos.id
        WHERE pedidos.id = $1;
    `;
    const resultado = await pool.query(sql, [id]);
    return resultado.rows[0];
};

const createPedido = async (pessoaId, produtoId, quantidade, dataPedido) => {
    const sql = `
        INSERT INTO pedidos (pessoa_id, produto_id, quantidade, data_pedido)
        VALUES ($1, $2, $3, COALESCE($4, CURRENT_TIMESTAMP))
        RETURNING id;
    `;
    const resultado = await pool.query(sql, [pessoaId, produtoId, quantidade, dataPedido || null]);
    return getPedidoById(resultado.rows[0].id);
};

const updatePedido = async (id, pessoaId, produtoId, quantidade, dataPedido) => {
    const sql = `
        UPDATE pedidos
        SET pessoa_id = $2,
            produto_id = $3,
            quantidade = $4,
            data_pedido = COALESCE($5, data_pedido)
        WHERE id = $1
        RETURNING id;
    `;
    const resultado = await pool.query(sql, [id, pessoaId, produtoId, quantidade, dataPedido || null]);
    if (resultado.rowCount === 0) {
        return null;
    }
    return getPedidoById(resultado.rows[0].id);
};

const deletePedido = async (id) => {
    const sql = 'DELETE FROM pedidos WHERE id = $1 RETURNING id;';
    const resultado = await pool.query(sql, [id]);
    return resultado.rows[0];
};

module.exports = {
    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido
};