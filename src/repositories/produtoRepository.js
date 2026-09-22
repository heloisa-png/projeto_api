//importação com o banco
const pool = require('../config/db');

const getALLprodutos = ()=>{
    const sql = 'SELECT * FROM produtos';
    const resultado = await pool.query(sql);
    return resultado.rows; 
};

//01
const getprodutosbyID = async (id)=>{
    const sql = 'SELECT * FROM produtos WHERE id = $1';
    
};

//exportando tudo acima por aqui 
module.exports = {getALLprodutos, getprodutoByID};

