const passport = require('passport')
const tokens = require('./tokens')

module.exports = {
    local: (req,res,next) => {
        passport.authenticate(
            'local', 
            {session: false}, 
            (erro, usuario, info)=>{
                if(erro && erro.name == 'InvalidArgumentError'){
                    return res.status(401).json({erro: erro.message})
                }
                if(erro){
                    return res.status(500).json({erro:erro.message})
                }
                if(!usuario){
                    return res.status(401).json()
                }
                req.user = usuario
                return next()
            }
        )(req,res,next)
    },
    bearer: (req,res,next) => {
        passport.authenticate(
            'bearer',
            {session: false},
            (erro, usuario, info) => {
                if(info.token == null){
                    res.status(401).json({message: 'token não enviado'})
                }
                if(erro && erro.name == 'JsonWebTokenError' ){
                    return res.status(401).json({erro: erro.message})
                }
                if(erro && erro.name == 'TokenExpiredError'){
                    return res.status(401).json({erro: erro.message})
                }
                if(!usuario && usuario.name == 'JsonWebTokenError'){
                    return res.status(401).json({message: 'token não enviado'})
                }
                if(!usuario){
                    console.log(tokens.access.verifica.JWT(info.token))
                    return res.status(401).json({message: 'usuario invalido'})
                }
                if(erro){
                    return res.status(500).json({erro: erro.message})
                }
                req.token = info.token
                req.user = usuario
                return next()
            }
        )(req,res,next)
    },
    refresh: async (req,res,next) =>{
        try {
            const {refreshToken} = req.body
            await tokens.refresh.verifica(refreshToken)
            await tokens.refresh.invalida(refreshToken)

            return next()
        } catch (erro) {
            if(erro && erro.name == 'InvalidArgumentError'){
                res.status(401).json({erro: erro.message})
            }
            if(erro) {
                res.status(500).json({erro: erro.message})
            }
        }
    }
}