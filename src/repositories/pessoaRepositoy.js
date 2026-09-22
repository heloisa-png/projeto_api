const pool = require('../config/db');

const buscarByCPF = (cpf)=>{
    const sql = 'SELECT * FROM pessoas WHERE cpf = $1';
    const resultado = pool.query(sql, [cpf]);
    return resultado.rows[0]
};

module.export = {
    buscarByCPF
};