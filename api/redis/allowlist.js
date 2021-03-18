const redis = require('redis')
const manipulaLista = require('./manipula-lista')

const allowlist = redis.createClient(process.env.REDIS_URL,{prefix: 'allowlist:'})

module.exports = manipulaLista(allowlist)
