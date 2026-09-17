//ligando o servidor 

//puxando a port do env
require('dotenv').config();
const PORT = process.env.PORT;

//importando o app
const app = require('./app');   

//puxando a port acima 
app.listen(PORT, ()=>{
    console.log(`servidor rodando na porta ${PORT}`)
});

//package.jason/cript foi adicionado o start p começar o servidor. pode adicionar o --watch depois do node, vai funcionar como o nodemon 