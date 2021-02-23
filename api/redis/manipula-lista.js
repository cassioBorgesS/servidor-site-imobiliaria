const {promisify} = require('util')


module.exports = lista => {
    const setAsync = promisify(lista.set).bind(lista)
    const existeAsync = promisify(lista.exists).bind(lista)
    const delAsync = promisify(lista.del).bind(lista)
    return {
        async adiciona(chave, valor, dataExpiracao){
            await setAsync(chave,valor)
            lista.expireat(`${chave}`, dataExpiracao)
        },
        async verifica(chave){
            const resultado = await existeAsync(chave)
            return resultado === 1
        },
        async deleta(chave){
            return await delAsync(chave)
        }
    }
}