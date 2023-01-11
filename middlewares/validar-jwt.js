const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Auth = require('./../models/auth');

const validarJwt = async (request, response, next) => {

    const token = request.header('x-token');

    if (!token) {
        return response.status(401).json({
            msg: 'No hay token'
        });
    }

    try {

        const { uid, ...data } = jwt.verify(token, process.env.SECRETKEY)

        auth = await Auth.findOne({ uid })

        if (!auth) {
            return response.status(401).json({
                msg: 'Token no valido - usuario no existe'
            })
        }

        request.auth = auth;

        next();

    } catch (error) {

        response.status(500).json(
            {
                msg: error
            }
        )
    }

}



module.exports = {
    validarJwt
}