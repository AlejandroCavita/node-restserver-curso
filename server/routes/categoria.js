const express = require('express');

let { verificaToken } = require('../middlewares/autenticacion')

let app = express();

let Categoria = require('../models/categoria');


app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({}, (err, categoriaDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            categoria: categoriaDB
        })
    })

})

app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body


    Categoria.find({}, (err, categoriaDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            categoria: categoriaDB
        })
    })

})

module.exports = app;