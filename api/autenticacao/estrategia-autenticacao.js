const passport = require('passport')
const localStartegy = require('passport-local').Strategy
const bearerStrategy = require('passport-http-bearer').Strategy
const tokens = require('./tokens')
const jwt = require('jsonwebtoken')
const { InvalidArgumentError } = require('../erros')
const bcrypt = require('bcrypt')
const blocklist = require('../redis/manipula-blocklist')

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
async function verificaTokenNaBlocklist(token){
    const verificaToken = await blocklist.verifica(token)
    if(verificaToken){
        throw new jwt.JsonWebTokenError('Token invalido por logout!')
    }
    return await blocklist.verifica(token)
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
                await verificaTokenNaBlocklist(token)
                const payload = tokens.verificaTokenJWT(token)
                done(null, payload, {token: token})
            } catch(erro) {
                done(erro)
            }
        }
    )
)