const bcrypt = require('bcrypt')
const tokens = require('./tokens')
const blocklist = require('../redis/manipula-blocklist')

module.exports = {
    async login(req,res){
        const token = tokens.criaTokenJWT(req.user)
        res.set('Authorization', token)
        res.status(204).json()
    },
    async gerarSenhaHash(senha){
        const custoHash = 12
        return await bcrypt.hash(senha,custoHash)
    },
    async logout(req,res){
        try {
            const token = req.token
            await blocklist.adiciona(token)
            res.status(204).json()
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    }
}