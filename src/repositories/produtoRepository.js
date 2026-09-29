//importação com o banco
const pool = require('../config/db');


//Filtra oq quero pegar do banco

//adicionado limit offset
const getALLprodutos = async (limit, offset)=>{
    const sql = 'SELECT * FROM produtos ORDER BY id LIMIT $1 OFFSET $2';
    const resultado = await pool.query(sql, [limit, offset]);
    return resultado.rows; 
};

const getprodutosbyID = async (id)=>{
    const sql = 'SELECT * FROM produtos WHERE id = $1';
    const resultado = pool.query(sql, [id]);
    return resultado.rows[0]
};

const createProduto = async (Nome, preco, descricao) =>{
    const sql = 'SELECT * FROM produtos (nome, preco, descricao) VALUES (1$, 2$, 3$) RETURNING *';
    const resultado = pool.query(sql, [Nome, preco, descricao]);
    return resultado.rows[0];
};


module.exports = {
    getALLprodutos,
    getprodutosbyID,
    createProduto,
    
};

