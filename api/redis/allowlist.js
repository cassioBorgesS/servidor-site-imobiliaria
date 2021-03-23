const redis = require('redis')
const manipulaLista = require('./manipula-lista')

var allowlist;

if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    allowlist = require("redis").createClient(rtg.port, rtg.hostname,{prefix: 'allowlist:'});
    allowlist.auth(rtg.auth.split(":")[1]);
} else {
    allowlist = require("redis").createClient({prefix: 'allowlist:'});
}

module.exports = manipulaLista(allowlist)
