const pool = require('../config/db');

const getALLprodutos = ()=>{
    const sql = 'SELECT * FROM produtos';
    const resultado = await pool.query(sql);
    return resultado.rows; 
};

//exportar a cnstante acima 
module.exports = getALLprodutos