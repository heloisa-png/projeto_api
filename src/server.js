//ligando o servidor 
//puxando a port do env

require('dotenv').config();

//importando o app

const app = require('./app');   
const PORT = process.env.PORT;

//puxando a port acima 
app.listen(PORT, ()=>{
    console.log(`servidor rodando na porta ${PORT}`)
});

