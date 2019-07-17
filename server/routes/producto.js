const express = require('express');
const { verificarToken } = require('../middlewares/autenticacion');
const _ = require('underscore');


let app = express();
let Producto = require('../models/producto')

// ========================
// Obtener Productos
// ========================
app.get('/productos', verificarToken, (req, res) => {
    // Traes todos los productos
    // pupulate: usuario y categoria
    // paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos: productos
            })
        })
})

// ========================
// Obtener un producto por ID
// ========================
app.get('/productos/:id', verificarToken, (req, res) => {
    // pupulate: usuario y categoria
    // //paginado

    let id = req.params.id

    Producto.findById(id, (err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrado'
                    }
                });
            }
            res.json({
                ok: true,
                productoDB: productoDB
            })
        })
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
})

// ========================
// Buscar Productos
// ========================

app.get('/productos/buscar/:termino', verificarToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i')

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productoDB
            })
        })

})



// ========================
// Crear un nuevo producto 
// ========================
app.post('/productos', verificarToken, (req, res) => {
    // grabar un usuario
    // grabar una categoria del listado

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoriaID,
        usuario: req.usuario._id
    })

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: productoDB
        })
    })

})

// ========================
// Actualizar un producto
// ========================
app.put('/productos/:id', verificarToken, (req, res) => {
    // grabar un usuario
    // grabar una categoria
    let id = req.params.id
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrado'
                    }
                });
            }

            productoDB.nombre = body.nombre;
            productoDB.precioUni = body.precioUni;
            productoDB.categoria = body.categoria;
            productoDB.disponible = body.disponible;
            productoDB.descripcion = body.descripcion;

            productoDB.save((err, productoActualizado) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    producto: productoActualizado
                })
            })

        })
        .populate('categoria')
        .populate('usuario')
})

// ========================
// Borrar un producto
// ========================
app.delete('/productos/:id', verificarToken, (req, res) => {
    // grabar un usuario
    // grabar una categoria

    let id = req.params.id

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'Producto borrado'
            })
        })

    })
})

module.exports = app;