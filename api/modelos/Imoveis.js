const db = require("../database/conexao");
const moment = require('moment')
const {promisify} = require('util')
const dbRun = promisify(db.run).bind(db)
const dbAll = promisify(db.all).bind(db)
const dbGet = promisify(db.get).bind(db);

class Imoveis{
    async criaImovel(req){
        const criado_em = moment().format("YYYY-MM-DD hh:mm:ss")
        const modificado_em = moment().format("YYYY-MM-DD hh:mm:ss")
        const {cep ,titulo, area ,quartos ,descricao,preco,garagem} = req.body
        
        const sql = 'insert into imoveis values(?,?,?,?,?,?,?,?,?,?,?);'
        try {
            await dbRun(
                sql,
                [
                    cep,
                    titulo,
                    null,
                    area,
                    criado_em,
                    quartos,
                    descricao,
                    preco,
                    modificado_em,
                    preco,
                    garagem
                ]
            )
        } catch (error) {
            throw new Error('Não foi possivel adicionar à database')
        }
    }
    async buscaImoveis(){
        return await dbAll('select * from imoveis order by id desc')
    }
    async buscaImovelPorId(req){
        return await dbGet(
            'select * from imoveis where id = ?',
            [req.params.id]
        )
    }
    async atualizaImovel(req,res){
        const modificado_em = moment().format("YYYY-MM-DD hh:mm:ss")
        const {cep,titulo,area,quartos,descricao,preco,garagem} = req.body
        return await dbRun(
            `update imoveis set 
            cep = ?, 
            titulo = ?, 
            area=?,
            quartos=?,
            descricao=?,
            preco_atual=?,
            modificado_em=?,
            garagem=? 
            where id = ?;`,
            [cep,titulo,area,quartos,descricao,preco,modificado_em,garagem,req.params.id]
        )
    }
    async deletaImovel(req,res){

        return await dbRun(
            'delete from imoveis where id = ?',
            [req.params.id]
        )
    }
}

module.exports = new Imoveis()