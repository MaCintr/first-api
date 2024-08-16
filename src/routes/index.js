const express = require ('express')
const router = new express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send(
        {
            "nome" : "Marcelo Cintra"
        }
    )
})

router.get('/privada', (req,res) => {
    const token = req.headers['authorization']

    if(!token || token != 'minhaSenha') {
        return res.status(401).send('Sem autorização')
    }

    return res.send('Area acessada com sucesso').status(200)
})

const tokenExemplos = {
    'tokenAdmin' : {role : 'admin'},
    'tokenUser' : {role : 'user'},
    'tokenGuest' : {role : 'guest'}
}

router.get('/admin', (req, res) => {
    const token = req.headers["authorization"]

    if (!token) {
        return res.status(401).send('Sem autorização')
    }

    const user = tokenExemplos[token]
    if (!user) {
        return res.status(401).send('Token inválido')
    }

    if(user.role != 'admin') {
        return res.status(403).send('Você não possui permissão para acessar esta página')
    }

    return res.send('Acesso liberado').status(200)

})


module.exports = router