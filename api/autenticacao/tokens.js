const moment = require('moment')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const allowlist = require('../redis/allowlist')
const blocklist = require('../redis/blocklist')
const {InvalidArgumentError} = require('../erros')

function criaTokenJWT(usuario){
    const payload = {
        login: usuario.login
    }
    return jwt.sign(payload, process.env.TOKEN_JWT, {expiresIn: '15m'})
}
async function verificaTokenNaBlocklist(token){
    if(!token){
        throw new jwt.JsonWebTokenError('Token não enviado!')
    }
    const verificaToken = await blocklist.verifica(token)
    if(verificaToken){
        throw new jwt.JsonWebTokenError('Token invalido por logout!')
    }
    return await blocklist.verifica(token)
}
function invalidaTokenJWT(token){
    return blocklist.adiciona(token)
}
async function criaTokenOpaco(usuario){
    const tokenOpaco = crypto.randomBytes(24).toString('hex')
    const dataExpiracao = moment().add(2 , 'd').unix()
    await allowlist.adiciona(tokenOpaco, usuario.login, dataExpiracao)
    return tokenOpaco
}
async function verificaTokenOpaco(token){
    if(!token){
        throw new InvalidArgumentError('Refresh token não enviado!')
    }
    const resultado = await allowlist.verifica(token)

    if(!resultado){
        throw new InvalidArgumentError('Refresh token invalido!')
    }
    return resultado
}
async function invalidaTokenOpaco(token){
    return await allowlist.deleta(token)
}
module.exports = {
    access:{
        cria(usuario){
            return criaTokenJWT(usuario)
        },
        verifica:{
            blocklist(token){return verificaTokenNaBlocklist(token)},
            JWT(token){return jwt.verify(token, process.env.TOKEN_JWT)}
        },
        invalida(token){
            return invalidaTokenJWT(token)
        }
    },
    refresh:{
        cria(usuario){
            return criaTokenOpaco(usuario)
        },
        verifica(token){
            return verificaTokenOpaco(token)
        },
        invalida(token){
            return invalidaTokenOpaco(token)
        }
    }
}