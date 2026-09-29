const pool = require('../config/db');

//terminar pedidos 
const getAllPedidos = async (limit, offset) => {
    const sql = `
        SELECT 
            pedidos.id AS pedido_id,
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

module.exports={
    getAllPedidos
};