//ele pega da pasta node_modulos
const express = require('express'):
const cors = require('cors');

//monitora as rotas 
const app = express();

app.use(express.json());
app.use(cors());