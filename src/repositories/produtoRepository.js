//importação com o banco
const pool = require('../config/db');

//pegar *produtos
const getALLprodutos = async (limit, offset)=>{
    const sql = 'SELECT * FROM produtos ORDER BY id LIMIT $1 OFFSET $2';
    const resultado = await pool.query(sql, [limit, offset]);
    return resultado.rows; 
};

//pegar por id 
const getprodutosbyID = async (id)=>{
    const sql = 'SELECT * FROM produtos WHERE id = $1';
    const resultado = pool.query(sql, [id]);
    return resultado.rows[0]
};

//criar
const createProduto = async (Nome, preco, descricao) =>{
    const sql = 'SELECT * FROM produtos (nome, preco, descricao) VALUES (1$, 2$, 3$) RETURNING *';
    const resultado = pool.query(sql, [Nome, preco, descricao]);
    return resultado.rows[0];
};

//atualizar  
const upidateProduto = async (id, nome, preco, descricao) =>{
    const sql = 'UPDATE produtos SET $1, preco, $2, descricao = $3, where  id $4 =RETURNINNG * '
    const  resultado = await pool.query(sql, [nome, preco, id, descricao])
    return resultado
};

//deletar
const deleteProduto = async (id)=>{
    const sql = 'DELETE FOM  produtos $1= id RETURNING*'
    const resultado = await pool.query(sql, [id])
    return resultado
}


module.exports = {
    getALLprodutos,
    getprodutosbyID,
    createProduto,
    upidateProduto,
    deleteProduto
};

