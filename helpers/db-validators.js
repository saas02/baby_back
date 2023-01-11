
const User = require("./../models/user");
const Auth = require("./../models/auth");

const existeEmail = async (correo = '') => {

    const existeEmail = await Auth.findOne( { correo } )
    
    if( existeEmail ){
        throw new Error(`El correo ${ correo } ya esta registrado`)        
    }
}

const existeUsuarioId = async (id = '') => {

    const existeUsuario = await User.findById( id )

    if( !existeUsuario ){
        throw new Error(`El Usuario con id ${ id } no existe`)        
    }
}

module.exports = {
    existeUsuarioId,
    existeEmail
}