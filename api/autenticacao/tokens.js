const jwt = require('jsonwebtoken')

module.exports = {
    criaTokenJWT(user){
        const payload = {
            usuario: user.login
        }
    
        return jwt.sign(payload, process.env.TOKEN_JWT, {expiresIn: '15m'})
    },
    verificaTokenJWT(token){
        return jwt.verify(token, process.env.TOKEN_JWT)
    }
}