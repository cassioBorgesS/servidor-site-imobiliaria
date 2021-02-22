const multer = require('multer')
const {imoveis, imagens, mensagens} = require('./controlador')
const {usuario, middlewaresAutenticacao} = require('./autenticacao')
const multerConfig = require('./config/multer')
const router = require('express').Router()

// crud imoveis
router.get('/imoveis',middlewaresAutenticacao.bearer, imoveis.lista)
router.get('/imoveis/:id',imoveis.buscaUm)
router.post('/imoveis',middlewaresAutenticacao.bearer,imoveis.adiciona)
router.patch('/imoveis/:id',middlewaresAutenticacao.bearer,imoveis.atualiza)
router.delete('/imoveis/:id',middlewaresAutenticacao.bearer,imoveis.deleta)

// cr imagens
router.get('/imagens/:id',imagens.busca)
router.get('/imagens',imagens.buscaPrincipais)
router.post('/imagens/:id',[middlewaresAutenticacao.bearer,multer(multerConfig).single('file')],imagens.adiciona)

// crd mensagens
router.get('/mensagens/porimovel/:id',middlewaresAutenticacao.bearer, mensagens.buscaPorImovel)
router.get('/mensagens/porid/:id',middlewaresAutenticacao.bearer, mensagens.buscaPorId)
router.get('/mensagens',middlewaresAutenticacao.bearer, mensagens.busca)
router.post('/mensagens/:id',mensagens.adiciona)
router.delete('/mensagens/:id',middlewaresAutenticacao.bearer, mensagens.deleta)

//autenticacao usuarios
router.post('/usuario/login',middlewaresAutenticacao.local,usuario.login)
router.get('/usuario/logout',middlewaresAutenticacao.bearer, usuario.logout)
router.post('/usuario/atualizaToken')

module.exports= router