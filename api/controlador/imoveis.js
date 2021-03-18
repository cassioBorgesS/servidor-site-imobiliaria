const {imoveis} = require('../modelos')
const imagens = require('./imagens')

module.exports = {
    async adiciona(req,res){
        try {
            await imoveis.criaImovel(req)
            res.status(201).json({message: "Imóvel adicionado com sucesso!"})
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    },
    async lista(req, res) {
        try {
            const query = await imoveis.buscaImoveis()
            res.status(200).json(query)
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    },
    async buscaUm(req,res){
        try {
            const query = await imoveis.buscaImovelPorId(req,res)
            if(query == null){
                res.status(400).json({message: "Id invalido"})
            }
            res.status(200).json(query)
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    },
    async atualiza(req,res){
        try {
            await imagens.deleta(req,res)
            const query = await imoveis.atualizaImovel(req,res)
            res.status(200).json(query)
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    },
    async deleta(req,res){
        try {
            await imagens.deleta(req,res)
            await imoveis.deletaImovel(req,res)
            res.status(200).json({message: "Imóvel deletado com sucesso"})
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    }
}