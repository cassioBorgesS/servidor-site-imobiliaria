const bcrypt = require('bcrypt')
const tokens = require('./tokens')

module.exports = {
    async login(req,res){
        const accessToken = tokens.access.cria(req.user)
        const refreshToken = await tokens.refresh.cria(req.user)
        res.set('Authorization', accessToken)
        res.status(200).json({refreshToken: refreshToken})
    },
    async gerarSenhaHash(senha){
        const custoHash = 12
        return await bcrypt.hash(senha,custoHash)
    },
    async logout(req,res){
        try {
            const token = req.token
            await tokens.access.invalida(token)
            res.status(204).json()
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    }
}