const blocklist = require('./blocklist')
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const {createHash} = require('crypto')
const set = promisify(blocklist.set.bind(blocklist))
const existe = promisify(blocklist.exists.bind(blocklist))

function geraTokenHash(token){
    return createHash('sha256').update(token).digest('hex')
}

module.exports = {
    adiciona: async (token) => {
        const tokenHash = geraTokenHash(token)
        await set(tokenHash, '')
        blocklist.expireat(tokenHash, jwt.decode(token).exp)
    },
    verifica: async (token) => {
        const tokenHash = geraTokenHash(token)
        const resultado = await existe(tokenHash)
        return resultado === 1
    }
}