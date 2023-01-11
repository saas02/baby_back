const { response, request } = require('express');
const brcyptjs = require('bcryptjs');
const Auth = require("../models/auth");
const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req = request, res = response)  => {

    const { email, password } = req.body;
    
    try {
        
        const auth = await Auth.findOne( { email } )

        if( !auth ){
            /** VAlidar si existe el email */
            return res.status(400).json({
                msg: "(Usuario) / Password no con correctos -- email"
            })
        }

        const validatePassword = brcyptjs.compareSync( password,  auth.password );

        if( !validatePassword ){
            /** Validar Contraseña */
            return res.status(400).json({
                msg: "(Usuario) / Password no con correctos -- password"
            })
        }
        /** Generar JWT */
        const token = await generarJWT( auth.email )

        res.json({
            msg:" login API Controller",
            token,
            auth
        })

    } catch (error) {
        
        res.status(500).json({
            msg: error
        })
    }

}

const createPost = async (req, res = response) => {
    const { password, ...data } = req.body;
    const auth = new Auth( data );    
    /** Encriptar Contraseña */
    const salt = brcyptjs.genSaltSync(10);
    auth.password = brcyptjs.hashSync( password, salt );

    await auth.save();

    res.json({
        auth
    })

}

module.exports = {
    login,
    createPost
}