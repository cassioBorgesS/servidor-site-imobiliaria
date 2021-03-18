require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./rotas')

const corsConfig = JSON.stringify({
    "origin": process.env.CLIENTE_URL,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
})

const tabelas = require('./database/Tabelas')
tabelas.criaTabelas()
require('./redis/blocklist')
require('./redis/allowlist')

const {estrategiasAutenticacao} = require('./autenticacao')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors(corsConfig))
app.use(router)

app.listen(3000, () => console.log("servidor rodando na porta 3000"))
