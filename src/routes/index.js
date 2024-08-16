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

router.post('/submit', (req, res) => {
    const {nome, email} = req.body

    if(!nome || !email) {
    return res.status(400).send('Favor enviar nome e e-mail')
    }

    return res.status(201).send('Dado criado com sucesso')
})

let items = [
    {id: 1, nome: 'item1'},
    {id: 2, nome: 'item2'},
    {id: 3, nome: 'item3'}
]

router.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const item = items.find(item => item.id = id)

    if(item){
        return res.status(200).send(item)
    } else {
        return res.status(404).send('Item não encontrado')
    }
})


module.exports = router