const moment = require('moment')
const db = require('../database/conexao')

const { InvalidArgumentError } = require("../erros");
const {promisify} = require('util')
const dbRun = promisify(db.run).bind(db)
const dbAll = promisify(db.all).bind(db);

class Clientes{
    async criaCliente(req){
        const {nome,telefone,email} = req.body
        const criado_em = moment().format('YYYY-MM-DD hh:mm:ss')
        try {
            this.validaCliente(nome,telefone,email)
            const resultado = await dbAll(
                `insert into clientes values(?,?,?,?,?)`,
                [nome,telefone,null,criado_em,email]
            )
            return resultado
        } catch (erro) {
            this.validaCliente(nome,telefone,email)
        }
    }
    async buscaClientes(){
        return await dbAll(`select * from clientes order by id desc`)
    }
    async deletaClientes(id){
        await dbRun(
            `delete from clientes where id = ?`,
            [id]
        )
    }
    validaCliente(nome,telefone,email){
        if(nome.length < 3){
            throw new InvalidArgumentError('nome muito pequeno')
        }
        if(telefone.length < 10){
            throw new InvalidArgumentError('telefone invalido')
        }
        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            throw new InvalidArgumentError('e-mail invalido')
        }
    }
}

module.exports = new Clientes()