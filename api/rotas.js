const multer = require('multer')
const {imoveis, imagens, mensagens, clientes} = require('./controlador')
const {usuario, middlewaresAutenticacao} = require('./autenticacao')
const multerConfig = require('./config/multer')
const router = require('express').Router()

router.get('/', (req,res) => res.status(200).json('use a rota api'))

// crud imoveis
router.get('/api/imoveis', imoveis.lista)
router.get('/api/imoveis/:id',imoveis.buscaUm)
router.post('/api/imoveis',middlewaresAutenticacao.bearer,imoveis.adiciona)
router.patch('/api/imoveis/:id',middlewaresAutenticacao.bearer,imoveis.atualiza)
router.delete('/api/imoveis/:id',middlewaresAutenticacao.bearer,imoveis.deleta)

// cr imagens
router.get('/api/imagens/:id',imagens.busca)
router.get('/api/imagens',imagens.buscaPrincipais)
router.post('/api/imagens/:id',[middlewaresAutenticacao.bearer,multer(multerConfig).single('file')],imagens.adiciona)

// crd mensagens
router.get('/api/mensagens/porimovel/:id',middlewaresAutenticacao.bearer, mensagens.buscaPorImovel)
router.get('/api/mensagens/porid/:id',middlewaresAutenticacao.bearer, mensagens.buscaPorId)
router.get('/api/mensagens',middlewaresAutenticacao.bearer, mensagens.busca)
router.post('/api/mensagens/:id',mensagens.adiciona)
router.delete('/api/mensagens/:id',middlewaresAutenticacao.bearer, mensagens.deleta)

//crd clientes
router.get('/api/clientes', middlewaresAutenticacao.bearer, clientes.busca)
router.post('/api/clientes', clientes.cria)
router.delete('/api/clientes/:id', middlewaresAutenticacao.bearer, clientes.deleta)

//autenticacao usuarios
router.post('/api/usuario/login',middlewaresAutenticacao.local,usuario.login)
router.post('/api/usuario/logout',[middlewaresAutenticacao.bearer, middlewaresAutenticacao.refresh], usuario.logout)
router.post('/api/usuario/atualizaToken',[middlewaresAutenticacao.bearer, middlewaresAutenticacao.refresh], usuario.login)

module.exports= router