const db = require("../database/conexao");
const moment = require('moment')
const {promisify} = require('util');
const { InvalidArgumentError } = require("../erros");
const dbRun = promisify(db.run).bind(db)
const dbAll = promisify(db.all).bind(db)
const dbGet = promisify(db.get).bind(db);

class Imoveis{
    async criaImovel(req){
        const criado_em = moment().format("YYYY-MM-DD hh:mm:ss")
        const modificado_em = moment().format("YYYY-MM-DD hh:mm:ss")
        const {cep ,titulo, area ,quartos ,descricao,preco,garagem, modo} = req.body
        
        const sql = 'insert into imoveis values(?,?,?,?,?,?,?,?,?,?,?,?);'
        this.verificaImovelValido(req)
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
                    garagem,
                    modo
                ]
            )
        } catch (erro) {
            if(erro.name == 'InvalidArgumentError'){
                return erro
            }
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
        const {cep,titulo,area,quartos,descricao,preco,garagem,modo} = req.body
        this.verificaImovelValido(req)
        return await dbRun(
            `update imoveis set 
            cep = ?, 
            titulo = ?, 
            area=?,
            quartos=?,
            descricao=?,
            preco_atual=?,
            modificado_em=?,
            garagem=?,
            modo_negocio=? 
            where id = ?;`,
            [cep,titulo,area,quartos,descricao,preco,modificado_em,garagem,modo,req.params.id]
        )
    }
    async deletaImovel(req,res){

        return await dbRun(
            'delete from imoveis where id = ?',
            [req.params.id]
        )
    }
    verificaImovelValido(req){
        const {cep ,titulo ,descricao,preco, modo} = req.body
        if(cep.length < 8){
            throw new InvalidArgumentError('cep invalido')
        }
        if (!titulo||!descricao||!preco) {
            throw new InvalidArgumentError('campo vazio')
        }
        if(modo == 'v' && preco < 5000){
            throw new InvalidArgumentError('preço abaixo do esperado')
        }
        const modosValidos = ['v', 'a']
        if(!modosValidos.includes(modo)){
            throw new InvalidArgumentError('modo de negócio invalido')
        }
    }
}

module.exports = new Imoveis()