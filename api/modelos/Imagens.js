const db = require("../database/conexao");

const {promisify} = require('util')
const dbRun = promisify(db.run).bind(db)
const dbAll = promisify(db.all).bind(db);

class Imagens {
    async buscaImagens(req,res){
        return await dbAll(
            'select url, id_imovel from imagens where id_imovel = ?',
            [req.params.id]
        )
    }
    async buscaImagemPrincipal(){
        return await dbAll(
            'select url, id_imovel from imagens group by id_imovel having count(id_imovel) > 1'
        )
    }
    async criaImagem(req,res){

        const {originalname: name, size, filename: key} = req.file
        return await dbRun(
            'insert into imagens values(?,?,?,?)',
            [
                name,
                key,
                size,
                req.params.id
            ]
        )
    }
    async deletaImagens(req,res){
        return await dbAll(
            'delete from imagens where id_imovel = ?',
            [req.params.id]
        )
    }
}

module.exports = new Imagens()