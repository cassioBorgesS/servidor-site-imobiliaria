const conexao = require('./conexao')
const{promisify}= require('util')
const dbRun = promisify(conexao.run).bind(conexao)

class Tabelas {
    async criaTabelas(){
        await dbRun(`
            CREATE TABLE if not exists imoveis (
            cep VARCHAR(8) not null,
            titulo VARCHAR(40) not null,
            id INTEGER PRIMARY KEY,
            area INTEGER,
            criado_em datetime  not null,
            quartos INTEGER,
            descricao VARCHAR(4000) not null,
            preco_atual INTEGER not null,
            modificado_em datetime not null,
            preco_inicial INTEGER not null,
            garagem INTEGER,
            modo_negocio CHAR(1) not null
            )`
        )
        await dbRun(`
            CREATE TABLE if not exists mensagens (
            mensagem VARCHAR(2000) not null,
            nome_usuario VARCHAR(50) not null,
            telefone_usuario VARCHAR(11),
            id INTEGER PRIMARY KEY not null,
            criado_em datetime  not null,
            email_usuario VARCHAR(50),
            id_imovel INTEGER not null,
            FOREIGN KEY(id_imovel) REFERENCES imoveis (id)
            );
        `)
        await dbRun(`
            CREATE TABLE if not exists imagens (
            nome VARCHAR(40) not null,
            url VARCHAR(100) not null PRIMARY KEY,
            tamanho INTEGER not null,
            id_imovel INTEGER not null,
            FOREIGN KEY(id_imovel) REFERENCES imoveis (id)
            );
        `)
        await dbRun(`
            CREATE TABLE if not exists clientes (
            nome_usuario VARCHAR(50) not null,
            telefone_usuario VARCHAR(11),
            id INTEGER PRIMARY KEY not null,
            criado_em datetime  not null,
            email_usuario VARCHAR(50)
            );
        `)
    }
}

module.exports = new Tabelas()