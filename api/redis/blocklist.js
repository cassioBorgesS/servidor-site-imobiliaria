const redis = require('redis')
var blocklist;

if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    blocklist = require("redis").createClient(rtg.port, rtg.hostname,{prefix: 'blocklist:'});

redis.auth(rtg.auth.split(":")[1]);
} else {
    blocklist = require("redis").createClient({prefix: 'blocklist:'});
}

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