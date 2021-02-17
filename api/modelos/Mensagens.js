const db = require("../database/conexao");
const moment = require('moment')
const {promisify} = require('util')
const dbRun = promisify(db.run).bind(db)
const dbAll = promisify(db.all).bind(db)
const dbGet = promisify(db.get).bind(db)

class Mensagens {
    async criaMensagem(req,res){
        const criado_em = moment().format('YYYY-MM-DD hh:mm:ss')
        const {
            mensagem, 
            telefone,
            nome, 
            email,
        } = req.body
        dbRun(
            'insert into mensagens values(?,?,?,?,?,?,?)',
            [mensagem,nome,telefone,null,criado_em,email,req.params.id]
        )
    }
    async buscaMensagens(){
        return dbAll('select * from mensagens order by id desc')
    }
    async buscaMensagemPorId(req,res){
        return dbGet('select * from mensagens where id = ?', [req.params.id])
    }
    async buscaMensagemPorImovel(req,res){
        return dbAll('select * from mensagens where id_imovel = ?', [req.params.id])
    }
    async deletaMensagem(req,res){
        return await dbRun('delete from mensagens where id = ?', [req.params.id])
    }
}
module.exports = new Mensagens()