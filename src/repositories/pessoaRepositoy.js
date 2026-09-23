const pool = require('../config/db');

const buscarByCPF = async (cpf)=>{
    const sql = 'SELECT * FROM pessoas WHERE cpf = $1';
    const resultado = await pool.query(sql, [cpf]);
    return resultado.rows[0]
};

module.exports = {
    buscarByCPF
};