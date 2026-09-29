const pool = require('../config/db');

const buscarByCPF = async (cpf)=>{
    const sql = 'SELECT * FROM pessoas WHERE cpf = $1';
    const resultado = await pool.query(sql, [cpf]);
    return resultado.rows[0]
};

const adicionarPessoa = async ()=>{
    const sql = `INSER TINTO pessoas (nome, email, telefone, cpf, senha)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING  * ` ;

    const resultado = await pool.query(sql [
        dados.nome, 
        dados.email,
        dados.telefone,
        dados.cpf,
        dados.senha
    ]);
    return resultado.rows[0]; 
};

const getALLpessoas = async (limit, offset) => {

    const sql = 'SELECT * FROM pessoas';

    const resultado = await pool.query(sql, [limit, offset]);

    return resultado.rows;
};

module.exports = {
    buscarByCPF,
    getALLpessoas,
    adicionarPessoa
};