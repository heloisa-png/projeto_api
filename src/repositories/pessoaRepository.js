const pool = require('../config/db');

const buscarByCPF = async (cpf)=>{
    const sql = 'SELECT * FROM pessoas WHERE cpf = $1';
    const resultado = await pool.query(sql, [cpf]);
    return resultado.rows[0]
};

const getALLpessoas = async ()=>{
    const sql = 'SELECT * FROM pessoas';
    const resultado = await pool.query(sql);
    return resultado.rows; 
};


module.exports = {
    buscarByCPF
};