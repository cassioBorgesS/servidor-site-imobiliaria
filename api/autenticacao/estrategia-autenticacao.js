const passport = require('passport')
const localStartegy = require('passport-local').Strategy
const bearerStrategy = require('passport-http-bearer').Strategy
const tokens = require('./tokens')
const { InvalidArgumentError } = require('../erros')
const bcrypt = require('bcrypt')

function verificaLogin(login, user){
    if(login !== user.login){
        throw new InvalidArgumentError('Usuario invalido!')
    }
}
async function verificaSenha(senha, senhaHash){
    const verificacao = await bcrypt.compare(senha,senhaHash)
    if(!verificacao){
        throw new InvalidArgumentError('Usuario ou Senha invalidos!')
    }
}


passport.use(
    new localStartegy(
        {
            usernameField: 'login',
            passwordField: 'senha',
            session: false
        }, async (login, senha, done) =>{
            try {
                const user = {
                    login: process.env.LOGIN,
                    senhaHash: process.env.SENHA_HASH
                }
                verificaLogin(login, user)
                await verificaSenha(senha, user.senhaHash)

                done(null, user)
            } catch (erro) {
                done(erro)
            }
        }
    )
)

passport.use(
    new bearerStrategy(
        async (token, done) => {
            try{
                await tokens.access.verifica.blocklist(token)
                const payload = tokens.access.verifica.JWT(token)
                done(null, payload, {token: token})
            } catch(erro) {
                done(erro)
            }
        }
    )
)