const { imagens } = require("../modelos")
const {promisify}= require('util')
const path = require('path')
const fs =require('fs')

module.exports = {
    async busca(req,res){
        try {
            const query = await imagens.buscaImagens(req,res)
            if(query == null){
                res.status(400).json({message: "Id invalido"})
            }
            res.status(200).json(query)
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    },
    async buscaPrincipais(req,res){
        try {
            const query = await imagens.buscaImagemPrincipal()
            res.status(200).json(query)
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    },
    async adiciona(req,res){
        try {
            await imagens.criaImagem(req,res)
            res.status(200).json({message: 'imagem adicionada com sucesso!'})
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    },
    async deleta(req,res){
        try {
            const query = await imagens.buscaImagens(req,res)
            if(query == null){
                return res.status(400).json({message: "Id invalido"})
            }
            query.forEach((imagem)=>{
                promisify(fs.unlink)(
                    path.resolve(__dirname, '..', '..', 'tmp', 'uploads', imagem.url)
                )
            })
            await imagens.deletaImagens(req, res)
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    }
}