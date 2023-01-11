const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {
    return new Promise( (resolve, reject) => {
        
        const payload = { uid };

        jwt.sign( payload, process.env.SECRETKEY, {
            expiresIn: process.env.EXPIRESTOKEN
        }, ( err, token )  => {
            if( err ){                
                reject( 'No se logró el token' )
            }else{
                resolve ( token )
            }
        } );

    })
}


module.exports = {
    generarJWT
}