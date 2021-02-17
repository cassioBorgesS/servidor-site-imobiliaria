const multer = require('multer')
const {imoveis, imagens, mensagens} = require('./controlador')
const multerConfig = require('./config/multer')

const router = require('express').Router()

// crud imoveis
router.get('/imoveis', imoveis.lista)
router.get('/imoveis/:id',imoveis.buscaUm)
router.post('/imoveis',imoveis.adiciona)
router.patch('/imoveis/:id',imoveis.atualiza)
router.delete('/imoveis/:id',imoveis.deleta)

// crud imagens
router.get('/imagens/:id',imagens.busca)
router.get('/imagens',imagens.buscaPrincipais)
router.post('/imagens/:id',multer(multerConfig).single('file'),imagens.adiciona)

// crud mensagens
router.get('/mensagens/porimovel/:id', mensagens.buscaPorImovel)
router.get('/mensagens/porid/:id', mensagens.buscaPorId)
router.get('/mensagens', mensagens.busca)
router.post('/mensagens/:id',mensagens.adiciona)
router.delete('/mensagens/:id', mensagens.deleta)

//crud usuarios
router.post('/usuario/login')
router.post('/usuario/atualizaToken')
router.post('/usuario/logout')

module.exports= router