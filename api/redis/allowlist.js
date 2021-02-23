const redis = require('redis')
const manipulaLista = require('./manipula-lista')

const allowlist = redis.createClient({prefix: 'allowlist:'})

module.exports = manipulaLista(allowlist)
