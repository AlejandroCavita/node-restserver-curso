const jwt = require('jsonwebtoken')

//==========================
//Verificar token
//==========================
let verificarToken = (req, res, next) => {

    //Con la palabra req.get obtenemos el header de la petición
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {


        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next();
    })
}

//==========================
//Verificar AdminRole
//==========================
let verificarAdmin_Rol = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es Administrador'
            }
        })
    }


}

module.exports = {
    verificarToken,
    verificarAdmin_Rol
}