const { Schema, model } = require("mongoose");

const AuthSchema = Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: [true, 'El campo nombre es obligatorio..']
    },
    email: {
        type: String,
        required: [true, 'El campo email es obligatorio..']
    },
    password: {
        type: String,
        required: [true, 'El campo password es obligatorio..']
    }
});

AuthSchema.methods.toJSON = function(){
    /** Sirve para eliminar los campos del objeto */

    const { __v, _id, ...auth } = this.toObject();
    auth.id = _id;

    return auth;
}


module.exports = model( 'Auth', AuthSchema)