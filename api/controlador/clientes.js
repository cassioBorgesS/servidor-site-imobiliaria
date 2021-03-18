const {clientes} = require('../modelos')

module.exports = {
    async cria(req,res){
        try {
            await clientes.criaCliente(req)
            res.status(200).json({message: 'cliente adicionado com sucesso'})
        } catch (erro) {
            if(erro && erro.name == 'InvalidArgumentError'){
                res.status(400).json({erro: erro.message})
            }
            if(!req.body){
                res.status(400).json({erro: 'campos vazios'})
            }
            if(erro){
                res.status(500).json({erro: erro.message})
            }
        }
    },
    async busca(req,res){
        try {
            const resultado = await clientes.buscaClientes()
            res.status(200).json(resultado)
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    },
    async deleta(req,res){
        try {
            await clientes.deletaClientes(req.params.id)
            res.status(204).json()
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    }
}