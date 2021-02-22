require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const router = require('./rotas')

const tabelas = require('./database/Tabelas')
tabelas.criaTabelas()
require('./redis/blocklist')

const {estrategiasAutenticacao} = require('./autenticacao')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)

app.listen(3000, () => console.log("servidor rodando na porta 3000"))
