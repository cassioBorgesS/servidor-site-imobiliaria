const { mensagens } = require("../modelos");

module.exports = {
    async adiciona(req,res){
        try {
            await mensagens.criaMensagem(req,res)
            res.status(201).json({message: 'Mensagem enviada com sucesso'})
        } catch (erro) {
            res.status(500).json(erro)
        }
    },
    async busca(req,res){
        try {
            const query = await mensagens.buscaMensagens()
            res.status(200).json(query)
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    },
    async buscaPorId(req,res){
        try {
            const query = await mensagens.buscaMensagemPorId(req,res)
            res.status(200).json(query)
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    },
    async buscaPorImovel(req,res){
        try {
            const query = await mensagens.buscaMensagemPorImovel(req,res)
            res.status(200).json(query)
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    },
    async deleta(req,res){
        try {
            await mensagens.deletaMensagem(req,res)
            res.status(200).json({message: 'Mensagem excluida com sucesso'})
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    }
}