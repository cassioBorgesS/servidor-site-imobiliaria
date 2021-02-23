const redis = require('redis')
const blocklist = redis.createClient({
    prefix: 'blocklist:'
})
const manipulaLista = require('./manipula-lista')
const manipulaBlocklist = manipulaLista(blocklist)

const jwt = require('jsonwebtoken')
const {createHash} = require('crypto')

function geraTokenHash(token){
    return createHash('sha256').update(token).digest('hex')
}

module.exports = {
    adiciona: async (token) => {
        const tokenHash = geraTokenHash(token)
        const dataExpiracao = jwt.decode(token).exp
        await manipulaBlocklist.adiciona(tokenHash, '' , dataExpiracao)
    },
    verifica: async (token) => {
        const tokenHash = geraTokenHash(token)
        return manipulaBlocklist.verifica(tokenHash)
    }
}